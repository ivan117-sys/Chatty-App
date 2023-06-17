import React, { useContext, useRef, useEffect } from "react";
import "./Conversation.css";
import { MessageContext } from "../context/message-context";

function Conversation() {
  const mess = useContext(MessageContext);
  const scrollToRef = useRef(null);

  useEffect(() => {
    if (mess.messages) {
      scrollToRef.current.addEventListener("DOMNodeInserted", (event) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: "smooth" });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function messagePosition(message) {
    if (window.innerWidth > 692) {
      return mess?.user?.username !== message?.member?.member?.clientData[0]
        ? { position: "relative", right: "20rem" }
        : { position: "relative", left: "20rem" };
    }
  }

  function colorStyle(message) {
    return {
      backgroundColor: message?.member?.member?.clientData[1],
      width: "3rem",
      height: "3rem",
      borderRadius: "50%",
      position: "relative",
      top: "3rem",
      right: "3rem",
    };
  }

  function typeOfColor(message) {
    return mess?.user?.username !== message?.member?.member?.clientData[0]
      ? {
          color: message?.member?.member?.clientData[1],
        }
      : {};
  }

  function backgroundColor(message) {
    return mess?.user?.username !== message?.member?.member?.clientData[0]
      ? {
          backgroundColor: "#BEBDB8",
          color: "#111",
        }
      : {};
  }

  return (
    <React.Fragment>
      <div ref={scrollToRef} className="conversion__container">
        <div className="message__list data__container">
          {mess?.messages?.map((message) => (
            <div key={crypto.randomUUID()}>
              <ul className="list__container" style={messagePosition(message)}>
                <div className="color__div" style={colorStyle(message)}></div>

                <div>
                  <p style={typeOfColor(message)} className="sender__data">
                    {message?.member?.member?.clientData[0]}
                  </p>

                  <li style={backgroundColor(message)} className="message">
                    {message?.message}
                  </li>
                </div>
              </ul>
            </div>
          ))}
          <div ref={scrollToRef}></div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Conversation;
