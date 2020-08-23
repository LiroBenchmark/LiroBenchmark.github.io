import React from 'react';
import Dashboard from './Components/Dashboard';
import Header from './Components/Header';
import './assets/root.scss';


const App = (props) => {
  const {location} = props;
  return (
    <div>
      <Header />
      <div className="main-content">
        <Dashboard location={location }/>
      </div>
    </div>
  )
}

export default App;
