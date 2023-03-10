import React from 'react'
import { GPT, USER } from '../../constants'
import Message from './Message'

const Bubble = ({ role, content, style, userIcon, GPTIcon }) => {

	return role === USER ? (
		<div className="d-flex flex-row justify-content-end mb-4 pt-1">
			<Message role={USER} content={content} style={style} />
			<img
				src={userIcon}
				alt="avatar 1"
				style={{ width: "45px", height: "100%" }}
			/>
		</div>
	) : (
		<div className="d-flex flex-row justify-content-start mb-3">
			<img
				src={GPTIcon}
				alt="avatar 1"
				style={{ width: "45px", height: "100%" }}
			/>
			<Message role={GPT} content={content} style={style} />
		</div>
	)


}

export default Bubble