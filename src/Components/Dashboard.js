import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Homepage from './Homepage';
import Tasks from './Tasks';
import Leaderboard from './Leaderboard';
import Datasets from './Datasets';
import Submit from './Submit';

const Dashboard = (props) => {
  const {location} = props;
  return (
    <Switch location={location}>
      <Route exact path="/tasks" component={Tasks} />
      <Route exact path="/leaderboard" component={Leaderboard} />
      <Route exact path="/datasets" component={Datasets} />
      <Route exact path="/submit" component={Submit} />
      <Route path="/" component={Homepage} />
    </Switch>
  )
}

export default Dashboard;