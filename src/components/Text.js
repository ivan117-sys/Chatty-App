import React, { useContext, useState } from "react";
import "./Text.css";
import { MessageContext } from "../context/message-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

function Text() {
  const [message, setMessage] = useState("");
  const messageContext = useContext(MessageContext);

  function messageHandler(e) {
    setMessage(e.target.value);
  }

  function submitHandler(e) {
    e.preventDefault();
    messageContext.publishMessage(message);
    setMessage("");
  }

  return (
    <div className="text__container">
      <form className="input__form" onSubmit={submitHandler}>
        <input
          className="text__field"
          required
          onChange={messageHandler}
          value={message}
          placeholder="type your message here"
        ></input>
        <button className="send__button">Send</button>
        <button className="button__no-style">
          <FontAwesomeIcon className="send__icon" icon={faPaperPlane} />
        </button>
      </form>
    </div>
  );
}

export default Text;
