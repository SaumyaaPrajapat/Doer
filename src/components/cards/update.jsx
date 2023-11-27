import React, { useState } from "react";
import "./update.css";

const Update = ({ onClose, onUpdate, taskId, taskName, description }) => {
  const [updatedTaskName, setUpdatedTaskName] = useState(taskName);
  const [updatedDescription, setUpdatedDescription] = useState(description);

  const handleUpdate = () => {
    onUpdate(taskId, updatedTaskName, updatedDescription);

    // Close the modal
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="update-overlay">
      <div className="update-content">
        <h3 className="updatetext">Update Your Task</h3>
        <input
          type="text"
          className="todo-input"
          placeholder="TaskName"
          value={updatedTaskName}
          onChange={(e) => setUpdatedTaskName(e.target.value)}
        />
        <textarea
          className="todo"
          placeholder="Description"
          value={updatedDescription}
          onChange={(e) => setUpdatedDescription(e.target.value)}
        />
        <div className="btns2">
          <button className="btn" onClick={handleUpdate}>
            Update
          </button>
          <button className="btns" onClick={handleClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Update;
