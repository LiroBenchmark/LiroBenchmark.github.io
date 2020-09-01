import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Homepage from './Homepage';
import TaskDetails from './TaskDetails';

const Dashboard = (props) => {
  const { location } = props;
  return (
    <Switch location={location}>
      <Route exact path="/task/:id" component={TaskDetails} />
      <Route path="/" component={Homepage} />
    </Switch>
  );
};

export default Dashboard;
