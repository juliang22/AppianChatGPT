import React from 'react'
import { L_BLUE, USER } from '../../constants'

const UserMessage = ({ messageSender, message }) => {
	console.log(messageSender, messageSender === USER)
	return (
		messageSender === USER ? (
			<div>
				<p className="small p-2 me-3 mb-1 text-white rounded-3 "
					style={{ backgroundColor: L_BLUE }}>
					{message}
				</p>
			</div>
		) : (
			<div>
				<p className="small p-2 ms-3 mb-1 rounded-3"
					style={{ backgroundColor: "#f5f6f7" }}>
					{message}
				</p>
			</div>

		)

	)
}

export default UserMessage