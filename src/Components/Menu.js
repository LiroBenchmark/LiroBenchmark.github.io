import React from "react";
import { CodeIcon } from "../assets/icons";
import "../assets/menu.scss";

const Menu = () => (
  <div className="header-menu">
    <ul>
      <li>
        <a href="/about">About</a>
      </li>
      <li>
        <a
          href="https://github.com/eemlcommunity/ro_benchmark_leaderboard"
          target="_blank"
          rel="noopener noreferrer"
        >
          <CodeIcon />
          <span>Code</span>
        </a>
      </li>
    </ul>
  </div>
);

export default Menu;
