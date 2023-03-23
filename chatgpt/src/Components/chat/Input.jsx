import { MDBIcon } from 'mdb-react-ui-kit'
import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import iconv from 'iconv-lite'

import { USER, GPT } from '../../constants';
import AppianContext from "../../context/AppianContext"

const Input = ({ conversation, setConversation, model, temperature, top_p, n, stop, max_tokens, presence_penalty, frequency_penalty, user, sendButtonColor, setIsLoading }) => {
	const { Appian, allparameters } = useContext(AppianContext)
	const [message, setMessage] = useState("")
	const [connectedSystem, setConnectedSystem] = useState("")

	useEffect(() => {
		// Checking if required connectedSystem parameter exists
		allparameters["openAIConnectedSystem"] !== null && allparameters["openAIConnectedSystem"] !== undefined ?
			setConnectedSystem(allparameters["openAIConnectedSystem"]) :
			Appian.Component.setValidations("Missing Required Parameter: openAIConnectedSystem")

	}, [Appian.Component, allparameters]);

	async function addItem() {
		if (message !== undefined && message !== null && message.trim() !== "") {
			const updatedConversation = [...conversation, { role: USER, content: message }]
			setConversation(updatedConversation)
			setIsLoading(true)
			setMessage("")
			const response = await handleClientApi(
				connectedSystem,
				"chatCompletion",
				{
					messages: updatedConversation.filter((item) => !item.hasOwnProperty("error")),
					model,
					// if the value is truthy, spread the object into the main payload, if not, don't add it as a param to the payload
					...(temperature && { temperature }),
					...(top_p && { top_p }),
					...(n && { n }),
					...(stop && { stop }),
					...(max_tokens && { max_tokens }),
					...(presence_penalty && { presence_penalty }),
					...(frequency_penalty && { frequency_penalty }),
					...(user && { user })
				}
			)
			// .then(response => {
			// 	const msg = JSON.stringify(response?.payload?.choices[0]?.message.content);
			// 	console.log("msg", msg);
			// 	const buf = iconv.encode(msg, 'ISO-8859-1');
			// 	console.log("buf", buf);
			// 	const utf8Data = iconv.decode(buf, 'utf8');
			// 	console.log("done", utf8Data);
			// 	return utf8Data
			// });

			setIsLoading(false)
			// Response
			response?.payload?.error ?
				setConversation(
					[
						...updatedConversation,
						{
							role: GPT,
							content: `Unable to connect to ChatGPT. Error: ${JSON.stringify(JSON.stringify(response?.payload?.error?.message)).replace(/"/g, '\\"').replace(/\\|"|'/g, '')}, ErrorCode: ${JSON.stringify(JSON.stringify(response?.payload?.error?.type)).replace(/"/g, '\\"').replace(/\\|"|'/g, '')}`, error: true
						}
					]) :
				setConversation(
					[...updatedConversation, ...response?.payload?.choices.map(curr => { return { role: GPT, content: curr.message?.content } })]
				)

			// Save data in Appian record for auditing
			if (allparameters["webhook"] && allparameters["webhook"]?.["url"] && allparameters["webhook"]?.["webApiKey"]) {
				const url = 'https://julian-site.appianci.net/suite/webapi/N9bgEQ';
				const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0MzY1MTVhYS1hYmI4LTQxMjQtOGVmMi00MTM3MjMxZTIyNTUifQ.pgxixl7EL7t6vr6kLbYDTsV0UJZ74Yip6pORe8_unG0';

				const payload = {
					role: 'user',
					content: 'hello world',
					conversationId: 1,
					messageOrder: 1
				};

				fetch(url, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${token}`
					},
					body: JSON.stringify(payload)
				})
					.then(response => response.json())
					.then(data => console.log(data))
					.catch(error => console.error(error));
			}

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
				<MDBIcon style={{ color: sendButtonColor }} fas icon="paper-plane" size="2x" onClick={addItem} />
			</a>
		</div>
	)
}

export default Input