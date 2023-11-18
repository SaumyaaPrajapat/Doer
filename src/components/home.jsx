import React, { useState } from "react";
import "./home.css";
import logo from "./logo.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import MainPage from "./mainpage";
import SideNavbar from "./sidenavbar";
import Card from "./card";
import { useDarkMode } from "./DarkModeContext";
const App = () => {
 
  const { darkMode, toggleDarkMode } = useDarkMode();

  
  return (
    <div className={darkMode ? "dark-mode" : ""}>
      <div
        className={`navigation ${darkMode ? "dark-mode-content" : ""}`}
        style={{
          backgroundColor: darkMode ? "black" : "#ccc",
        }}
      >
        <nav className="navbar navbar-expand-lg custom-navbar">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              <img className="logo-image" src={logo} alt="Logo" />
              <span className="doer-text">Doer</span>
            </a>

            <div
              className={`welcome-container ${
                darkMode ? "dark-mode-content" : ""
              }`}
            >
              <div className="welcome-message">Welcome back, user!</div>
            </div>
            <div className="left-nav">
              <div className="icon-container" onClick={toggleDarkMode}>
                {darkMode ? (
                  <i className="bi-moon-fill dark-mode-icon"></i>
                ) : (
                  <i className="bi-sun-fill dark-mode-icon"></i>
                )}
              </div>
              {/* <div className="icon-container" onClick={addCard}>
                <i className="bi-plus-circle-fill add-icon"></i>
              </div> */}
              <form className="search-bar">
                <div className="input-group">
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Search"
                  />
                  <button type="submit" className="search-button">
                    <i className="bi bi-search"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </nav>
      </div>
      <div className="page-container">
        <div className="side-content">
          <SideNavbar />
        </div>
        <div>
          <div
            className={`main-content ${darkMode ? "dark-mode-content" : ""}`}
          >
            <MainPage />
          </div>
          <div
            className={`second-main-content ${
              darkMode ? "dark-mode-content" : ""
            }`}
          >
            <div >
            <Card/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
