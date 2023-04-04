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
import Lottie from "lottie-react";
import { v4 as uuidv4 } from "uuid";

import typingGif from './Animations/typing.json'
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
  MODEL_KEY,
  TEMPERATURE_KEY,
  TOP_P_KEY,
  N_KEY,
  STOP_KEY,
  MAX_TOKENS_KEY,
  PRESENCE_PENALTY_KEY,
  FREQUENCY_PENALTY_KEY,
  USER_KEY,
  DEFAULT_TITLE_TEXT,
  DEFAULT_WHITE_TEXT,
  DEFAULT_BLACK_TEXT,
  DEFAULT_GPT_CHAT_BG,
  L_BLUE,
  TITLE_TEXT_KEY,
  TITLE_TEXT_COLOR_KEY,
  TITLE_BACKGROUND_COLOR_KEY,
  GPT_TEXT_COLOR_KEY,
  GPT_CHAT_COLOR_KEY,
  USER_TEXT_COLOR_KEY,
  USER_CHAT_COLOR_KEY,
  SEND_BUTTON_COLOR_KEY,
  USER_ICON_KEY,
  GPT_ICON_KEY,
  OPENAI_ICON,
  APPIAN_ICON,
  CHAT_HEIGHT_KEY,
  CHAT_HEIGHT_DEFAULT
} from "./constants";
import AppianContext from "./context/AppianContext"
import { isHexCode, isValidUrl } from "./Util";
import Icon from "./Components/chat/Icon";

export default function App() {
  const messagesContainerRef = useRef(null);
  const { allparameters, Appian } = useContext(AppianContext)

  const [showShow, setShowShow] = useState(false);
  const [caret, setCaret] = useState("chevron-down");
  const [conversation, setConversation] = useState([
    { role: SYSTEM, content: allparameters[SYSTEM_MESSAGE_KEY] || DEFAULT_SYSTEM_MESSAGE },
    { role: GPT, content: allparameters[INITIAL_MESSAGE_KEY] || DEFAULT_INITIAL_MESSAGE }
  ]);

  // Developer Settings
  const [model, setModel] = useState(allparameters[MODEL_KEY] || DEFAULT_MODEL)
  const [temperature, setTemperature] = useState(null)
  const [top_p, setTop_p] = useState(null)
  const [n, setN] = useState(null)
  const [stop, setStop] = useState(null)
  const [max_tokens, setMaxTokens] = useState(null)
  const [presence_penalty, setPresencePenalty] = useState(null)
  const [frequency_penalty, setFrequencyPenalty] = useState(null)
  const [user, setUser] = useState(null)
  const [userIcon, setUserIcon] = useState(APPIAN_ICON)
  const [GPTIcon, setGPTIcon] = useState(OPENAI_ICON)

  // Webhook for auditing
  const [conversationId, setConversationId] = useState(uuidv4())

  // Style Settings
  const [titleText, setTitleText] = useState(DEFAULT_TITLE_TEXT)
  const [titleTextColor, setTitleTextColor] = useState(DEFAULT_WHITE_TEXT)
  const [titleBackgroundColor, setTitleBackgroundColor] = useState(D_BLUE)
  const [GPTTextColor, setGPTTextColor] = useState(DEFAULT_BLACK_TEXT)
  const [GPTChatColor, setGPTChatColor] = useState(DEFAULT_GPT_CHAT_BG)
  const [userTextColor, setUserTextColor] = useState(DEFAULT_WHITE_TEXT)
  const [userChatColor, setUserChatColor] = useState(L_BLUE)
  const [sendButtonColor, setSendButtonColor] = useState(L_BLUE)

  // Height
  const [topBarHeight, setTopBarHeight] = useState(CHAT_HEIGHT_DEFAULT);
  const topBarRef = useRef(null);

  // Typing indicator
  const [isLoading, setIsLoading] = useState(false)

  // toggle for collapsing UI
  const toggleShow = () => {
    caret === "chevron-down" ? setCaret("chevron-up") : setCaret("chevron-down")
    setShowShow(!showShow);
  }

  useEffect(() => {
    // Setting Height
    setTopBarHeight(allparameters[CHAT_HEIGHT_KEY] || allparameters[CHAT_HEIGHT_KEY] === "auto" ? CHAT_HEIGHT_DEFAULT : allparameters[CHAT_HEIGHT_KEY])
  }, [topBarRef.current?.clientHeight, allparameters]);

  useEffect(() => {

    // Setting chat height
    setTopBarHeight(allparameters[CHAT_HEIGHT_KEY] || CHAT_HEIGHT_DEFAULT)

    // Setting new model if user provided
    setModel(allparameters[MODEL_KEY] || DEFAULT_MODEL);

    // Setting new system/initial message it user provided
    let systemMessage = allparameters[SYSTEM_MESSAGE_KEY] || DEFAULT_SYSTEM_MESSAGE;
    let initialMessage = allparameters[INITIAL_MESSAGE_KEY] || DEFAULT_INITIAL_MESSAGE;
    setConversation((prevConversation) => {
      const newDefaultSystemMessage = { role: SYSTEM, content: systemMessage };
      const newDefaultInitialMessage = { role: GPT, content: initialMessage };
      return [newDefaultSystemMessage, newDefaultInitialMessage, ...prevConversation.slice(2, prevConversation.length)];
    });

    // Setting developer chatbot specific settings
    const chatbotSettings = {
      [TEMPERATURE_KEY]: setTemperature,
      [TOP_P_KEY]: setTop_p,
      [N_KEY]: setN,
      [STOP_KEY]: setStop,
      [MAX_TOKENS_KEY]: setMaxTokens,
      [PRESENCE_PENALTY_KEY]: setPresencePenalty,
      [FREQUENCY_PENALTY_KEY]: setFrequencyPenalty,
      [USER_KEY]: setUser,
    };

    Object.entries(chatbotSettings).forEach(([key, setValue]) => {
      setValue(allparameters[key] !== undefined && allparameters[key] !== null ?
        allparameters[key] :
        null
      )
    });

    // Setting styling
    if (allparameters["style"]) {
      const styleObj = allparameters["style"];

      // setting icons
      setUserIcon(styleObj[USER_ICON_KEY] && isValidUrl(styleObj[USER_ICON_KEY]) ? styleObj[USER_ICON_KEY] : APPIAN_ICON)
      setGPTIcon(styleObj[GPT_ICON_KEY] && isValidUrl(styleObj[GPT_ICON_KEY]) ? styleObj[GPT_ICON_KEY] : OPENAI_ICON)

      // Setting title text if user provided
      setTitleText(styleObj[TITLE_TEXT_KEY] || DEFAULT_TITLE_TEXT)

      const chatbotColorSettings = {
        [TITLE_TEXT_COLOR_KEY]: { defaultValue: DEFAULT_WHITE_TEXT, setter: setTitleTextColor },
        [TITLE_BACKGROUND_COLOR_KEY]: { defaultValue: D_BLUE, setter: setTitleBackgroundColor },
        [GPT_TEXT_COLOR_KEY]: { defaultValue: DEFAULT_BLACK_TEXT, setter: setGPTTextColor },
        [GPT_CHAT_COLOR_KEY]: { defaultValue: DEFAULT_GPT_CHAT_BG, setter: setGPTChatColor },
        [USER_TEXT_COLOR_KEY]: { defaultValue: DEFAULT_WHITE_TEXT, setter: setUserTextColor },
        [USER_CHAT_COLOR_KEY]: { defaultValue: L_BLUE, setter: setUserChatColor },
        [SEND_BUTTON_COLOR_KEY]: { defaultValue: L_BLUE, setter: setSendButtonColor },
      };

      Object.entries(chatbotColorSettings).forEach(([key, { defaultValue, setter }]) => {
        if (styleObj.hasOwnProperty(key)) {
          const param = styleObj[key]
          if (typeof param !== 'string' || !isHexCode(param)) {
            Appian.Component.setValidations(`The parameter ${key} is not a valid string hex code.`)
            setter(defaultValue)
            return
          }
          const value = param !== null && param !== '' ? param : defaultValue
          setter(value)
        } else {
          setter(defaultValue)
        }
      });
    }


  }, [allparameters, Appian.Component, titleText]);

  // Use an effect to scroll to the bottom of the messages container
  useEffect(() => {
    const messagesContainer = messagesContainerRef.current;
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }, [conversation]);


  return (
    <MDBContainer fluid style={{ overflow: "auto", "overflowX": "hidden", padding: 0 }} ref={messagesContainerRef}>
      <MDBRow className="d-flex justify-content-center">
        <MDBCol md="8" lg="6" xl="4" style={{ width: "100%", height: showShow ? topBarHeight : "auto" }}>
          <MDBBtn onClick={toggleShow} style={{ backgroundColor: titleBackgroundColor, textTransform: "none", fontSize: "1.1rem" }} size="lg" block>
            <div class="d-flex justify-content-between align-items-center" style={{ color: titleTextColor, height: topBarRef.current?.clientHeight }} ref={topBarRef}>
              {titleText}
              <MDBIcon fas icon={caret} />
            </div>
          </MDBBtn>
          <MDBCollapse show={showShow} >
            <MDBCard id="chat4" >
              <MDBCardBody>
                <Date />
                {conversation.map((convo, i) =>
                  i !== 0 &&
                  <Bubble
                    role={convo.role}
                    content={convo.content}
                    key={i}
                    style={{ GPTTextColor, GPTChatColor, userTextColor, userChatColor }}
                    userIcon={userIcon}
                    GPTIcon={GPTIcon}
                  />)}
                {isLoading && (
                  <div className="d-flex flex-row justify-content-start mb-3">
                    <Icon icon={GPTIcon} />
                    <p className="small p-2 ms-3 mb-1 rounded-3">
                      <Lottie animationData={typingGif} loop={true} style={{ width: 70, height: 35 }} />
                    </p>
                  </div>
                )}
              </MDBCardBody>

              <MDBCardFooter >
                <Input
                  conversation={conversation}
                  setConversation={setConversation}
                  model={model}
                  temperature={temperature}
                  top_p={top_p}
                  n={n}
                  stop={stop}
                  max_tokens={max_tokens}
                  presence_penalty={presence_penalty}
                  frequency_penalty={frequency_penalty}
                  user={user}
                  sendButtonColor={sendButtonColor}
                  setIsLoading={setIsLoading}
                />
              </MDBCardFooter>
            </MDBCard>
          </MDBCollapse>
        </MDBCol>
      </MDBRow>
    </MDBContainer >
  );
}