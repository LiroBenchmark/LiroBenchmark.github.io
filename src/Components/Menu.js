import React from 'react';
import { NavLink } from 'react-router-dom';
import { GraphIcon } from '../assets/icons';
import '../assets/menu.scss';

const menuOptions = [
  {
    // @TODO - need to investigate, current url is /http://...
    text: 'Code',
    url: 'https://github.com/eemlcommunity/ro_benchmark_leaderboard',
    target: '_blank',
    icon: <GraphIcon />,
  },
  {
    text: 'Datasets',
    url: '/datasets',
    target: '',
  },
  {
    text: 'About',
    url: '/about',
    target: '',
  },
];

const Menu = () => (
  <div className="header-menu">
    <ul>
      {menuOptions.map((currentItem) => (
        <li key={currentItem.url}>
          <NavLink exact to={currentItem.url} target={currentItem.target}>
            {currentItem.icon}
            <span>{currentItem.text}</span>
          </NavLink>
        </li>
      ))}
    </ul>
  </div>
);

export default Menu;
