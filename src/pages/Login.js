import { useContext, useEffect, useState } from "react";
import { MessageContext } from "../context/message-context";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const messageContext = useContext(MessageContext);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();
  }, []);

  function usernameHandler(e) {
    setUsername(e.target.value);
  }

  function loginHandler(e) {
    e.preventDefault();
    messageContext.setUsername(username);
    messageContext.login(true);
    navigate("/main");
  }
  return (
    <div className="login__container">
      <form onSubmit={loginHandler} className="login__form">
        <label className="name__label" htmlFor="name">
          Name
        </label>
        <input
          className="login__input"
          placeholder="Choose your username"
          required
          value={username}
          onChange={usernameHandler}
          pattern="^(.{1,15})$"
          type="text"
          id="name"
        />
        <span className="error__message">min 1 letter max 15</span>
        <button className="login__button">Login</button>
      </form>
    </div>
  );
}

export default Login;
