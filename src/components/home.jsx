import React from "react";
import "./home.css";

function Home() {
  return (
    <div className="main">
      <div className="top-navbar">
        <div className="logo">
          <img src="/images/Doer.png" alt="Logo" />
        </div>
        <div className="navbar-content">
          <h1>Welcome Back, Anukanksha!</h1>
          <div className="button-section">
            <button>All tasks</button>
            <button>Completed</button>
            <button>Pending</button>
            <button>In Progress</button>
          </div>
        </div>
      </div>

      <div className="side-navbar">
        <div className="profile">
          <button className="profile-button">
            <img src="/path-to-profile-image.jpg" alt="Profile" />
            <h3>Anukanksha</h3>
          </button>
        </div>
        <div className="options">
          <a href="#">Dashboard</a>
          <a href="#">Calendar</a>
          <a href="#">Settings</a>
          <a href="#">85%</a>
          <a href="#">Filter</a>
          <a href="#">Notifications</a>
        </div>
        <div className="navbar-end">
          <a href="#">Logout</a>
        </div>
      </div>
      <div className="content">
    <div className="cards">
      <h1>dummy</h1>
      <p>
        Life is a canvas, and you are the artist. With each day, you have the opportunity to paint a beautiful masterpiece filled with colors of kindness, strokes of love, and the bright light of hope. Embrace each moment as a brushstroke, and create a work of art that reflects the beauty of your heart.
      </p>
      <div className="button-card">
        <button>Due Date</button>
        <button>Priority</button>
      </div>
    </div>
    <div className="cards">
      <h1>dummy</h1>
      <p>
        Life is a canvas, and you are the artist. With each day, you have the opportunity to paint a beautiful masterpiece filled with colors of kindness, strokes of love, and the bright light of hope. Embrace each moment as a brushstroke, and create a work of art that reflects the beauty of your heart.
      </p>
      <div className="button-card">
        <button>Due Date</button>
        <button>Priority</button>
      </div>
    </div>
    <div className="cards">
      <h1>dummy</h1>
      <p>
        Life is a canvas, and you are the artist. With each day, you have the opportunity to paint a beautiful masterpiece filled with colors of kindness, strokes of love, and the bright light of hope. Embrace each moment as a brushstroke, and create a work of art that reflects the beauty of your heart.
      </p>
      <div className="button-card">
        <button>Due Date</button>
        <button>Priority</button>
      </div>
    </div>
  </div>
    </div>
  );
}

export default Home;
