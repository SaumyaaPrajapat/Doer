import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import DateDisplay from "./DateDisplay";
import "./sidenavbar.css";

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
  return (
    <div className="side-navbar-container open">
      <div className="close-icon" onClick={onClose}>
        <i className="bi bi-x" />
      </div>
      <div className="side-clock">
        <Clock />
      </div>
      <div className="side-date">
        <DateDisplay />
      </div>
    </div>
  );
};

export default SideNavbar;
