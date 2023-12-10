import React, { useEffect } from "react";
import { useDispatch } from "react-redux/es/exports";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { authActions } from "./store";
import { DarkModeProvider } from "./components/navbar/DarkModeContext";
import "bootstrap/dist/css/bootstrap.min.css";
import Signup from "./components/signup/signup";
import Login from "./components/login/login";
import FirstPage from "./components/firstpage/firstPage";
import Home from "./components/home/home";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Assuming you want to dispatch the login action only if there is a stored ID
    const id = sessionStorage.getItem("id");
    if (id) {
      dispatch(authActions.login());
    }
  }, [dispatch]);

  return (
    <DarkModeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<FirstPage />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </DarkModeProvider>
  );
}

export default App;
