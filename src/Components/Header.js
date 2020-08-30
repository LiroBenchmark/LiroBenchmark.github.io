import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Menu from './Menu';
import { LogoIcon } from '../assets/icons';

const Header = () => (
  <Navbar bg="dark" variant="dark">
    <div className="logo-wrapper">
      <Navbar.Brand href="/">
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
    <div className="main-menu">
      <Menu />
    </div>
  </Navbar>
);

export default Header;
