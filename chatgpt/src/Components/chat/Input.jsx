import { MDBIcon } from 'mdb-react-ui-kit'
import React, { useCallback, useContext, useEffect } from 'react'
import { useState } from 'react';
import { getDocument } from 'pdfjs-dist/webpack';

import { USER, GPT, } from '../../constants';
import AppianContext from "../../context/AppianContext"
import { useEventStream } from '../../hooks/useEventStream';


const Input = ({ conversation, setConversation, model, temperature, top_p, n, stop, max_tokens, presence_penalty, frequency_penalty, user, sendButtonColor, setIsLoading }) => {
	const { Appian } = useContext(AppianContext)
	const [userMessage, setUserMessage] = useState("");
	const [currentPrompt, setCurrentPrompt] = useState("");
	const [file, setFile] = useState(null);
	const [fileText, setFileText] = useState(null);
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
				Appian.Component.saveValue('conversation', prevConvo)
				return prevConvo
			})
		}
	}, [setConversation, Appian.Component]);

	const { streamData, error, loading } = useEventStream(
		'https://api.openai.com/v1/chat/completions',
		handleStreamData,
		startStream,
		handleStreamEnd,
		currentPrompt,
		fileText,
		Appian
	);

	async function addItem(e) {
		e.preventDefault();

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