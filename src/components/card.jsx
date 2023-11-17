import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import { useDarkMode } from "./DarkModeContext";
import { BsFillTrashFill } from "react-icons/bs";
import Dropdown from "react-bootstrap/Dropdown";
import { BsX } from "react-icons/bs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import addNotification from "react-push-notification";
import logo from "./img/Logo.png";
import "./card.css";

const Card = () => {
  const [contentVisible, setContentVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [listItems, setListItems] = useState([]);
  const [taskName, setTaskName] = useState("Task");
  const [isEditingTaskName, setIsEditingTaskName] = useState(false);
  const [isTaskNameClicked, setIsTaskNameClicked] = useState(false);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [priority, setPriority] = useState("Medium"); // Default priority
  const { darkMode } = useDarkMode();
  const [isTaskCompleted, setIsTaskCompleted] = useState(false);

  const handleTaskCompletion = () => {
    setIsTaskCompleted(!isTaskCompleted);
  };
  const [selectedDate, setSelectedDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(true);
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0 for comparison
  const handleDueDateClick = () => {
    setShowCalendar(!showCalendar);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowCalendar(true); // Set showCalendar to true after handling the date change
  };

  const [selectedTime, setSelectedTime] = useState(null);

  const handleTimeChange = (time) => {
    setSelectedTime(time);
    // Call clickTONotify when the time is changed
    clickTONotify();
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
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
    if (e.key === "Enter") {
      e.preventDefault();
      handleTaskNameChange(e);
    }
  };

  const toggleContent = () => {
    setContentVisible(!contentVisible);
  };

  const handleDeleteTask = (index) => {
    const updatedListItems = [...listItems];
    updatedListItems.splice(index, 1);
    setListItems(updatedListItems);

    const updatedCompletedTasks = completedTasks.filter(
      (taskIndex) => taskIndex !== index
    );
    setCompletedTasks(updatedCompletedTasks);
  };

  const handlePriorityChange = (newPriority) => {
    setPriority(newPriority);
  };

  const clickTONotify = () => {
    const currentTime = new Date();
    const timeToNotify = new Date(selectedTime);
    timeToNotify.setFullYear(
      currentTime.getFullYear(),
      currentTime.getMonth(),
      currentTime.getDate()
    );

    const timeDifference = timeToNotify - currentTime;

    if (timeDifference > 0) {
      setTimeout(() => {
        // Send a notification after the calculated time difference
        addNotification({
          title: "Doer",
          message: "It's time to complete your task!",
          duration: 4000,
          icon: logo,
          native: true,
          onClick: () =>
            (window.location = "https://to-do-list-xi-beige.vercel.app/"),
        });
      }, timeDifference);
    }
  };

  return (
    <div
      className={`cards  ${darkMode ? "dark-mode" : ""} `}
      style={{
        padding: "1rem",
        boxShadow: darkMode
          ? "5px 5px 12px #0b0b0c, -5px -5px 12px #2b2b30"
          : "13px 13px 33px #ababab, -13px -13px 33px #ffffff",
        borderRadius: "10px",
        marginTop: "2rem",
      }}
    >
      <div
        onClick={startEditingTaskName}
        className={`title ${isEditingTaskName ? "editable" : ""} ${
          darkMode ? "dark-mode-content" : ""
        }`}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              type="checkbox"
              style={{
                marginRight: "12px",
                width: "20px",
                height: "20px",
                backgroundColor: "transparent",
              }}
              onChange={handleTaskCompletion}
              checked={isTaskCompleted}
            />
            <div
              style={{
                textDecoration: isTaskCompleted ? "line-through" : "none",
                color: isTaskCompleted ? "#d3d3d3" : "inherit",
                transition: "color 0.3s ease, text-decoration 0.3s ease",
              }}
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
          </div>

          <div className="due-date">
            {/* Render due date only if a date has been selected */}
            {selectedDate && (
              <div onClick={handleDueDateClick}>
                Due date : {selectedDate.toLocaleDateString()}
              </div>
            )}
          </div>
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
                  textDecoration: completedTasks.includes(index)
                    ? "line-through"
                    : "none",
                  color: completedTasks.includes(index) ? "#d3d3d3" : "inherit",
                }}
              >
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
                <button
                  type="button"
                  onClick={() => handleDeleteTask(index)}
                  style={{
                    height: "30px",
                    marginLeft: "0px",
                    backgroundColor: "transparent",
                  }}
                >
                  <BsX />
                </button>
              </li>
            ))}
          </ul>
          <div className="custom-form">
            <textarea
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Add description to the Task"
              className={`custom-input ${contentVisible ? "enlarged" : ""}`}
              style={{
                width: "240px",
                textAlign: "left",
                border: "0px solid #ccc",
                backgroundColor: darkMode ? "#1b1b1e" : "white",
                color: darkMode ? "#ccc" : "#000",
                outline: "none",
                fontSize: "12px",
                borderRadius: "4px",
                boxShadow: darkMode
                  ? "inset 2px 3px 8px rgb(5, 5, 5)"
                  : "inset 2px 3px 8px #c2c2c2",
                minWidth: "100px",
                minHeight: "80px", // Adjust the height as needed
                marginBottom: "20px",
                resize: "none", // Disable textarea resizing
              }}
            />
          </div>
        </div>
      )}

      <div className="d-flex justify-content-end">
        {showCalendar && (
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            minDate={today} // Set minDate to today
            className="custom-datepicker" // Add a custom class
            calendarClassName="custom-calendar"
            customInput={
              <div className="due-button-container">
                <button
                  type="button"
                  className={`btn ${darkMode ? "dark-mode-content" : ""}`}
                >
                  Due
                </button>
              </div>
            }
            placeholderText="Select Due Date"
            onClose={() => setShowCalendar(false)}
          />
        )}
        <Dropdown>
          <Dropdown.Toggle
            variant={`btn ${darkMode ? "dark-mode-content" : ""}`}
            id="dropdown-basic"
          >
            Priority
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handlePriorityChange("High")}>
              High
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handlePriorityChange("Medium")}>
              Medium
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handlePriorityChange("Low")}>
              Low
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <DatePicker
          selected={selectedTime}
          onChange={handleTimeChange}
          showTimeSelect
          showTimeSelectOnly
          dateFormat="h:mm aa"
          timeIntervals={2}
          timeCaption="Time"
          customInput={
            <div className="due-button-container">
              <button
                type="button"
                onClick={clickTONotify}
                className={`btn ${darkMode ? "dark-mode-content" : ""}`}
              >
                Reminder
              </button>
            </div>
          }
          placeholderText="Select Reminder"
        />
        <button
          type="button"
          className={`btn ${darkMode ? "dark-mode-content" : ""}`}
        >
          <BsFillTrashFill />
        </button>
      </div>
    </div>
  );
};

export default Card;
