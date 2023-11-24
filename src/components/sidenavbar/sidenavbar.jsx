import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import DateDisplay from "./DateDisplay";
import "./sidenavbar.css";

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalID = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalID);
  }, []);

  const hoursStyle = {
    transform: ` rotate(${
      (time.getHours() % 12) * 30 + time.getMinutes() / 2
    }deg)`,
  };

  const minutesStyle = {
    transform: ` rotate(${time.getMinutes() * 6}deg)`,
  };

  const secondsStyle = {
    transform: ` rotate(${time.getSeconds() * 6}deg)`,
  };
  return (
    <div className="clock1">
      <div className="hand hours" style={hoursStyle}></div>
      <div className="hand minutes" style={minutesStyle}></div>
      <div className="hand seconds" style={secondsStyle}></div>
      <div className="point"></div>
      <div className="marker">
        <span className="marker__1"></span>
        <span className="marker__2"></span>
        <span className="marker__3"></span>
        <span className="marker__4"></span>
      </div>
    </div>
  );
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
