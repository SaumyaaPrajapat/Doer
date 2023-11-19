import React, { useState,useEffect } from "react";
import "./home.css";
import logo from "./logo.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import MainPage from "./mainpage";
import SideNavbar from "./sidenavbar";
import Card from "./card";
import { useDarkMode } from "./DarkModeContext";
import { Link } from "react-router-dom";
const App = () => {
  // const [cards, setCards] = useState([]);
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [userName, setUserName] = useState("");
  
  useEffect(() => {
    const storedName = sessionStorage.getItem("name");
    if (storedName) {
      setUserName(capitalizeFirstLetter(storedName));
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  // Function to capitalize the first letter of a string
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  // const addCard = () => {
  //   const newCard = <Card key={cards.length} />;
  //   setCards([...cards, newCard]);
  // };

  return (
    <div className={darkMode ? "dark-mode" : ""}>
      <div
        className={`navigation ${darkMode ? "dark-mode-content" : ""}`}
        style={{
          backgroundColor: darkMode ? "#1b1b1e" : "#F9F5F6",
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
              <div className="welcome-message">{userName || "user"}'s To Do List</div>
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
              <div style={{marginTop:"2%"}}>
                {/* Link to the home page */}
                <Link to="/" className="buttons1" >
                  Log Out
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <div className="page-container">
        {/* <div className="side-content">
          <SideNavbar />
        </div> */}
        <div>
          <div
            className={`main-content ${darkMode ? "dark-mode-content" : ""}`}
          >
            {/* <MainPage /> */}
          </div>
          <div
            className={`second-main-content ${
              darkMode ? "dark-mode-content" : ""
            }`}
          >
            <div>
              <Card />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
