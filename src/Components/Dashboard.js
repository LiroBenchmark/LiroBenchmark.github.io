import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Homepage from './Homepage';
import UrlBuilder from './UrlBuilder';
import TaskDetails from './TaskDetails';
import DatasetDetails from './DatasetDetails';
import AboutPage from './AboutPage';
import SubmitPage from './SubmitPage';
import TermsAndConditionsPage from './TermsAndConditionsPage';
import PrivacyStatementPage from './PrivacyStatementPage';

const Dashboard = (props) => {
  const { location } = props;
  return (
    <Switch location={location}>
      <Route exact path="/about" component={AboutPage} />
      <Route exact path="/submit" component={SubmitPage} />
      <Route exact path={UrlBuilder.taskUrlTemplate} component={TaskDetails} />
      <Route exact path={UrlBuilder.datasetUrlTemplate} component={DatasetDetails} />
      <Route exact path="/terms-and-conditions" component={TermsAndConditionsPage} />
      <Route exact path="/privacy-statement" component={PrivacyStatementPage} />
      <Route path="/" component={Homepage} />
    </Switch>
  );
};

export default Dashboard;
