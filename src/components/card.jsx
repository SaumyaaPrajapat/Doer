import React, {useState, useEffect} from "react";
import "./card.css";
import Update from "./update.jsx";
import "./update.css";
import axios from "axios";
import DateDisplay from './DateDisplay';


const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalID = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalID);
  }, []);

  const hoursStyle = {
    transform: ` rotate(${
      (time.getHours() % 12) * 30 + time.getMinutes() / 2
    }deg)`,
  };

  const minutesStyle = {
    transform: ` rotate(${time.getMinutes() * 6}deg)`,
  };

  const secondsStyle = {
    transform: ` rotate(${time.getSeconds() * 6}deg)`,
  };
  return (
    <div className="clock1">
      <div className="hand hours" style={hoursStyle}></div>
      <div className="hand minutes" style={minutesStyle}></div>
      <div className="hand seconds" style={secondsStyle}></div>
      <div className="point"></div>
      <div className="marker">
        <span className="marker__1"></span>
        <span className="marker__2"></span>
        <span className="marker__3"></span>
        <span className="marker__4"></span>
      </div>
    </div>
  );
};

let id = sessionStorage.getItem("id");
const Card = () => {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const show = () => {
    document.getElementById("textarea").style.display = "block";
  };

  const handleUpdate = async (taskId, updatedTaskName, updatedDescription) => {
    try {
      const response = await axios.put(
        `https://to-do-list-backend-kappa.vercel.app/updateTask/${taskId}`,
        {
          title: updatedTaskName,
          description: updatedDescription,
        }
      );

      if (response.data.updatedList) {
        const updatedTasks = tasks.map((task) =>
          task.id === taskId
            ? {
                ...task,
                taskName: response.data.updatedList.title,
                description: response.data.updatedList.description,
              }
            : task
        );

        setTasks(updatedTasks);
        handleCloseUpdateModal(); // Close the modal after updating
      } else {
        // Handle case where the server did not return an updated list
        console.error("Error updating task. Please try again.");
      }
    } catch (error) {
      // Handle any errors that occur during the update request
      console.error("Error updating task:", error);
    }
  };

  const handleAddTask = async () => {
    if (taskName.trim() !== "") {
      try {
        await axios.post("https://to-do-list-backend-kappa.vercel.app/addTask", {
          title: taskName,
          description: description,
          id: id,
        });

        const newTask = { id: tasks.length + 1, taskName, description };
        setTasks([...tasks, newTask]);
        setTaskName("");
        setDescription("");

        // Display a notification
        alert("Task added successfully");
      } catch (error) {
        console.error("Error adding task:", error);
        // Handle error and display an error notification
        alert("Error adding task. Please try again.");
      }
    }
  };

  const handleDeleteTask = async (taskid) => {
    const confirmDelete = window.confirm(
      "Well done, this task will now be deleted"
    );

    if (confirmDelete) {
      try {
        const response = await axios
          .delete(`https://to-do-list-backend-kappa.vercel.app/deleteTask/${taskid}`, {
            data: { id: id },
          })
          .then((response) => {
            console.log(response.data);
            // Optionally, you can display a success message
            alert("Task deleted successfully");
          });

        // console.log(response.data);
        // // Optionally, you can display a success message
        // alert("Task deleted successfully");
      } catch (error) {
        console.error("Error deleting task:", error);

        alert("Error deleting task. Please try again.");
      }
    }
  };

  const handleOpenUpdateModal = (taskId) => {
    setSelectedTaskId(taskId);
    setIsUpdateModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setSelectedTaskId(null);
    setIsUpdateModalOpen(false);
  };
  useEffect(() => {
    console.log("ID:", id); // Log the id
    const fetch = async () => {
      await axios
        .get(`https://to-do-list-backend-kappa.vercel.app/getTasks/${id}`)
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
    <div className="cad">
      <div className="card-menu">
        <div className="container1">
              <input
                type="text"
                placeholder="Enter Task"
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
                <button onClick={handleAddTask}>+</button>
              </div>
        </div>
      </div>
      <div>
        <DateDisplay /> {/* Include DateDisplay component here */}
      </div>
      <div>
          <div className="design1">
            <Clock />
          </div>
      </div>

      <div className="task-cards">
        {tasks.map((task) => (
          <div className="task-card" key={task.id}>
            <p><h4 style={{fontWeight:"bold"}}>{task.taskName}</h4></p>
            <p>{task.description}</p>
            <div className="task-buttons">
                <button style={{backgroundColor:"#7DCE13"}} onClick={() => handleOpenUpdateModal(task.id)}>
                  Update
                </button>
              
              <button onClick={() => handleDeleteTask(task.id)}>Complete</button>
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
