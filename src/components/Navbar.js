import React from "react";
import "../styles/navbar.css";
import { Link } from "react-router-dom";

function Navbar(props) {
  return (
    <div className="mainframe">
      <div className="frame">
        <Link to={"/"}>
          <h1>logo</h1>
        </Link>

        <div className="mid">
          

          <Link to={"/profile"}>
            <div className="circle">profile</div>
          </Link>

          <Link to={"/create"}>
            <div className="circle">Create</div>
          </Link>

          <Link to={"/login"}>
            <div className="circle">Login</div>
          </Link>
          <Link to={"/signup"}>
            <div className="circle">Sign up</div>
          </Link>
        </div>

        <button>Log Out</button>
      </div>
    </div>
  );
}

export default Navbar;
