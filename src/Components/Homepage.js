import React from 'react';
import DomainTile from './DomainTile';
import data from '../data/domains.json';


const Homepage = () => {
    return (
        <>
	  {data.domains.map(item=>{
	      return(
                  <>
                    <DomainTile id={item.id} name={item.domain} tasks={item.tasks} />
	  	  </>
	      );
	  })}
        </>
    );
};

export default Homepage;
