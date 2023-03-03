import React from 'react'
import { GPT, USER, OPENAI_LOGO, APPIAN_LOGO } from '../../constants'
import Message from './Message'

const Bubble = ({ messageSender, message }) => {
	console.log(messageSender, messageSender === USER)
	return messageSender === USER ? (
		<div className="d-flex flex-row justify-content-end mb-4 pt-1">
			<Message messageSender={USER} message={message} />
			{APPIAN_LOGO}
		</div>
	) : (
		<div className="d-flex flex-row justify-content-start">
			{OPENAI_LOGO}
			<Message messageSender={GPT} message={message} />
		</div>
	)


}

export default Bubble