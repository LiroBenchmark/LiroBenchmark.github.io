import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { LogoIcon, CodeIcon } from "../assets/icons";
import "../assets/menu.scss";

const Header = () => (
  <Navbar bg="dark" variant="dark">
    <div className="logo-wrapper">
      <Navbar.Brand href="/ro_benchmark_leaderboard">
        <LogoIcon />
        {/* <img
        alt=""
        src={logo}
        width="30"
        height="30"
        className="d-inline-block align-top"
      />{' '} */}
        RoLa benchmark
      </Navbar.Brand>
    </div>
    <Nav className="justify-content-end">
      <Nav.Link href="/about">About</Nav.Link>
      <Nav.Link
        href="https://github.com/eemlcommunity/ro_benchmark_leaderboard"
        target="_blank"
        rel="noopener noreferrer"
      >
        <CodeIcon />
        <span>Code</span>
      </Nav.Link>
    </Nav>
  </Navbar>
);

export default Header;
