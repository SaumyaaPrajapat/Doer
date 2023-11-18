import React, { useState } from "react";
import "./card.css";
import Update from "./update.jsx";
import "./update.css";

const Card = () => {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const show = () => {
    document.getElementById("textarea").style.display = "block";
  };

  const handleUpdate = (taskId, updatedTaskName, updatedDescription) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId
        ? { ...task, taskName: updatedTaskName, description: updatedDescription }
        : task
    );

    setTasks(updatedTasks);
    handleCloseUpdateModal(); // Close the modal after updating
  };

  const handleAddTask = () => {
    if (taskName.trim() !== "") {
      const newTask = { id: tasks.length + 1, taskName, description };
      setTasks([...tasks, newTask]);
      setTaskName("");
      setDescription("");
    }
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const handleOpenUpdateModal = (taskId) => {
    setSelectedTaskId(taskId);
    setIsUpdateModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setSelectedTaskId(null);
    setIsUpdateModalOpen(false);
  };

  return (
    <div className="cad">
      <div className="card-menu">
        <div className="container">
          <input
            type="text"
            placeholder="TaskName"
            className="inputs"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            onClick={show}
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

      <div className="task-cards">
        {tasks.map((task) => (
          <div className="task-card" key={task.id}>
            <p>{task.taskName}</p>
            <p>{task.description}</p>
            <div className="task-buttons">
              <button onClick={() => handleOpenUpdateModal(task.id)}>Update</button>
              <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* Conditionally render the Update component */}
      {isUpdateModalOpen && (
        <Update
          taskId={selectedTaskId}
          onClose={handleCloseUpdateModal}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default Card;
