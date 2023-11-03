import React, { useState } from "react";
import backgroundImage from "./img/bgi.jpeg";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmp, setConfPass] = useState();
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    //in axios.post the link should be there of mongodb

    if (password !== confirmp) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    axios
      .post("https://to-do-list-backend-kappa.vercel.app/register", { name, email, password })
      .then((result) => {
        setSuccessMessage("Registered successfully. Login to Start!");
        console.log(result);
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          setError(err.response.data.error); // Set the error message from the server response
        } else {
          setError("Registration failed. Please try again.");
        }
        console.log(err);
      });
  };

  const cardStyle = {
    fontFamily: "Poppins",
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div style={cardStyle} className="bg-secondary text-white">
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="shadow-lg p-3 rounded-4 px-4" style={{ backgroundColor: "#313641" }}>
          <h2 className="mb-3 d-flex justify-content-center align-items-center">
            Create your account!
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <div className="mb-1">
                <label htmlFor="name" style={{color:"#ACAFB3"}}>
                  <strong>Username</strong>
                </label>
              </div>
              <input
                type="text"
                placeholder="Enter Name"
                autoComplete="off"
                name="name"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <div className="mb-1">
                <label htmlFor="email" style={{color:"#ACAFB3"}}>
                  <strong>E-mail</strong>
                </label>
              </div>
              <input
                type="email"
                placeholder="Enter E-mail"
                autoComplete="off"
                name="email"
                className="form-control rounded-3"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <div className="mb-1">
                <label htmlFor="password" style={{color:"#ACAFB3"}}>
                  <strong>Password</strong>
                </label>
              </div>
              <input
                type="password"
                placeholder="Enter Password"
                name="password"
                className="form-control rounded-3"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <div className="mb-1">
                <label htmlFor="confirmp" style={{color:"#ACAFB3"}}>
                  <strong>Confirm Password</strong>
                </label>
              </div> 
              <input
                type="password"
                placeholder="Confirm Password"
                name="confirmp"
                className="form-control rounded-3"
                onChange={(e) => setConfPass(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <div className="d-flex justify-content-center">
              {error && <p className="text-danger">{error}</p>}
              {successMessage && (
                <p className="text-success fw-bold">{successMessage}</p>
              )}
                <button type="submit" className="btn w-75 rounded-pill" style={{ backgroundColor: "#67BBD3" }}>
                  Register
                </button>
              </div>
            </div>
          </form>
          <p className="d-flex justify-content-center align-items-center mt-3" style={{color:"#ACAFB3"}}>
            Already have an account?&nbsp;
            <Link to="/login" style={{color: "#67BBD3"}}>Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
