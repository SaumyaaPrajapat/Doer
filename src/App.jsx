import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Signup from "./components/signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
