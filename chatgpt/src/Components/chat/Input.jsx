import { MDBIcon } from 'mdb-react-ui-kit'
import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { L_BLUE, USER, GPT } from '../../constants';
import AppianContext from "../../context/AppianContext"

const Input = ({ conversation, setConversation }) => {
	const { Appian, allparameters } = useContext(AppianContext)
	const [message, setMessage] = useState("")
	const [connectedSystem, setConnectedSystem] = useState("")

	useEffect(() => {
		allparameters["openAIConnectedSystem"] !== null && allparameters["openAIConnectedSystem"] !== undefined ?
			setConnectedSystem(allparameters["openAIConnectedSystem"]) :
			Appian.Component.setValidations("Missing Required Parameter: openAIConnectedSystem")
	}, [Appian.Component, Appian.allparameters, allparameters]);

	async function addItem() {
		if (message !== undefined && message !== null && message.trim() !== "") {
			const updatedConversation = [...conversation, { role: USER, content: message }]
			setConversation(updatedConversation)
			setMessage("")
			const response = await handleClientApi(connectedSystem, "chatCompletion", { messages: updatedConversation, model: "gpt-3.5-turbo" })
			response?.type === "INVOCATION_SUCCESS" ?
				setConversation([...updatedConversation, { role: GPT, content: response?.payload?.choices[0]?.message?.content }]) :
				setConversation([...updatedConversation, { role: GPT, content: `Unable to connect to ChatGPT. Error: ${response?.payload}` }])
		}
	}

	async function handleClientApi(connectedSystem, friendlyName, payload) {
		return await Appian.Component.invokeClientApi(
			connectedSystem,
			friendlyName,
			payload
		);
	}




	return (
		<div className="text-muted d-flex justify-content-start align-items-start ">
			<input
				type="text"
				className="form-control form-control-lg "
				id="exampleFormControlInput3"
				placeholder="Type message"
				value={message}
				required
				onChange={e => setMessage(e.target.value)}
				onKeyDown={e => e.key === "Enter" && addItem()}
			/>
			<a className="ms-3" href="#!">
				<MDBIcon style={{ color: L_BLUE }} fas icon="paper-plane" size="2x" onClick={addItem} />
			</a>
		</div>
	)
}

export default Input