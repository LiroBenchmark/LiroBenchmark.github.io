import React from 'react';
import Dashboard from './Components/Dashboard';
import Header from './Components/Header';
import AppBreadcrumbs from './Components/AppBreadcrumbs';
import './assets/root.scss';

const App = (props) => {
  const { location } = props;
  return (
    <div>
      <Header />
      <AppBreadcrumbs />
      <div className="main-content">
        <Dashboard location={location} />
      </div>
    </div>
  );
};

export default App;
