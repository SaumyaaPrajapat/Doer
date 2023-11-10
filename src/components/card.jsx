import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; //Bootstrap's JavaScript components
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import { SlCalender } from "react-icons/sl"; // Assuming SlCalender is a valid icon component
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
  const { darkMode, toggleDarkMode } = useDarkMode();
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddItem = () => {
    if (inputValue) {
      setListItems([...listItems, inputValue]);
      setInputValue("");
    }
  };

  const toggleContent = () => {
    setContentVisible(!contentVisible);
  };

  return (
    <div
      className={` ${darkMode ? "dark-mode" : ""} `}
      style={{
        padding: "1rem",
        boxShadow: darkMode ? "0 0 5px white" : "0 0 5px black",
        borderRadius: "5px",
      }}
    >
      <div className={`title ${darkMode ? "dark-mode-content" : ""}`}>
        Task Name
        <div className="arrowIconStyles" onClick={toggleContent}>
          <MdKeyboardDoubleArrowDown />
        </div>
      </div>
      {contentVisible && (
        <div className={`content ${darkMode ? "dark-mode-content" : ""}`}>
          <ul>
            {listItems.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <div className="custom-form">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Add tasks to list"
              className={`custom-input ${contentVisible ? "enlarged" : ""}`}
            />
            <button onClick={handleAddItem} className="custom-button">
              Add
            </button>
          </div>
        </div>
      )}
      <div className="buttons">
        <button className="today-button">
          <SlCalender /> Today
        </button>
        <div class="dropdown">
          <button
            class="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Priority
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li>
              <a class="dropdown-item" href="#">
                High
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                Medium
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                Low
              </a>
            </li>
          </ul>
        </div>
        <button className="remainder-button">
          <BsFillAlarmFill /> Reminder
        </button>
      </div>
      <div className="end">
        <button>Cancel</button>
        <button>Add Task</button>
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
