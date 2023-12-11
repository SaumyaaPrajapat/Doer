import React from "react";
import "./home.css";
import Navbar from "../navbar/navbar";
import SideNavbar from "../sidenavbar/sidenavbar";
import Cards from "../cards/cards";
import { DarkModeProvider, useDarkMode } from "../navbar/DarkModeContext";

const AppContent = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={isDarkMode ? "dark-mode" : ""}>
      <div className="nav-container">
        <Navbar
          onToggleSidebar={toggleSidebar}
          onToggleDarkMode={toggleDarkMode}
          isSidebarOpen={isSidebarOpen}
          isDarkMode={isDarkMode}
        />
      </div>
      <div className="page-container">
        {isSidebarOpen && (
          <div className="side-content">
            {isSidebarOpen && <SideNavbar onClose={toggleSidebar} />}
          </div>
        )}
        <div>
          <div className="main-content">
            <div className="second-main-content">
              <div className={`${isDarkMode ? "dark-mode" : ""}`}>
                <Cards />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppContent;
