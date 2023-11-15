import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import imageArt from "./img/imageart.png";
import Logo from "./img/Logo.png";
import { Link } from "react-router-dom";
import "./login.css";



function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    //in axios.post the link should be there of mongodb
    axios
      .post("https://to-do-list-backend-kappa.vercel.app/login", { email, password })
      .then((result) => {
        console.log(result);
        if (result.data.message === "Success") {
          console.log("Logined Sucessfully");
          navigate("/home"); //navigate to home page}
        }
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          setError(err.response.data.error); // Set the error message from the server response
        } else {
          setError("Login failed. Please try again.");
        }
        console.log(err);
      });
  };
  const cardNew = {
    width: "75%",
    paddingTop: "7%"
  };
  
  const buttonStyle = {
    background: "transparency",
    color: "#FFF",
    marginLeft: "10px",
    fontWeight: "400",
    fontSize: "18px", 
    marginTop: "5"
  };
  return (
    <div className="cardStyle">
      <div className="navbarStyle">
        <div>
          <img src={Logo} className="logoStyle" alt="Logo" />
        </div>
        <div className="buttonContainerStyle">
          <Link
            to="/register"
            className="btn rounded-10"
            style={buttonStyle}
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="btn rounded-10"
            style={buttonStyle}
          >
            Login
          </Link>
        </div>
      </div>
      <div className="blurredCardStyle mx-auto p-3 rounded-4 px-4">
        <div>
          <img src={imageArt} alt="" className="art"/>
        </div>
        <div style={cardNew}>
          <h2 className="d-flex justify-content-center align-items-center" style={{color: "#DCDADB"}}>
            Login
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <div className="mb-1" style={{color: "#DCDADB"}}>
                <label className="formLabel"htmlFor="email">
                  <strong>E-mail</strong>
                </label>
              </div>
              <div>
                <input
                  type="email"
                  //placeholder="Enter E-mail"
                  autoComplete="off"
                  name="email"
                  className="inputStyle form-control rounded-3" required
                  onChange={(e) => setEmail(e.target.value)}
                  
                />
              </div>
            </div>
            <div className="mb-3">
              <div className="mb-1" style={{color: "#DCDADB"}}>
                <label className="formLabel" htmlFor="email">
                  <strong>Password</strong>
                </label>
              </div>
              <input
                type="password"
                //placeholder="Enter Password"
                name="password"
                className="inputStyle form-control rounded-3"
                onChange={(e) => setPassword(e.target.value)}
                
              />
            </div>
            {error && <p className="text-danger">{error}</p>}
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn w-50 rounded-pill" style={{ backgroundColor: "#67BBD3", color: "#FFF", marginTop: "5%" }}>
                Login
              </button>
            </div>
          </form>
          </div>
      </div>
    </div>
  );
}

export default Login;
