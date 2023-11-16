import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { BsFillAlarmFill } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";
import { BiCommentEdit } from "react-icons/bi";
import { CgCalendarDates } from "react-icons/cg";
import { useDarkMode } from "./DarkModeContext";
import "./card.css";

const Card = () => {
  const [contentVisible, setContentVisible] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [listItems, setListItems] = useState([]);
  const [taskName, setTaskName] = useState("Title");
  const [isEditingTaskName, setIsEditingTaskName] = useState(false);
  const [isTaskNameClicked, setIsTaskNameClicked] = useState(false);
  const [completedTasks, setCompletedTasks] = useState([]);
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

      // Set a timeout to revert the title after 40 seconds
      setTimeout(() => {
        document.title = originalTitle;
      }, 30000);
    }
  };

  const handleTaskNameChange = (e) => {
    setTaskName(e.currentTarget.textContent);
    setIsEditingTaskName(false);
  };

  const toggleContent = () => {
    setContentVisible(!contentVisible);
  };

  const handleTaskCompletion = (index) => {
    const updatedCompletedTasks = [...completedTasks];

    if (updatedCompletedTasks.includes(index)) {
      // If task is already marked as completed, remove it from the completedTasks array
      updatedCompletedTasks.splice(updatedCompletedTasks.indexOf(index), 1);
    } else {
      // Mark the task as completed
      updatedCompletedTasks.push(index);
    }

    setCompletedTasks(updatedCompletedTasks);
  };

  return (
    <div
      className={` ${darkMode ? "dark-mode" : ""} `}
      style={{
        padding: "1rem",
        boxShadow: darkMode
          ? "5px 5px 12px #0b0b0c, -5px -5px 12px #2b2b30"
          : "13px 13px 33px #ababab, -13px -13px 33px #ffffff",
        borderRadius: "25px",
        marginLeft: "7rem",
        marginTop: "2rem",
      }}
    >
      <div className={`title ${darkMode ? "dark-mode-content" : ""}`}>
        <div
          onClick={startEditingTaskName}
          className={isEditingTaskName ? "editable" : ""}
          style={{ color: darkMode ? "#fff" : "#000" }}
        >
          {isEditingTaskName ? (
            <div
              contentEditable
              onBlur={handleTaskNameChange}
              dangerouslySetInnerHTML={{ __html: taskName }}
            />
          ) : (
            <div>{taskName}</div>
          )}
        </div>
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
                  textDecoration: completedTasks.includes(index) ? "line-through" : "none", color: completedTasks.includes(index) ? "#d3d3d3" : "inherit", // Light grey color when strikethrough
                }}
              >
                <input
                  type="checkbox"
                  style={{ marginRight: "12px", width: "20px", height: "20px",backgroundColor:"transparent", }}
                  onChange={() => handleTaskCompletion(index)}
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="custom-form">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
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
              }}
            />
            <button onClick={handleAddItem} className="custom-button">
              +
            </button>
          </div>
        </div>
      )}
      <div className="buttons">
        <button className="today-button">
          <SlCalender /> Due
        </button>
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Priority
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li>
              <a className="dropdown-item" href="#">
                High
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Medium
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Low
              </a>
            </li>
          </ul>
        </div>
        <button className="remainder-button">
          <BsFillAlarmFill /> Reminder
        </button>
      </div>

      <div className="bottom">
        <BiEditAlt title="Edit" />
        <BiCommentEdit title="Comment on tasks" />
        <CgCalendarDates title="Set Due date" />
      </div>
    </div>
  );
};

export default Card;