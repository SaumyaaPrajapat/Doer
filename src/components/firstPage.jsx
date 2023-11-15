import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
const FirstPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      {/*Navbar starts*/}
      <nav
        className="navbar navbar-expand-lg navbar-light bg-light"
        style={{ top: 0, height: "60px" }}
      >
        <div className="container">
          <Link to="/" className="navbar-brand">
            Doer
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleNavbar}
            aria-controls="navbarNav"
            aria-expanded={isOpen}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className={`collapse navbar-collapse ${
              isOpen ? "show" : "flex-column"
            }`}
            id="navbarNav"
          >
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link
                  to="/register"
                  className="nav-link btn btn-outline-primary border w-100 rounded-10 me-2"
                >
                  Sign Up
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/login"
                  className="nav-link btn btn-outline-primary border w-100 rounded-10"
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/*Navbar ends*/}

      {/*Content starts*/}
      <div
        className="container"
        style={{ marginTop: "50px", paddingBottom: "70px" }}
      >
        <div className="row">
          <div className="col-md-6 offset-md-3 text-center">
            <h1>Doer</h1>
          </div>
          <div className="col-md-6 ms-auto " style={{ maxWidth: "50%" }}>
            <p style={{ fontSize: "18px", lineHeight: "1.6", color: "#555" }}>
              Doer is a to-do list website that helps you get things done. It's
              simple, intuitive, and powerful. With Doer, you can create tasks
              and subtasks, set due dates and priorities, add notes and tags,
              track your progress.
              <br />
              <br />
              Doer is the perfect tool for anyone who wants to be more
              productive and organized. It's great for individuals, students,
              professionals, and teams.
              <br />
              <br />
              Doer can help you in many ways. It can help you keep track of all
              your tasks and deadlines in one place, so you're never
              overwhelmed. It can help you prioritize your tasks and focus on
              the most important things, so you're using your time wisely.
              <br />
              <br />
              If you're looking for a to-do list website that can help you get
              things done, Doer is the perfect solution for you. Sign up today
              and start getting more done!
            </p>
          </div>
        </div>
      </div>

      {/*Content ends*/}

      {/*Footer starts*/}
      <footer
        style={{
          position: "fixed",
          left: "0",
          bottom: "0",
          width: "100%",
          height: "10%",
          backgroundColor: "#f8f9fa",
          textAlign: "center",
          padding: "10px 25px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <p>&copy; 2023 Doer. All rights reserved</p>
        </div>
        <div>
          <p>
            <a href="#terms">Terms and Conditions</a>
          </p>
        </div>
      </footer>
      {/*Footer ends*/}
    </div>
  );
};

export default FirstPage;
