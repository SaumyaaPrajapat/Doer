import React, { useState } from "react";
import backgroundImage from "./img/bgi.jpeg";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

  const cardStyle = {
    fontFamily: "Poppins",
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh", // Set a minimum height for the card
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  return (
    <div style={cardStyle} className="bg-secondary">
      <div className="mx-auto shadow-lg p-3 rounded-4 px-4" style={{ backgroundColor: "#313641", width: "40%", maxWidth: "370px"}}>
        <h2 className="d-flex justify-content-center align-items-center text-white">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <div className="mb-1 text-white">
              <label htmlFor="email">
                <strong>E-mail</strong>
              </label>
            </div>
            <div>
              <input
                type="email"
                placeholder="Enter E-mail"
                autoComplete="off"
                name="email"
                className="form-control rounded-3"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-3">
            <div className="mb-1 text-white">
              <label htmlFor="email">
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
          {error && <p className="text-danger">{error}</p>
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn w-50 rounded-pill" style={{ backgroundColor: "#67BBD3" }}>
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
