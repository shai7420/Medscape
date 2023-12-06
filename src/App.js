import React from "react";
import Navbar from "./Navbar";
import './App.css';

function App() {
  return (
    <>
    <div className="bg"></div>
    <Navbar/>
    <div className="eader">
    <header>Find Drugs & Information</header>
    </div>
    <p className="container para">Medscape is the most popular, comprehensive and up-to-date source of drug information online.<br/>
      Providing free, peer-reviewed, accurate and independent data on prescription drugs,<br/>
      over-the-counter medicines & natural products.</p>      
    </>
  );
}

export default App;