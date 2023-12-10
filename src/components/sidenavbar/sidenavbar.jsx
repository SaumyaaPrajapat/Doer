import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import DateDisplay from "./DateDisplay";
import "./sidenavbar.css";
import Pic from "../img/pic.png";
import { FaUserCircle } from "react-icons/fa";

import { useDarkMode } from "../navbar/DarkModeContext.js";
const Clock = () => {
  let time = new Date().toLocaleTimeString();

  const [ctime, setTime] = useState(time);
  const UpdateTime = () => {
    time = new Date().toLocaleTimeString();
    setTime(time);
  };
  setInterval(UpdateTime);
  return <h1 className="clock-container">{ctime}</h1>;
};

const SideNavbar = ({ onClose }) => {
  const [name, setUserName] = useState("");

  useEffect(() => {
    const storedName = sessionStorage.getItem("name");

    if (storedName) {
      setUserName(capitalizeFirstLetter(storedName));
    }
  }, []);

  // Function to capitalize the first letter of a string
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  return (
    <div className={`side-navbar-container ${isDarkMode ? "dark-mode" : ""} open`}>
      <div className="close-icon" onClick={onClose}>
        <i className="bi bi-x" />
      </div>
      <div className={`side-clock ${isDarkMode ? "dark-mode" : ""}`}>
        <Clock />
      </div>
      <div className={`side-date ${isDarkMode ? "dark-mode" : ""}`}>
        <DateDisplay />
      </div>
      <div className="procontainer">
        <h3 className="text-center">Profile</h3>
        <form className="proform">
          <div className="circle-container">
            <div className="circle">
              <FaUserCircle className="profile" />
            </div>
          </div>
          <div className="progroup">
            <label htmlFor="name" className="form-label">
              <strong>Name:</strong>
            </label>
            <h3 className="pro">{name || "user"}</h3>
          </div>
        </form>
      </div>
      <div className={`side-thought ${isDarkMode ? "dark-mode" : ""}`}>
        <img src={Pic} style={{ height: "80%", marginTop: "10%" }} alt="Logo" />
      </div>
    </div>
  );
};

export default SideNavbar;
