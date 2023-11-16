import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "./img/Logo.png";
import "./firstPage.css";

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
    <div className="clock">
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

const FirstPage = () => {
  const [isHoveredSignUp, setIsHoveredSignUp] = useState(false);
  const [isHoveredLogin, setIsHoveredLogin] = useState(false);

  const buttonStyle = {
    marginRight: "10px",
    color: "#fff",
    border: "2px solid transparent",
    transition: "border 0.3s",
    fontWeight: "500",
    fontSize: "1rem",
  };

  const buttonHoverStyle = {
    border: "2px solid #fff",
  };
  return (
    <div className="containerStyle">
      <nav className="navbar navbar-expand-lg navbar-light" style={{ top: 0 }}>
        <div className="BAR">
          <Link to="/" className="navbar-brand">
            <img
              src={Logo}
              style={{ height: "150%", marginLeft: "15%" }}
              alt="Logo"
            />
          </Link>
          <div className="d-flex" style={{ marginTop: "1rem" }}>
            <ul
              className="navbar-nav"
              style={{ display: "flex", flexDirection: "row" }}
            >
              <li className="nav">
                <Link
                  to="/register"
                  className="nav-link btn btn-outline rounded-10"
                  style={{
                    ...buttonStyle,
                    ...(isHoveredSignUp ? buttonHoverStyle : {}),
                  }}
                  onMouseEnter={() => setIsHoveredSignUp(true)}
                  onMouseLeave={() => setIsHoveredSignUp(false)}
                >
                  Get Started
                </Link>
              </li>
              <li className="nav">
                <Link
                  to="/login"
                  className="nav-link btn btn-size-10 rounded-10"
                  style={{
                    ...buttonStyle,
                    ...(isHoveredLogin ? buttonHoverStyle : {}),
                  }}
                  onMouseEnter={() => setIsHoveredLogin(true)}
                  onMouseLeave={() => setIsHoveredLogin(false)}
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="groupedSectionStyle">
        <div className="newBox">
          {/* Div 1 */}
          <div className="tex">
            Chart the course to productivity, with
            <span className="textbox"> Doer.</span>
          </div>
          <div className="otherStyle">
            Doer is your centralized hub for tasks, streamlining teamwork and
            amplifying your productivity effortlessly. With everything in one
            place, make your workflow smoother and more efficient.
          </div>
          <div className="buttonsView">
            <div>
              <Link to="/register">
                <button
                  type="button"
                  className="btn-custom rounded-5"
                  style={{
                    backgroundColor: "#67BBD3",
                    color: "black",
                  }}
                >
                  Try Doer for free
                </button>
              </Link>
            </div>
            <div>
              <button type="button" className="btn-custom rounded-5">
                How it works
              </button>
            </div>
          </div>
        </div>
        <div className="design">
          <div className="checkmarkStyle">
            <div className="wrapper">
              <Clock />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstPage;
