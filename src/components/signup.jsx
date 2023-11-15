import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import imageArt from "./img/imageart.png";
import Logo from "./img/Logo.png";
import "./signup.css";
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
  const buttonContainerStyle = {
    display: "flex",
    flexDirection: "row",
  };
  const buttonStyle = {
    background: "transparency",
    color: "#FFF",
    marginLeft: "10px",
    fontWeight: "400",
    fontSize: "18px"
  };
  return (
    <div className="cardStyle">
      <div className="navbarStyle">
        <div>
          <img src={Logo} className="logoStyle" alt="Logo" />
        </div>
        <div style={buttonContainerStyle}>
          <Link
            to="/register"
            className="btn btn-outline rounded-10"
            style={buttonStyle}
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="btn btn-size-10 rounded-10"
            style={buttonStyle}
          >
            Login
          </Link>
        </div>
      </div>
      <div className="blurredCardStyle rounded-4">
          <div>
            <img src={imageArt} alt="" className="art"/>
          </div>
          <div className="cardNew">
            <h2 className="mb-2 d-flex justify-content-center align-items-center" style={{color:"#DCDADB"}}>
              Create an account
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <div className="mb-1">
                  <label htmlFor="name" style={{color:"#DCDADB", fontWeight:"500"}}>
                    Name
                  </label>
                </div>
                <input
                  type="text"
                  //placeholder="Enter Name"
                  autoComplete="off"
                  name="name"
                  className="inputStyle form-control rounded-3" required
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <div className="mb-1">
                  <label htmlFor="email" style={{color:"#DCDADB", fontWeight:"550"}}>
                    E-Mail
                  </label>
                </div>
                <input
                  type="email"
                  //placeholder="Enter E-mail"
                  autoComplete="off"
                  name="email"
                  className="inputStyle form-control rounded-3" required
                  onChange={(e) => setEmail(e.target.value)}
                  
                />
              </div>
              <div className="mb-3">
                <div className="mb-1">
                  <label htmlFor="password" style={{color:"#DCDADB", fontWeight:"550"}}>
                    Password
                  </label>
                </div>
                <input
                  type="password"
                  //placeholder="Enter Password"
                  name="password"
                  className="inputStyle form-control rounded-3" required
                  onChange={(e) => setPassword(e.target.value)}
                  
                />
              </div>
              <div className="mb-3">
                <div className="mb-1">
                  <label htmlFor="confirmp" style={{color:"#DCDADB", fontWeight:"550"}}>
                    Confirm Password
                  </label>
                </div> 
                <input
                  type="password"
                  //placeholder="Confirm Password"
                  name="confirmp"
                  className="inputStyle form-control rounded-3" required
                  onChange={(e) => setConfPass(e.target.value)}
                  
                />
              </div>
              <div className="mb-3">
                  {error && <p className="text-danger fw-bold d-flex justify-content-center">{error}</p>}
                  {successMessage && (
                  <p className="text-success fw-bold d-flex justify-content-center">{successMessage}</p>
                  )}
                <div className="d-flex justify-content-center">
                  <button type="submit" className="btn rounded-pill" style={{ width: "65%", backgroundColor: "#67BBD3", color:"#FFF"}}>
                    Register
                  </button>
                </div>
              </div>
            </form>
            <p className="d-flex justify-content-center align-items-center mt-3" style={{color:"#DCDADB"}}>
            Already have an account?&nbsp;
            <Link to="/login" style={{color: "#67BBD3"}}>Login</Link>
            </p>
          </div>
        </div>
      </div>
  );
}

export default Signup;
