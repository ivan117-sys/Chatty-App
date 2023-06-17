import { createContext } from "react";

export const MessageContext = createContext({
  messages: [{}],
  user: {},
  logout: true,
  loginYes: false,
  members: [],
  setLogin: () => {},
  setLogout: () => {},
  setUsername: () => {},
  publishMessage: () => {},
});
