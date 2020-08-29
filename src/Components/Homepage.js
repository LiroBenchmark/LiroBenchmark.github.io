import React from 'react';
import DomainTile from './DomainTile';
import data from '../data/domains.json';


const Homepage = () => data.domains.map(item=> <DomainTile key={item.id} id={item.id} name={item.domain} tasks={item.tasks} />)
// const Homepage = () => <DomainTile />

export default Homepage;
