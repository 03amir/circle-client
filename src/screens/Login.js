import React, { useContext, useState } from "react";
import "../styles/signup.css";
import Logo from "../components/Logo.png";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { userContext } from "../App";

function Login() {
  
  const { state, dispatch } = useContext(userContext);

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log(process.env.REACT_APP_BASE_URL);

  function loginUser() {
    Axios.post(`${process.env.REACT_APP_BASE_URL}/login`, {
      password: password,
      email: email,
    })
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          localStorage.setItem("jwtcircle", res.data.token);
          localStorage.setItem("usercircle", JSON.stringify(res.data.user));
          dispatch({ type: "USER", payload: res.data.user }); //setting the state value to the user details
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <div className="signupframe">
        <div className="signupsubframe">
          <div className="logo">
            <img src={Logo} alt="" />
          </div>
          <div className="signupcard">
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
                loginUser();
              }}
              className="signupbtn"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
