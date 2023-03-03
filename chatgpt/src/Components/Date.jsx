import React from 'react'
import { DATE } from '../constants'

const Date = () => {
	return (
		<div className="divider d-flex align-items-center mb-4">
			<p
				className="text-center mx-3 mb-0"
				style={{ color: "#a2aab7" }}
			>
				{DATE.toDateString()}
			</p>
		</div>
	)
}

export default Date