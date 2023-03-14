import React from 'react'

import { GPT, USER } from '../../constants'
import Icon from './Icon'
import Message from './Message'

const Bubble = ({ role, content, style, userIcon, GPTIcon }) => {

	return role === USER ? (
		<div className="d-flex flex-row justify-content-end mb-4 pt-1">
			<Message role={USER} content={content} style={style} />
			<Icon icon={userIcon} />
		</div>
	) : (
		<div className="d-flex flex-row justify-content-start mb-3">
			<Icon icon={GPTIcon} />
			<Message role={GPT} content={content} style={style} />
		</div>
	)


}

export default Bubble