import React from 'react';
import logo from './logo.svg';
import ghLogo from './mark-github.svg';
import graph from './graph.svg';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import './App.css';

function App() {
    return (
	<>
  <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="/">
      <img
        alt=""
        src={logo}
        width="30"
        height="30"
        className="d-inline-block align-top"
      />{' '}
      RoLa benchmark
    </Navbar.Brand>
    <Navbar.Toggle />
    <Navbar.Collapse className="justify-content-end">
      <Nav.Link href="/leaderboard">
      <img src={graph} />
      {' '}
      Leaderboard
    </Nav.Link>
    <Nav.Link href="https://github.com/eemlcommunity/ro_benchmark_leaderboard" target="_blank">
      <img src={ghLogo} />
      {' '}
      Code
    </Nav.Link>
    </Navbar.Collapse>
  </Navbar>
  <Container></Container>
</>
  );
}

export default App;
