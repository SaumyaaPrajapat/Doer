//sidenavbar.jsx
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./sidenavbar.css";
import { useDarkMode } from "./DarkModeContext";
import { useDispatch } from "react-redux/es/exports";
import { authActions } from "../store";

const SideNavbar = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const dispatch = useDispatch();
  const logout = () => {
    sessionStorage.clear("id");
    dispatch(authActions.logout());
  };
  // Define boxShadow style based on darkMode condition
  const boxShadowStyle = darkMode
    ? "5px 5px 12px #0b0b0c, -5px -5px 12px #2b2b30"
    : "13px 13px 33px #ababab, -13px -13px 33px #ffffff";

  return (
    <div
      className={`container-fluid ${darkMode ? "dark-mode-content" : ""}`}
      style={{
        backgroundColor: darkMode ? "black" : "#ccc",
      }}
    >
      <div
        className={`row ${darkMode ? "dark-mode-content" : ""}`}
        style={{
          backgroundColor: darkMode ? "black" : "#ccc",
        }}
      >
        <div className="col-auto side-navbar">
          <ul>
            <li>
              <a className="nav-link" href="/inbox">
                <i className="bi-envelope" />
                <span
                  className={`ms-1 d-none d-sm-inline ${
                    darkMode ? "text-white" : ""
                  }`}
                >
                  Inbox
                </span>
              </a>
            </li>
            <li>
              <a className="nav-link" href="/dashboard">
                <i className="bi-bar-chart" />
                <span
                  className={`ms-1 d-none d-sm-inline ${
                    darkMode ? "text-white" : ""
                  }`}
                >
                  Dashboard
                </span>
              </a>
            </li>
            <li>
              <a className="nav-link" href="/calendar">
                <i className="bi-calendar-check" />
                <span
                  className={`ms-1 d-none d-sm-inline ${
                    darkMode ? "text-white" : ""
                  }`}
                >
                  Upcoming
                </span>
              </a>
            </li>
            <li>
              <a className="nav-link" href="/settings">
                <i className="bi-ui-checks-grid" />
                <span
                  className={`ms-1 d-none d-sm-inline ${
                    darkMode ? "text-white" : ""
                  }`}
                >
                  Filters
                </span>
              </a>
            </li>
            <li>
              <a className="nav-link" href="/" onClick={logout}>
                <i className="bi-box-arrow-right" />
                <span
                  className={`ms-1 d-none d-sm-inline ${
                    darkMode ? "text-white" : ""
                  }`}
                >
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
