import { useContext } from "react";
import { MessageContext } from "../context/message-context";
import { motion } from "framer-motion";
import React from "react";

import "./Room.css";

function Room() {
  const mess = useContext(MessageContext);

  if (mess.members[0]) {
    return (
      <motion.div
        className="section__container"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99] }}
      >
        <h1 className="chat__text">Currently in chat room:</h1>
        <div className="room__container">
          {mess?.members.map((member) => (
            <React.Fragment key={member.id}>
              <div
                style={{
                  backgroundColor: member.clientData[1],
                  width: "3rem",
                  height: "3rem",
                  borderRadius: "50%",
                  position: "relative",
                  left: "1.4rem",
                }}
              ></div>
              <div>
                <div className="room__list">{member.clientData[0]}</div>
                <p className="dissapear">Just joined chat</p>
              </div>
            </React.Fragment>
          ))}
        </div>
      </motion.div>
    );
  } else {
  }
}

export default Room;
