// sidenavbar.jsx
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./sidenavbar.css";
import { useDarkMode } from "./DarkModeContext";

const SideNavbar = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className={`container-fluid ${darkMode ? "dark-mode-content" : ""}`}>
      <div className={`row ${darkMode ? "dark-mode-content" : ""}`}>
        <div className={`side-navbar ${darkMode ? "dark-mode" : ""}`}>
          <ul>
            <li>
              <a className="nav-link" href="/inbox">
                <i className="bi-envelope" />
                <span className={`ms-1 d-none d-sm-inline ${darkMode ? "text-white" : ""}`}>
                  Inbox
                </span>
              </a>
            </li>
            <li>
              <a className="nav-link" href="/dashboard">
                <i className="bi-bar-chart" />
                <span className={`ms-1 d-none d-sm-inline ${darkMode ? "text-white" : ""}`}>
                  Dashboard
                </span>
              </a>
            </li>
            <li>
              <a className="nav-link" href="/calendar">
                <i className="bi-calendar-check" />
                <span className={`ms-1 d-none d-sm-inline ${darkMode ? "text-white" : ""}`}>
                  Upcoming
                </span>
              </a>
            </li>
            <li>
              <a className="nav-link" href="/settings">
                <i className="bi-ui-checks-grid" />
                <span className={`ms-1 d-none d-sm-inline ${darkMode ? "text-white" : ""}`}>
                  Filters
                </span>
              </a>
            </li>
            <li>
              <a className="nav-link" href="/">
                <i className="bi-box-arrow-right" />
                <span className={`ms-1 d-none d-sm-inline ${darkMode ? "text-white" : ""}`}>
                  Logout
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideNavbar;
