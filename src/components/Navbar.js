import React, { useContext } from "react";
import "../styles/navbar.css";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import Logo from "./Logo.png";
import { userContext } from "../App";
import { FaUser,FaFileUpload } from 'react-icons/fa';


function Navbar(props) {
  const navigate = useNavigate();

  const { state, dispatch } = useContext(userContext);
  const renderList = () => {
    if (state) {
      return [
        <div className="mid" >
        <div className="midcenter" >
        <NavLink to={"/profile"}>
        <div className="circle">
          <FaUser />
          </div>
        </NavLink>

        <NavLink to={"/create"}>
          <div className="circle">
          <FaFileUpload />
          </div>
         
        </NavLink>

        </div>
         
        <button className="logout"
          onClick={() => {
            localStorage.clear();
            dispatch({ type: "NONE" });
            navigate("/login");
          }}
        >
          Log Out
        </button>
      
        </div>
      ];
    } else {
      return [
        <div className="left">
        <NavLink to={"/login"} style={{ textDecoration: 'none' }} activeclassname='is-active'>
          <div className="singupNav">Login</div>
        </NavLink>
        <NavLink to={"/signup"} style={{ textDecoration: 'none' }} activeclassname='is-active'>
          <div className="singupNav">Sign up</div>
        </NavLink>
        </div>
      ];
    }
  };

  return (
    <div className="mainframe">
      <div className="frame">
        <NavLink to={state ? "/" : "login"}>
          <img src={Logo} alt="logo" className="logomain" />
        </NavLink>
        {renderList()}
      </div>
    </div>
  );
}

export default Navbar;
