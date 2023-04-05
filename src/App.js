import "./App.css";
import Home from "./screens/Home";
import Navbar from "./components/Navbar";
import Profile from "./screens/Profile";
import Create from "./screens/Create";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import React, { createContext, useReducer, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { initialState, reducer } from "./reducer/userReducer";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

export const userContext = createContext();

const Routing = () => {
  const { state, dispatch } = useContext(userContext);
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("usercircle"));
    if (user) {
      dispatch({ type: "USER", payload: user });
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/create" element={<Create />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <userContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Navbar />

        <Routing />
      </BrowserRouter>
    </userContext.Provider>
  );
}

export default App;
