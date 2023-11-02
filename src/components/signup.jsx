import React from "react";
import { useState } from "react";
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

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded px-4">
        <h2 className="d-flex justify-content-center align-items-center">
          Create your account!
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Name</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              autoComplete="off"
              name="name"
              className="form-control rounded-0"
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              className="form-control rounded-0"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              className="form-control rounded-0"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Confirm Password</strong>
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              name="password"
              className="form-control rounded-0"
              required
              onChange={(e) => setConfPass(e.target.value)}
            />
          </div>

          {error && <p className="text-danger">{error}</p>}
          {successMessage && (
            <p className="text-success fw-bold">{successMessage}</p>
          )}
          <button type="submit" className="btn btn-primary w-100 rounded-10">
            Register
          </button>
        </form>
        <p className="d-flex justify-content-center align-items-center ">
          Already have an account?
        </p>
        <Link
          to="/login"
          className="btn btn-outline-primary border w-100 rounded-10 text-decoration-none"
        >
          Login
        </Link>
      </div>
    </div>
  );
}
export default Signup;
