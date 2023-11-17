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
  const [cards, setCards] = useState([]);
  const { darkMode, toggleDarkMode } = useDarkMode();

  const addCard = () => {
    const newCard = <Card key={cards.length} />;
    setCards([...cards, newCard]);
  };

  return (
    <div className={darkMode ? "dark-mode" : ""}>
      <div
        className={`navigation ${darkMode ? "dark-mode-content" : ""}`}
        style={{
          backgroundColor: darkMode ? "#1b1b1e" : "white",
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
              <div className="icon-container" onClick={addCard}>
                <i className="bi-plus-circle-fill add-icon"></i>
              </div>
              <form className="search-bar">
                <div className="input-group">
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Search"
                    style={{
                      padding: "8px",
                      border: "0px solid #ccc",
                      backgroundColor: darkMode ? "#1b1b1e" : "white",
                      color: darkMode ? "#ccc" : "#000",
                      outline: "none",
                      borderRadius: "4px",
                      boxShadow: darkMode
                        ? "inset 2px 3px 8px rgb(5, 5, 5)"
                        : "inset 2px 3px 8px #c2c2c2",
                    }}
                  />
                  <button
                    type="submit"
                    className="search-button"
                    style={{
                      backgroundColor: darkMode ? "#1b1b1e" : "#66b4db",
                    }}
                  >
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
            <div className="card-grid">
              {cards.map((card, index) => (
                <div key={index} className="horizontal-card">
                  {card}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
