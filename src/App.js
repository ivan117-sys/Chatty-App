import Header from "./components/Header";
import Conversation from "./components/Conversation";
import Texts from "./components/Text";
import useGlobal from "./hooks/global";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import Room from "./components/Room";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { MessageContext } from "./context/message-context";

function App() {
  const {
    messages,
    text,
    user,
    publishMessage,
    usernameHandler,
    login,
    logout,
    loginYes,
    members,
    isLoading,
  } = useGlobal();

  return (
    <MessageContext.Provider
      value={{
        text: text,
        messages: messages,
        user: user,
        login: login,
        publishMessage: publishMessage,
        logout: logout,
        loginYes: loginYes,
        members: members,
        setUsername: usernameHandler,
        logoutYes: loginYes,
        isLoading: isLoading,
      }}
    >
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        {loginYes && (
          <Route
            path="/main"
            element={
              <main>
                <Room /> <Conversation /> <Texts />
              </main>
            }
          />
        )}
      </Routes>
      {loginYes && <Footer />}
    </MessageContext.Provider>
  );
}

export default App;
