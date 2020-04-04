// lib imports
import React from "react";
import Navbar from "react-bootstrap/Navbar";

// image imports
import Icon from "../../images/icon.png";

const NavBar = () => {
  return (
    <>
      <Navbar bg="light" variant="light">
        <Navbar.Brand href="#home">
          <img
            alt=""
            src={Icon}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          File Sharing
        </Navbar.Brand>
      </Navbar>
    </>
  );
};

export default NavBar;
