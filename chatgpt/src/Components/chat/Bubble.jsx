import React from 'react'
import { GPT, USER, OPENAI_LOGO, APPIAN_LOGO } from '../../constants'
import Message from './Message'

const Bubble = ({ role, content }) => {

	return role === USER ? (
		<div className="d-flex flex-row justify-content-end mb-4 pt-1">
			<Message role={USER} content={content} />
			{APPIAN_LOGO}
		</div>
	) : (
		<div className="d-flex flex-row justify-content-start mb-3">
			{OPENAI_LOGO}
			<Message role={GPT} content={content} />
		</div>
	)


}

export default Bubble