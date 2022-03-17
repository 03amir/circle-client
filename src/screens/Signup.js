import React from 'react';
import '../styles/signup.css';

function Signup(props) {
    return (
        <div className='signupframe'>
            
            <div className="signupsubframe">
                <div className="logo">
                    <h2>Logo</h2>
                </div>
            <div className="signupcard">
                <input type="text" placeholder='Name'/>
                <input type="email" placeholder='Email'/>
                <input type="number" placeholder='Password'/>
                <button className='signupbtn'>

                    Sign Up

                </button>
            </div>
            </div>
           
           
        </div>
    );
}

export default Signup;