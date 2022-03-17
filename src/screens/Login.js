import React from 'react';
import '../styles/signup.css'

function Login(props) {
    return (
        <div>
             <div className='signupframe'>
            
            <div className="signupsubframe">
                <div className="logo">
                    <h2>Logo</h2>
                </div>
            <div className="signupcard">
                
                <input type="email" placeholder='Email'/>
                <input type="number" placeholder='Password'/>
                <button className='signupbtn'>

                    Login

                </button>
            </div>
            </div>
            </div>
           
           
            
        </div>
    );
}

export default Login;