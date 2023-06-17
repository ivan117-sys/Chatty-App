import { useState } from "react";
import useRandom from "./random";
import { useEffect } from "react";

function useGlobal() {
  const { color } = useRandom();
  const [loginYes, setLogin] = useState(false);
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState();
  const [drone, setDrone] = useState(null);
  const [members, setMembers] = useState([]);
  const [username, setUsername] = useState();
  const [logoutYes, setLogout] = useState(true);

  let id, dron;

  // /////////// LOCAL STORAGE SETUP ///////////////////////

  const usernameHandler = (username) => {
    setUsername(username);
  };

  function localUsername() {
    localStorage.setItem("username", username);
  }

  const login = (login) => {
    localStorage.setItem("user", "1");

    setLogin(login);
    setLogout(false);
  };

  useEffect(() => {
    usernameHandler();
  }, [loginYes]);

  useEffect(() => {
    const localStorageGetInfo = localStorage.getItem("user");
    const localUser = localStorage.getItem("username");

    if (localStorageGetInfo === "1") {
      setLogin(true);

      setUsername(localUser);
    }
  }, []);

  const logout = (logout) => {
    localStorage.setItem("user", "0");
    drone?.close();
    setLogout(logout);
    setDrone(null);
    setUser(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  useEffect(() => {
    if (loginYes) {
      setUpRoom();
      setTimeout(() => {
        localUsername();
      }, "10");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginYes]);

  // /////////////// SCALEDRONE SETUP /////////////////////////

  function setUpRoom() {
    const CHANELL_ID =
      `${process.env.REACT_APP_CHANNEL_ID}` || "{CHANNEL_ID_GOES_HERE}";

    if (username) {
      dron = new window.Scaledrone(CHANELL_ID, {
        data: [username, color],
      });
      dron.on("open", (error) => {
        if (error) {
          return console.log(error);
        }
        setDrone(dron);
        setUser({ username, id, color });
      });

      id = dron.clientId;

      const room = dron.subscribe("observable-room");

      room.on("open", (error) => {
        if (error) {
          console.error(error);
        } else {
          console.log("Connected to room");
        }
      });

      room.on("members", (members) => {
        setMembers([...members]);
      });

      room.on("member_join", (members) => {
        setMembers((currentMembers) => [...currentMembers, members]);
      });

      room.on("member_leave", (member) => {
        setMembers((currentMembers) => {
          return currentMembers.filter(
            (oneMember) => oneMember.id !== member.id
          );
        });
      });

      room.on("data", (message, member) => {
        setMessages((current) => {
          return [
            ...current,
            {
              message: [message],
              type: "Message",
              member: {
                member,
                color,
              },
            },
          ];
        });
      });
    }

    return publishMessage;
  }

  const publishMessage = function (message) {
    drone?.publish({
      room: "observable-room",
      message: message,
    });
  };

  return {
    messages,
    user,
    login,
    publishMessage,
    logout,
    loginYes,
    members,
    usernameHandler,
    logoutYes,
  };
}

export default useGlobal;
