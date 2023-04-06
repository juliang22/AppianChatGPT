import { MDBIcon } from 'mdb-react-ui-kit'
import React, { useCallback, useContext, useEffect } from 'react'
import { useState } from 'react';

import { USER, GPT } from '../../constants';
import AppianContext from "../../context/AppianContext"
import { useEventStream } from '../../hooks/useEventStream';


const Input = ({ conversation, setConversation, model, temperature, top_p, n, stop, max_tokens, presence_penalty, frequency_penalty, user, sendButtonColor, setIsLoading }) => {
	const { Appian, allparameters } = useContext(AppianContext)
	const [message, setMessage] = useState("")
	const [currentPrompt, setCurrentPrompt] = useState("");
	const [connectedSystem, setConnectedSystem] = useState("")


	const [receivedText, setReceivedText] = useState('');
	const [startStream, setStartStream] = useState(false);


	const handleStreamData = useCallback((data) => {
		// console.log(data);
		setReceivedText((prevText) => prevText + data + ' ');

		setConversation(prevConvo => {
			const firstMessageInStream = prevConvo[prevConvo.length - 1]?.role === USER
			const modifiedConvo = firstMessageInStream ?
				prevConvo :
				prevConvo.slice(0, -1)
			const content = firstMessageInStream ?
				data :
				prevConvo[prevConvo.length - 1]?.content + data
			return [...modifiedConvo, { role: GPT, content }]
		})

	}, [setConversation]);

	const handleStreamEnd = useCallback((data) => {
		setStartStream(false)
		setConversation(prevConvo => {
			console.log(prevConvo)
			Appian.Component.saveValue('SAILGen', prevConvo[prevConvo.length - 1].content)
			return prevConvo
		})
	}, []);

	const { streamData, error, loading } = useEventStream(
		'https://api.openai.com/v1/chat/completions',
		handleStreamData,
		startStream,
		handleStreamEnd,
		currentPrompt
	);

	useEffect(() => {
		// Checking if required connectedSystem parameter exists
		allparameters["openAIConnectedSystem"] !== null && allparameters["openAIConnectedSystem"] !== undefined ?
			setConnectedSystem(allparameters["openAIConnectedSystem"]) :
			Appian.Component.setValidations("Missing Required Parameter: openAIConnectedSystem")

	}, [Appian.Component, allparameters]);



	async function addItem(e) {
		e.preventDefault();

		if (message !== undefined && message !== null && message.trim() !== "") {
			// Updating conversation state, setting loading state, and emptying message
			const updatedConversation = [...conversation, { role: USER, content: message }]
			setConversation(updatedConversation)
			setIsLoading(true)


			// Setting textarea back to one line
			const textarea = document.querySelector('.form-control-lg');
			textarea.style.height = 'initial';


			//TODO: openai call
			setStartStream((prevStartStream) => !prevStartStream);
			setCurrentPrompt(message)
			setMessage("")

			if (handleStreamEnd !== null && handleStreamEnd !== undefined) console.log(handleStreamEnd);


			setIsLoading(false)


		}
	}



	return (
		<div className="text-muted d-flex justify-content-start align-items-start ">
			<textarea
				className="form-control form-control-lg"
				placeholder="Type message"
				value={message}
				onInput={(e) => {
					e.target.style.height = 'auto'
					e.target.style.height = e.target.scrollHeight + 'px'
					setMessage(e.target.value)
				}}
				onKeyDown={(e) => e.key === 'Enter' && addItem(e)}
				style={{ maxHeight: '8rem', resize: 'none' }}
				rows={1}
			/>
			<a className="ms-3" href="#!">
				<MDBIcon style={{ color: sendButtonColor }} fas icon="paper-plane" size="2x" onClick={addItem} />
			</a>
		</div>
	)
}

export default Input