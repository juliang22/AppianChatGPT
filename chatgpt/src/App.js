import React, { useState, useRef, useEffect, useContext } from "react";
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
import {
  D_BLUE,
  GPT, SYSTEM,
  DEFAULT_SYSTEM_MESSAGE,
  DEFAULT_INITIAL_MESSAGE,
  SYSTEM_MESSAGE_KEY,
  INITIAL_MESSAGE_KEY,
  DEFAULT_MODEL,
  MODEL_KEY
} from "./constants";
import AppianContext from "./context/AppianContext"

export default function App() {
  const messagesContainerRef = useRef(null);
  const { allparameters } = useContext(AppianContext)


  const [showShow, setShowShow] = useState(false);
  const [conversation, setConversation] = useState([
    { role: SYSTEM, content: allparameters[SYSTEM_MESSAGE_KEY] || DEFAULT_SYSTEM_MESSAGE },
    { role: GPT, content: allparameters[INITIAL_MESSAGE_KEY] || DEFAULT_INITIAL_MESSAGE }
  ]);
  const [model, setModel] = useState(allparameters[MODEL_KEY] || DEFAULT_MODEL)

  // toggle for collapsing UI
  const toggleShow = () => setShowShow(!showShow);

  useEffect(() => {

    // setting new model if user provided
    setModel(allparameters[MODEL_KEY] || DEFAULT_MODEL);

    // setting new system/initial message it user provided
    let systemMessage = allparameters[SYSTEM_MESSAGE_KEY] || DEFAULT_SYSTEM_MESSAGE;
    let initialMessage = allparameters[INITIAL_MESSAGE_KEY] || DEFAULT_INITIAL_MESSAGE;
    setConversation((prevConversation) => {
      const newDefaultSystemMessage = { role: SYSTEM, content: systemMessage };
      const newDefaultInitialMessage = { role: GPT, content: initialMessage };
      return [newDefaultSystemMessage, newDefaultInitialMessage, ...prevConversation.slice(2, prevConversation.length)];
    });



  }, [allparameters]);

  // Use an effect to scroll to the bottom of the messages container
  useEffect(() => {
    const messagesContainer = messagesContainerRef.current;
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }, [conversation]);

  console.log(allparameters[SYSTEM_MESSAGE_KEY], allparameters[INITIAL_MESSAGE_KEY], allparameters[MODEL_KEY], conversation)

  return (
    <MDBContainer fluid className="py-5" style={{ overflow: "auto" }} ref={messagesContainerRef}>
      <MDBRow className="d-flex justify-content-center">
        <MDBCol md="8" lg="6" xl="4">
          <MDBBtn onClick={toggleShow} style={{ backgroundColor: D_BLUE, textTransform: "none", fontSize: "1.1rem" }} size="lg" block>
            <div class="d-flex justify-content-between align-items-center">
              Appian Assist
              <MDBIcon fas icon="chevron-down" />
            </div>
          </MDBBtn>
          <MDBCollapse show={showShow} >
            <MDBCard id="chat4" style={{ overflowY: "scroll" }} >
              <MDBCardBody>
                <Date />
                {conversation.map((convo, i) =>
                  i !== 0 &&
                  <Bubble
                    role={convo.role}
                    content={convo.content}
                    key={i}
                  />)}
              </MDBCardBody>

              <MDBCardFooter >
                <Input
                  conversation={conversation}
                  setConversation={setConversation}
                  model={model} />
              </MDBCardFooter>
            </MDBCard>
          </MDBCollapse>
        </MDBCol>
      </MDBRow>
    </MDBContainer >
  );
}