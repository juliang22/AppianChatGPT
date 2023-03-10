import React from 'react'
import { L_BLUE, USER } from '../../constants'

const UserMessage = ({ role, content, style: { GPTTextColor, GPTChatColor, userTextColor, userChatColor } }) => {

	return (
		role === USER ? (
			<div>
				<p className="small p-2 me-3 mb-1 rounded-3"
					style={{ backgroundColor: userChatColor, color: userTextColor }}>
					{content}
				</p>
			</div>
		) : (
			<div>
				<p className="small p-2 ms-3 mb-1 rounded-3"
					style={{ backgroundColor: GPTChatColor, color: GPTTextColor }}>
					{content}
				</p>
			</div>

		)

	)
}

export default UserMessage