import React, { useState } from "react";
import backgroundImage from "./img/bgi.jpeg";
import { Link } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmp, setConfPass] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // In axios.post, you should provide the correct MongoDB API endpoint
    axios
      .post("", { name, email, password, confirmp })
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
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
