import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LogoIcon, CodeIcon } from '../assets/icons';
import '../assets/menu.scss';
import UrlBuilder from './UrlBuilder';
import './Header.scss';

const Header = () => (
  <Navbar collapseOnSelect expand="lg">
    <div className="logo-wrapper">
      <Navbar.Brand href="/ro_benchmark_leaderboard">
        <LogoIcon />
        <div className="logo-text">
          {' '}
          LiRo <br /> BENCHMARK{' '}
        </div>
      </Navbar.Brand>
    </div>
    <Navbar.Toggle aria-controls="menu-responsive" />
    <Navbar.Collapse id="menu-responsive" className="justify-content-end">
      <Nav>
        <Nav.Link href="/ro_benchmark_leaderboard">Home</Nav.Link>
        <Nav.Link href={UrlBuilder.submitPageUrl}>Submit</Nav.Link>
        <Nav.Link href={UrlBuilder.aboutPageUrl}>About</Nav.Link>
        <NavDropdown title="Legal" id="nav-dropdown-legal">
          <Nav.Link href={UrlBuilder.termsAndConditionsPageUrl}>Terms & Conditions</Nav.Link>
        </NavDropdown>
        <Nav.Link
          className="code-btn"
          href="https://github.com/eemlcommunity/ro_benchmark_leaderboard"
          target="_blank"
          rel="noopener noreferrer"
          id="code-btn"
        >
          <CodeIcon />
          <span>GitHub</span>
        </Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default Header;
