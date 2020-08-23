import React from 'react';
import { NavLink } from 'react-router-dom';
import {GraphIcon} from '../assets/icons';
import '../assets/menu.scss';

const menuOptions= [
  {
    text: "Homepage",
    url: '/',
    target: "",
    icon: <GraphIcon />
  },{
    // @TODO - need to investigate, current url is /http://...
    text: "Code",
    url: 'https://github.com/eemlcommunity/ro_benchmark_leaderboard',
    target: "_blank",
    icon: <GraphIcon />
  },{
    text: "Tasks",
    url: '/tasks',
    target: "",
    icon: <GraphIcon />
  },{
    text: "Leaderboard",
    url: '/leaderboard',
    target: "",
    icon: <GraphIcon />
  },{
    text: "Datasets",
    url: '/datasets',
    target: "",
    icon: <GraphIcon />
  },{
    text: "Submit",
    url: '/submit',
    target: "",
    icon: <GraphIcon />
  }];
  
const Menu = () => {
  return(
    <div className="header-menu">
      <ul>
        {menuOptions.map(currentItem => {
          return (
          <li>
            <NavLink exact to={currentItem.url} target={currentItem.target}>
                {currentItem.icon}
                <span>{currentItem.text}</span>
            </NavLink>
          </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Menu;