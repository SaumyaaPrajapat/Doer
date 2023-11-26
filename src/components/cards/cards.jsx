import React, { useState, useEffect } from "react";
import "./cards.css";
import Update from "./update.jsx";
import "./update.css";
import axios from "axios";
import white from "../img/white.png";
import black from "../img/black.png";
import { MdDeleteForever } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { GrCompliance } from "react-icons/gr";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

let id = sessionStorage.getItem("id");
const Card = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [isAnimatedVisible, setAnimatedVisible] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null); // Add editingIndex state

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

  //add task
  const handleAddTask = async () => {
    if (taskName.trim() !== "") {
      try {
        await axios.post("https://doer-1wlq-cleveranu.vercel.app/addTask", {
          title: taskName,
          description: description,
          id: id,
        });

        const newTask = { id: tasks.length + 1, taskName, description };
        setTasks([...tasks, newTask]);
        setTaskName("");
        setDescription("");

        // Display a notification
        toast("Task added successfully");
      } catch (error) {
        console.error("Error adding task:", error);
        // Handle error and display an error notification
        toast.error("Error adding task. Please try again.");
      }
      hidePopup();
    }
  };

  //delete task
  const handleDeleteTask = async (taskid) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (confirmDelete) {
      try {
        const response = await axios.delete(
          `https://doer-1wlq-cleveranu.vercel.app/deleteTask/${taskid}`,
          {
            data: { id: id },
          }
        );
        console.log(response.data);
        toast.success("Task deleted successfully");
      } catch (error) {
        console.error("Error deleting task:", error);
        toast.error("Error deleting task. Please try again.");
      }
    }
  };

  useEffect(() => {
    console.log("ID:", id); // Log the id
    const fetch = async () => {
      await axios
        .get(`https://doer-1wlq-cleveranu.vercel.app/getTasks/${id}`)
        .then((response) => {
          setTasks(
            response.data.lists.map((item) => ({
              id: item._id,
              taskName: item.title,
              description: item.description,
            }))
          );
        });
    };
    fetch();
  }, [handleAddTask, id]);

  return (
    <div>
      <ToastContainer />
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

      <div className="task-cards-container">
        <div className="task-cards">
          {tasks.map((task, index) => (
            <div className="task-card" key={index}>
              <h3>{task.taskName}</h3>
              <p>{task.description}</p>
              <div className="button-container">
                <button title="Update" onClick={() => showPopup(index)}>
                  <FaRegEdit />
                </button>
                <button title="Complete">
                  <GrCompliance />
                </button>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  title="Delete"
                >
                  <MdDeleteForever />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
