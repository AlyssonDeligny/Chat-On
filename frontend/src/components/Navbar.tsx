import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const token = localStorage.getItem("token");

  return (
    <nav>
      <Link to="/">Home</Link>
      {!token ? (
        <Link to="/"></Link>
      ) : (
        <Link to="/chat">Chat</Link>
      )}
    </nav>
  );
};

export default Navbar;
