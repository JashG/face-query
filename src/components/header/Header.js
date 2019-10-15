import React from "react";
import { Nav, Navbar, Image } from "react-bootstrap";
import "./Header.css";

class Header extends React.Component {
  render() {
    return (
      <Navbar
        className="header-container"
        style={{ height: window.innerHeight * 0.1 }}
      >
        <Navbar.Brand
          className="header-brand"
          style={{ fontSize: 50, color: "white" }}
        >
          CBS
        </Navbar.Brand>
      </Navbar>
    );
  }
}

export default Header;
