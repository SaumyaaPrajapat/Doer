import "bootstrap/dist/css/bootstrap.min.css";
import Signup from "./components/signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import FirstPage from "./components/firstPage";
import Home from "./components/home";
import { DarkModeProvider } from "./components/DarkModeContext";
import React,{useEffect} from "react";
import { useDispatch } from "react-redux/es/exports";
import { authActions } from "./store";
function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    const id = sessionStorage.getItem("id");
    dispatch(authActions.login());
    
  }, []);
  return (
    <DarkModeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/" element={<FirstPage />}></Route>
          <Route path="/home" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </DarkModeProvider>
  );
}

export default App;
