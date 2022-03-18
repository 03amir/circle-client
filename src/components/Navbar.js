import React,{useContext} from "react";
import "../styles/navbar.css";
import { Link } from "react-router-dom";
import Logo from './Logo.png'
import { userContext } from '../App';


function Navbar(props) {

  const { state, dispatch}=useContext(userContext);
  const renderList =()=>{
    if(state){
      return[
        <Link to={"/profile"}>
        <div className="circle">profile</div>
      </Link>,

      <Link to={"/create"}>
        <div className="circle">Create</div>
      </Link>,
       <button>Log Out</button>
  
      ]
    }
    else{
     return [
          

         

      <Link to={"/login"}>
        <div className="circle">Login</div>
      </Link>,
      <Link to={"/signup"}>
        <div className="circle">Sign up</div>
      </Link>
    ]

    }
  
  }




  return (
    <div className="mainframe">
      <div className="frame">
      <Link to={state?"/":"login"}>
          <img src={Logo} alt="logo" className="logo" />
        </Link>
 {
   renderList()
 }
        

       
      </div>
    </div>
  );
}

export default Navbar;
