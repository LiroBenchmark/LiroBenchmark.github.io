import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Homepage from './Homepage';

const Dashboard = (props) => {
  const {location} = props;
  return (
    <Switch location={location}>
      <Route path="/" component={Homepage} />
    </Switch>
  )
}

export default Dashboard;
