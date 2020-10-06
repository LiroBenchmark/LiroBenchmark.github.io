import React from "react";
import Dashboard from "./Components/Dashboard";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import "./assets/root.scss";

const App = (props) => {
  const { location } = props;
  return (
    <div>
      <Header />
      <div className="container main-content">
        <Dashboard location={location} />
      </div>
      <Footer />
    </div>
  );
};

export default App;
