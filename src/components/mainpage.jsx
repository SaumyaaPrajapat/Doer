//MainPage.jsx
import React from "react";
import "./mainpage.css";

const MainPage = () => {
  return (
    <div>
      <div className="button-container">
        <button type="button" className="custom-btn">
          All tasks
        </button>
        <button type="button" className="custom-btn">
          Completed
        </button>
        <button type="button" className="custom-btn">
          Pending
        </button>
        <button type="button" className="custom-btn">
          In progress
        </button>
      </div>
    </div>
  );
};

export default MainPage;
