import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { LogoIcon, CodeIcon } from '../assets/icons';
import '../assets/menu.scss';
import UrlBuilder from './UrlBuilder';
import './Header.scss';

const Header = () => (
  <Navbar>
    <div className="logo-wrapper">
      <Navbar.Brand href="/ro_benchmark_leaderboard">
        <LogoIcon />
        <div className="logo-text">
          {' '}
          RoLa <br /> BENCHMARK{' '}
        </div>
      </Navbar.Brand>
    </div>
    <Nav className="justify-content-end">
      <Nav.Link href={UrlBuilder.submitPageUrl}>Submit</Nav.Link>
      <Nav.Link href={UrlBuilder.aboutPageUrl}>About</Nav.Link>
      <Nav.Link href={UrlBuilder.termsPageUrl}>Terms</Nav.Link>
      <Nav.Link
        className="code-btn"
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
