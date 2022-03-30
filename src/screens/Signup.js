import React, { useState } from "react";
import "../styles/signup.css";
import Logo from "../components/Logo.png";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup(props) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function addUser() {
    Axios.post("https://circlesocial.herokuapp.com/signup", {
      name: name,
      password: password,
      email: email,
    }).then((res) => {
      console.log(res);
      if (res.status == 202) {
        navigate("/login");
      }
    });
  }

  return (
    <div className="signupframe">
      <div className="signupsubframe">
        <div className="logo">
          <img src={Logo} alt="image" />
        </div>
        <div className="signupcard">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button
            onClick={() => {
              addUser();
            }}
            className="signupbtn"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
