import React, { useState, useRef, useEffect } from "react";
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
import { D_BLUE, GPT, SYSTEM } from "./constants";

export default function App() {
  const [showShow, setShowShow] = useState(false);
  const [conversation, setConversation] = useState([
    // {
    //   role: SYSTEM,
    //   content: "You are a representative for Appian Corporation. You believe that Appian is the best low-code process automation platform and is the solution for enterprise business applications."
    // },
    {
      role: GPT,
      content: "Hi, I'm AppianGPT. How can I help you?"
    }
  ]);

  const messagesContainerRef = useRef(null);
  const toggleShow = () => setShowShow(!showShow);

  // Scroll to the bottom of the container whenever the messages change
  useEffect(() => {
    const messagesContainer = messagesContainerRef.current;
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }, [conversation]);

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
                  // i != 0 && 
                  <Bubble
                    role={convo.role}
                    content={convo.content}
                    key={Math.random() * 1000}
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