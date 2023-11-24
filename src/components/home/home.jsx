import React, { useState } from "react";
import "./home.css";
import Navbar from "../navbar/navbar";
import SideNavbar from "../sidenavbar/sidenavbar";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <div className="nav-container">
        <Navbar onToggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      </div>
      <div className="page-container">
        {/* Conditionally render SideNavbar based on isSidebarOpen */}
        {isSidebarOpen && (
          <div className="side-content">
            {isSidebarOpen && <SideNavbar onClose={toggleSidebar} />}
          </div>
        )}
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
