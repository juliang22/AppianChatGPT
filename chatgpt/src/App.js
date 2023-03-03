import React, { useContext, useState } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBBtn,
  MDBCardFooter,
  MDBCollapse,
} from "mdb-react-ui-kit";
import Date from "./Components/Date";
import Input from "./Components/chat/Input";
import Bubble from "./Components/chat/Bubble";
import { D_BLUE, GPT, USER } from "./constants";
import { v4 as uuidv4 } from "uuid";

export default function App() {
  const [showShow, setShowShow] = useState(false);
  const [conversation, setConversation] = useState([
    {
      messageSender: GPT,
      message: ["Hi, I'm AppianGPT. How can I help you?"]
    },
    {
      messageSender: USER,
      message: ["I am currently on fire. How to not?"]
    }
  ]);

  const toggleShow = () => setShowShow(!showShow);

  return (
    <MDBContainer fluid className="py-5">
      <MDBRow className="d-flex justify-content-center">
        <MDBCol md="8" lg="6" xl="4">
          <MDBBtn onClick={toggleShow} style={{ backgroundColor: D_BLUE }} size="lg" block>
            <div class="d-flex justify-content-between align-items-center">
              <span>AppianGPT</span>
              <MDBIcon fas icon="chevron-down" />
            </div>
          </MDBBtn>
          <MDBCollapse show={showShow} className="mt-3">
            <MDBCard id="chat4">

              <MDBCardBody>
                <Date />
                {conversation.map(convo => <Bubble
                  messageSender={convo.messageSender}
                  message={convo.message}
                  key={uuidv4()}
                />)}
              </MDBCardBody>

              <MDBCardFooter >
                <Input conversation={conversation} setConversation={setConversation} />
              </MDBCardFooter>
            </MDBCard>
          </MDBCollapse>
        </MDBCol>
      </MDBRow>
    </MDBContainer >
  );
}