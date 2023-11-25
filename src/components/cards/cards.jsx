import React, { useState } from "react";
import "./cards.css";
import "./update.css";
import white from "../img/white.png";
import black from "../img/black.png";
import { MdDeleteForever } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { GrCompliance } from "react-icons/gr";
const Card = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [isAnimatedVisible, setAnimatedVisible] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null); // Add editingIndex state

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
    setEditingIndex(null); // Reset editing index when closing the popup
  };

  const showPopup = (index) => {
    setPopupOpen(true);
    setAnimatedVisible(false);
    setEditingIndex(index);
  
    // Check if the task at the given index exists before accessing its properties
    if (index !== null && tasks[index]) {
      setTaskName(tasks[index].taskName);
      setDescription(tasks[index].description);
    } else {
      // If the index is null or the task doesn't exist, reset the form fields
      setTaskName("");
      setDescription("");
    }
  };
  

  const hidePopup = () => {
    setPopupOpen(false);
    setEditingIndex(null); // Reset editing index when hiding the popup
  };

  const handleAddTask = () => {
    if (editingIndex !== null) {
      // Update existing task
      const updatedTasks = [...tasks];
      updatedTasks[editingIndex] = { taskName, description };
      setTasks(updatedTasks);
    } else {
      // Add new task
      const newTask = { taskName, description };
      setTasks((prevTasks) => [...prevTasks, newTask]);
    }

    hidePopup();
  };

  return (
    <div>
      <div className="addtask" onClick={() => showPopup(null)}>
        <button className="custom-btn btn-9">+ Create Task</button>
      </div>

      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <input
              type="text"
              placeholder="Enter Task"
              className="inputs"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
            <textarea
              id="textarea"
              type="text"
              placeholder="Description"
              className="input-2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="buttons">
              <button onClick={handleAddTask}>Add Task</button>
            </div>
          </div>
        </div>
      )}
      {isAnimatedVisible && (
        <div className="animated">
          <img src={isDarkMode ? black : white} alt="no text" />
        </div>
      )}

      <div className="task-cards">
        {tasks.map((task, index) => (
          <div className="task-card" key={index}>
            <h3>{task.taskName}</h3>
            <p>{task.description}</p>
            <div className="button-container">
              <button>
                <GrCompliance />
              </button>
              <button>
                <MdDeleteForever />
              </button>
              <button onClick={() => showPopup(index)}>
                <FaRegEdit />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
