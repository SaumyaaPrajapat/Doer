import React, { useState, useEffect, useContext } from "react";
import SideNavbar from "../sidenavbar/sidenavbar";
import "./navbar.css";
import logo from "../img/blogo.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from "react-router-dom";
import { DarkModeProvider, useDarkMode } from "./DarkModeContext";
import { useDispatch } from "react-redux/es/exports";
import { authActions } from "../../store";

const Navbar = (props) => {
  const [userName, setUserName] = useState("");
  const { darkMode, toggleDarkMode } = useDarkMode();
  const { onToggleSidebar, isSidebarOpen } = props;

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

  // Function to get the first letter of the name
  const getFirstLetter = (str) => {
    return str.charAt(0).toUpperCase();
  };

  const dispatch = useDispatch();
  const logout = () => {
    sessionStorage.clear("id");
    dispatch(authActions.logout());
  };

  return (
    <div className={`navigation ${darkMode ? "dark-mode" : ""}`}>
      <nav
        className={`navbar navbar-expand-lg custom-navbar ${
          darkMode ? "dark-mode" : ""
        }`}
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img className="logo-image" src={logo} alt="Logo" />
            <span className="doer-text">Doer</span>
          </a>

          <div className="welcome-container">
            <div className="welcome-message">
              {userName || "user"}'s To Do List
            </div>
          </div>
          <div className="left-nav">
            <div className="icon-container" onClick={toggleDarkMode}>
              {darkMode ? (
                <i className="bi-moon-fill dark-mode-icon"></i>
              ) : (
                <i className="bi-sun-fill dark-mode-icon"></i>
              )}
            </div>
            <div className="userc" onClick={onToggleSidebar}>
              <span>{getFirstLetter(userName) || "."}</span>
            </div>
            <div style={{ marginTop: "2%" }}>
              <Link to="/" onClick={logout} className="buttons1">
                <i className="bi-box-arrow-right" />
                <span className="logout-text">Log Out</span>
              </Link>
            </div>
            <div className="icon-toggle" onClick={onToggleSidebar}>
              <i className="bi-list"></i>
            </div>
          </div>
        </div>
      </nav>
      {/* Conditionally render SideNavbar based on isSidebarOpen */}
      {isSidebarOpen && <SideNavbar onClose={onToggleSidebar} />}
    </div>
  );
};

export default Navbar;
