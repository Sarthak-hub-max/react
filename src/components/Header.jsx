// Header.jsx
import React from "react";

const Header = ({ title = "Typing Test" }) => {
  return (
    <nav className="navbar navbar-light bg-light w-100 mb-4">
      <div className="container-fluid">
        <span className="navbar-brand mb-0 h1">{title}</span>
      </div>
    </nav>
  );
};

export default Header;
