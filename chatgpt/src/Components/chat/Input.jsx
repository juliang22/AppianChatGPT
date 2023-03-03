import { MDBIcon } from 'mdb-react-ui-kit'
import React, { useContext } from 'react'
import { useState } from 'react';
import { v4 as uuidv4 } from "uuid";
import { L_BLUE, USER } from '../../constants';
import AppianContext from "../../context/AppianContext"

const Input = ({ conversation, setConversation }) => {
	const { Appian } = useContext(AppianContext)
	const [message, setMessage] = useState("")

	function addItem() {
		if (message !== undefined && message !== null && message.trim() !== "") {
			setConversation([...conversation, { id: uuidv4(), message, messageSender: USER }]);
			setMessage("")
		}
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