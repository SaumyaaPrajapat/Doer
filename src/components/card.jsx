import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import { useDarkMode } from "./DarkModeContext";
import "./card.css";
import { BsFillTrashFill } from "react-icons/bs";
import Dropdown from "react-bootstrap/Dropdown";
import { BsX } from "react-icons/bs";

const Card = () => {
  const [contentVisible, setContentVisible] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [listItems, setListItems] = useState([]);
  const [taskName, setTaskName] = useState("Title");
  const [isEditingTaskName, setIsEditingTaskName] = useState(false);
  const [isTaskNameClicked, setIsTaskNameClicked] = useState(false);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [priority, setPriority] = useState("Medium"); // Default priority
  const { darkMode } = useDarkMode();

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddItem = () => {
    if (inputValue) {
      setListItems([...listItems, inputValue]);
      setInputValue("");
    }
  };

  const startEditingTaskName = () => {
    setIsEditingTaskName(true);

    const originalTitle = document.title;

    document.title = `${taskName} - Doer`;

    if (!isTaskNameClicked) {
      setIsTaskNameClicked(true);

      setTimeout(() => {
        document.title = originalTitle;
        setIsEditingTaskName(false);
      }, 30000);
    }
  };

  const handleTaskNameChange = (e) => {
    setTaskName(e.currentTarget.textContent);
    setIsEditingTaskName(false);
  };

  const handleTaskNameKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleTaskNameChange(e);
    }
  };

  const handleInputKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddItem();
    }
  };

  const toggleContent = () => {
    setContentVisible(!contentVisible);
  };

  const handleTaskCompletion = (index) => {
    const updatedCompletedTasks = [...completedTasks];

    if (updatedCompletedTasks.includes(index)) {
      updatedCompletedTasks.splice(updatedCompletedTasks.indexOf(index), 1);
    } else {
      updatedCompletedTasks.push(index);
    }

    setCompletedTasks(updatedCompletedTasks);
  };

  const handleDeleteTask = (index) => {
    const updatedListItems = [...listItems];
    updatedListItems.splice(index, 1);
    setListItems(updatedListItems);

    const updatedCompletedTasks = completedTasks.filter((taskIndex) => taskIndex !== index);
    setCompletedTasks(updatedCompletedTasks);
  };

  const handlePriorityChange = (newPriority) => {
    setPriority(newPriority);
  };

  return (
    <div
      className={` ${darkMode ? "dark-mode" : ""} `}
      style={{
        padding: "1rem",
        boxShadow: darkMode
          ? "5px 5px 12px #0b0b0c, -5px -5px 12px #2b2b30"
          : "13px 13px 33px #ababab, -13px -13px 33px #ffffff",
        borderRadius: "15px",
        marginLeft: "7rem",
        marginTop: "2rem",
      }}
    >
      <div
        onClick={startEditingTaskName}
        className={`title ${isEditingTaskName ? "editable" : ""} ${darkMode ? "dark-mode-content" : ""}`}
      >
        {isEditingTaskName ? (
          <input
            type="text"
            onBlur={handleTaskNameChange}
            onKeyPress={handleTaskNameKeyPress}
            value={taskName}
            style={{
              minWidth: "100px",
              color: darkMode ? "#fff" : "#000",
              backgroundColor: darkMode ? "#1b1b1e" : "inherit",
            }}
          />
        ) : (
          <div>{taskName}</div>
        )}
        <div className="arrowIconStyles" onClick={toggleContent}>
          <MdKeyboardDoubleArrowDown />
        </div>
      </div>
      {contentVisible && (
        <div className={`content ${darkMode ? "dark-mode-content" : ""}`}>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {listItems.map((item, index) => (
              <li
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "18px",
                  textDecoration: completedTasks.includes(index) ? "line-through" : "none",
                  color: completedTasks.includes(index) ? "#d3d3d3" : "inherit",
                }}
              >
                <input
                  type="checkbox"
                  style={{
                    marginRight: "12px",
                    width: "20px",
                    height: "20px",
                    backgroundColor: "transparent"
                  }}
                  onChange={() => handleTaskCompletion(index)}
                  checked={completedTasks.includes(index)}
                />
                <input
                  type="text"
                  value={item}
                  onChange={(e) => {
                    const updatedListItems = [...listItems];
                    updatedListItems[index] = e.target.value;
                    setListItems(updatedListItems);
                  }}
                  style={{
                    minWidth: "100px",
                    border: "none",
                    outline: "none",
                    backgroundColor: darkMode ? "#1b1b1e" : "inherit",
                    color: darkMode ? "#fff" : "inherit",
                  }}
                  disabled={completedTasks.includes(index)}
                />
                <button type="button" onClick={() => handleDeleteTask(index)} style={{ height: "30px", marginLeft: "0px",backgroundColor:"transparent", }}><BsX /></button>
              </li>
            ))}
          </ul>
          <div className="custom-form">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={handleInputKeyPress}
              placeholder="Add tasks to list"
              className={`custom-input ${contentVisible ? "enlarged" : ""}`}
              style={{
                padding: "8px",
                border: "0px solid #ccc",
                backgroundColor: darkMode ? "#1b1b1e" : "white",
                color: darkMode ? "#ccc" : "#000",
                outline: "none",
                borderRadius: "4px",
                boxShadow: darkMode ? "inset 2px 3px 8px rgb(5, 5, 5)" : "inset 2px 3px 8px #c2c2c2",
                minWidth: "100px",
                marginLeft: "40px", // Set a minimum width for the input field
              }}
            />
            <button type="button" onClick={handleAddItem} className={`custom-button ${darkMode ? "dark-mode-content" : ""}`}>
              +
            </button>
          </div>
        </div>
      )}
      
      <div className="d-flex justify-content-end">
        <button type="button" className={`btn ${darkMode ? "dark-mode-content" : ""}`}>
          Due
        </button>
        <button type="button" className={`btn ${darkMode ? "dark-mode-content" : ""}`}>
          Reminder
        </button>
        <Dropdown>
          <Dropdown.Toggle variant={`btn ${darkMode ? "dark-mode-content" : ""}`} id="dropdown-basic">
            Priority
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handlePriorityChange("High")}>High</Dropdown.Item>
            <Dropdown.Item onClick={() => handlePriorityChange("Medium")}>Medium</Dropdown.Item>
            <Dropdown.Item onClick={() => handlePriorityChange("Low")}>Low</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <button type="button" className={`btn ${darkMode ? "dark-mode-content" : ""}`}>
          <BsFillTrashFill />
        </button>
      </div>
    </div>
  );
};

export default Card;
