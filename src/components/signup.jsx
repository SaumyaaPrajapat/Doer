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
      .post("http://localhost:4001/register", { name, email, password })
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
  const [isHoveredSignUp, setIsHoveredSignUp] = useState(false);
  const [isHoveredLogin, setIsHoveredLogin] = useState(false);
  
  const buttonStyle = {
    marginRight: "10px",
    color: "#fff",
    border: "2px solid transparent",
    transition: "border 0.3s",
    fontWeight: "500",
    fontSize: "1rem",
  };
  const buttonHoverStyle = {
    border: "2px solid #fff",
  };
  return (
    <div className="cardStyle">
      <nav className="navbar navbar-expand-lg navbar-light" style={{ top: 0 }}>
        <div className="BAR">
          <Link to="/" className="navbar-brand">
            <img src={Logo} style={{ height: "150%", marginLeft: "15%" }} alt="Logo" />
          </Link>
          <div className="d-flex" style={{ marginTop: "1rem" }}>
            <ul className="navbar-nav" style={{ display: "flex", flexDirection: "row"}}>
              <li className="nav">
                <Link
                  to="/register"
                  className="nav-link btn btn-outline rounded-10"
                  style={{
                    ...buttonStyle,
                    ...(isHoveredSignUp ? buttonHoverStyle : {}),
                  }}
                  onMouseEnter={() => setIsHoveredSignUp(true)}
                  onMouseLeave={() => setIsHoveredSignUp(false)}
                >
                  Get Started
                </Link>
              </li>
              <li className="nav">
                <Link
                  to="/login"
                  className="nav-link btn btn-size-10 rounded-10"
                  style={{
                    ...buttonStyle,
                    ...(isHoveredLogin ? buttonHoverStyle : {}),
                  }}
                  onMouseEnter={() => setIsHoveredLogin(true)}
                  onMouseLeave={() => setIsHoveredLogin(false)}
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
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
