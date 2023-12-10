import React, { useState } from "react";
import "./update.css";
import { useDarkMode } from "../navbar/DarkModeContext";

const Update = ({ onClose, onUpdate, taskId, taskName, description }) => {
  const [updatedTaskName, setUpdatedTaskName] = useState(taskName);
  const [updatedDescription, setUpdatedDescription] = useState(description);
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const handleUpdate = () => {
    onUpdate(taskId, updatedTaskName, updatedDescription);

    // Close the modal
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className={`update-overlay ${isDarkMode ? "dark-mode" : ""}`}>
      <div className={`update-content ${isDarkMode ? "dark-mode" : ""}`}>
        <h3 className={`updatetext ${isDarkMode ? "dark-mode" : ""}`}>
          Update Your Task
        </h3>
        <input
          type="text"
          className={`todo-input ${isDarkMode ? "dark-mode" : ""}`}
          placeholder="TaskName"
          value={updatedTaskName}
          onChange={(e) => setUpdatedTaskName(e.target.value)}
        />
        <textarea
          className={`todo ${isDarkMode ? "dark-mode" : ""}`}
          placeholder="Description"
          value={updatedDescription}
          onChange={(e) => setUpdatedDescription(e.target.value)}
        />
        <div className="btns2">
          <button
            className={`btn ${isDarkMode ? "dark-mode" : ""}`}
            onClick={handleUpdate}
          >
            Update
          </button>
          <button
            className={`btns ${isDarkMode ? "dark-mode" : ""}`}
            onClick={handleClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Update;
