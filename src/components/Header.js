import React from "react";
import "./Header.css";

function Header() {
  return (
    <React.Fragment>
      <header>
        <p className="chattix__title">Chatty app</p>
        <div className="header__text__container"></div>
      </header>
    </React.Fragment>
  );
}

export default Header;
