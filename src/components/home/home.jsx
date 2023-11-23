import React from "react";
import "./home.css";
import Navbar from "../navbar/navbar";

const App = () => {
  return (
    <div>
      <div className="nav-container">
        <Navbar />
      </div>
      <div className="page-container">
        {/* <div className="side-content">
          <SideNavbar />
        </div> */}
        <div>
          <div className="main-content">{/* <MainPage /> */}</div>
          <div className="second-main-content">
            <div>{/*<Card />*/}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
