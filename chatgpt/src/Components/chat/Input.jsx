import { MDBIcon } from 'mdb-react-ui-kit'
import React, { useCallback, useContext, useEffect } from 'react'
import { useState } from 'react';
import { getDocument } from 'pdfjs-dist/webpack';

import { USER, GPT, DEMO_NO_CODE_QUERY, } from '../../constants';
import AppianContext from "../../context/AppianContext"
import { useEventStream } from '../../hooks/useEventStream';


const Input = ({ conversation, setConversation, model, temperature, top_p, n, stop, max_tokens, presence_penalty, frequency_penalty, user, sendButtonColor, setIsLoading, demo, systemMessage }) => {
	const { Appian } = useContext(AppianContext)
	const [userMessage, setUserMessage] = useState("");
	const [currentPrompt, setCurrentPrompt] = useState("");
	const [file, setFile] = useState(null);
	const [fileText, setFileText] = useState("");
	const [startStream, setStartStream] = useState(false);


	const handleStreamData = useCallback((data) => {
		// console.log(data);
		setConversation(prevConvo => {
			const firstMessageInStream = prevConvo[prevConvo.length - 1]?.role === USER
			const modifiedConvo = firstMessageInStream ?
				prevConvo :
				prevConvo.slice(0, -1)
			const content = firstMessageInStream ?
				data :
				prevConvo[prevConvo.length - 1]?.content + data

			const convoWithNewStreamedVals = [...modifiedConvo, { role: GPT, content }]

			// Send updates to appian every 2 seconds
			const currentSecond = new Date().getSeconds();
			if (currentSecond % 2 === 1) {
				Appian.Component.saveValue("SAILGen", content);
			}
			// Appian.Component.saveValue('SAILGen', content)
			return convoWithNewStreamedVals
		})

	}, [setConversation, Appian.Component]);

	const handleStreamEnd = useCallback((stoppedStreamEarly) => {
		setStartStream(false)
		if (!stoppedStreamEarly) {
			setConversation(prevConvo => {
				console.log(prevConvo)
				if (demo === DEMO_NO_CODE_QUERY) {
					const uuidRegex = /\/\* Record UUID: (.*?) \*\//;
					const queryRegex = /^([\s\S]*?)\/\*/;
					const explanationRegex = /\/\*(.*?)\*\//;

					const content = prevConvo.slice(-1)[0].content
					console.log(content)
					console.log(content.match(uuidRegex)[1])
					console.log(content.match(queryRegex)[1])
					console.log(content.match(explanationRegex)[1])

					const uuid = content.match(uuidRegex)[1];
					const query = content.match(queryRegex)[1];
					const explanation = content.match(explanationRegex)[1];
					Appian.Component.saveValue('conversation', [...prevConvo.slice(0, -1), explanation])
					Appian.Component.saveValue('recordQuery', [uuid, query])
					return [...prevConvo.slice(0, -1), { role: GPT, content: explanation }]
				} else {
					Appian.Component.saveValue('conversation', prevConvo)
					return prevConvo
				}

			})
		}
	}, [setConversation, Appian.Component, demo]);

	const { streamData, error, loading } = useEventStream(
		'https://api.openai.com/v1/chat/completions',
		handleStreamData,
		startStream,
		handleStreamEnd,
		currentPrompt,
		fileText,
		demo,
		systemMessage
	);

	async function addItem(e) {
		e.preventDefault();

		switch (demo) {
			case DEMO_NO_CODE_QUERY:
				if (userMessage !== undefined && userMessage !== null && userMessage.trim() !== "") {
					setConversation(prevConvo => {
						const updatedConversation = [...prevConvo, { role: USER, content: userMessage }]
						Appian.Component.saveValue('conversation', updatedConversation)
						return updatedConversation
					})
				}
				break;
			default:
				if (file) {
					// Reading file text into state
					const fileReader = new FileReader();
					fileReader.onload = async (event) => {
						const arrayBuffer = event.target.result;

						// Parse the PDF from the ArrayBuffer
						const pdf = await getDocument({ data: arrayBuffer }).promise;
						let fullText = '';
						for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
							const page = await pdf.getPage(pageNum);
							const content = await page.getTextContent();
							const text = content.items.map(item => item.str).join(' ');
							fullText += text + '\n';
						}
						setFileText(fullText)
					}
					fileReader.readAsArrayBuffer(file);
				}

				// Updating conversation state, setting loading state, and emptying message
				if (userMessage !== undefined && userMessage !== null && userMessage.trim() !== "") {
					setConversation(prevConvo => {
						const updatedConversation = [...prevConvo, { role: USER, content: userMessage }]
						Appian.Component.saveValue('conversation', updatedConversation)
						return updatedConversation
					})
				}
				break;
		}


		// Setting textarea input ui back to one line
		const textarea = document.querySelector('.form-control-lg');
		textarea.style.height = 'initial';


		setCurrentPrompt(userMessage)
		setStartStream((prevStartStream) => !prevStartStream);
		setUserMessage("")
	}

	const handleFileChange = (e) => {
		setConversation(prevConvo => [...prevConvo, { role: USER, content: `Uploaded file ${e.target.files[0]?.name}. Press send to convert to SAIL interface.` }])
		setFile(e.target.files[0]);
	};

	return (
		<div className="text-muted d-flex justify-content-start align-items-start ">
			<textarea
				className="form-control form-control-lg"
				placeholder="Type message"
				value={userMessage}
				onInput={(e) => {
					e.target.style.height = 'auto'
					e.target.style.height = e.target.scrollHeight + 'px'
					setUserMessage(e.target.value)
				}}
				onKeyDown={(e) => e.key === 'Enter' && addItem(e)}
				style={{ maxHeight: '8rem', resize: 'none' }}
				rows={1}
			/>
			<input type="file" className="form-control d-none" id="fileInput" onChange={handleFileChange} />
			<label className="ms-3 input-group-text" htmlFor="fileInput" style={{ border: 'none', cursor: 'pointer' }}>
				<MDBIcon style={{ color: sendButtonColor }} fas icon="paperclip" size="2x" />
			</label>
			{
				startStream ?
					<a className="ms-3" href="#!">
						<MDBIcon style={{ color: sendButtonColor }} fas icon="stop" size="2x" onClick={() => handleStreamEnd(true)} />
					</a> :
					<a className="ms-3" href="#!">
						<MDBIcon style={{ color: sendButtonColor }} fas icon="paper-plane" size="2x" onClick={addItem} />
					</a>
			}

		</div>
	)
}

export default Input