import React, { useState, useEffect } from "react";
import SideNavbar from "../sidenavbar/sidenavbar";
import "./navbar.css";
import logo from "../img/blogo.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux/es/exports";
import { authActions } from "../../store";

const Navbar = (props) => {
  const [userName, setUserName] = useState("");
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

  const dispatch = useDispatch();
  const logout = () => {
    sessionStorage.clear("id");
    dispatch(authActions.logout());
  };

  return (
    <div className="navigation">
      <nav className="navbar navbar-expand-lg custom-navbar">
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
            <div className="icon-container">
              <i className="bi-sun-fill dark-mode-icon"></i>
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
