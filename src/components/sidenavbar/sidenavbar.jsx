import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import DateDisplay from "./DateDisplay";
import "./sidenavbar.css";
import { FaUserCircle } from "react-icons/fa";

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
  const [email, setUserEmail] = useState("");

  useEffect(() => {
    const storedName = sessionStorage.getItem("name");
    const storedEmail = sessionStorage.getItem("email");

    if (storedName) {
      setUserName(capitalizeFirstLetter(storedName));
    }
    if (storedEmail) {
      setUserEmail(storedEmail);
    }
  }, []);

  // Function to capitalize the first letter of a string
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

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
          <div className="progroup">
            <label htmlFor="description" className="form-label">
              <strong>Email:</strong>
            </label>
            <h3 className="pro">{email || "userEmail"}</h3>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SideNavbar;
