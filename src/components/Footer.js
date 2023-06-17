import { useContext } from "react";
import { MessageContext } from "../context/message-context";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  const mess = useContext(MessageContext);

  function logoutHandler() {
    mess.login(false);
    mess.logout(true);
  }

  return (
    <div className="footer__container">
      <Link to="/">
        <button onClick={logoutHandler} className="logout__button">
          Logout
        </button>
      </Link>
      <div>
        <p className="copy">
          Copyright &copy; 2023 by Ivan Mušković. All rights reserved
        </p>
      </div>
    </div>
  );
}

export default Footer;
