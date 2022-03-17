import React from 'react';
import '../styles/signup.css'

function Create(props) {
    return (
        <div>
            <div>
             <div className='signupframe'>
            
            <div className="signupsubframe">
               
            <div className="signupcard">
                
                <input type="text" placeholder='Tittle'/>
                <input type="file" placeholder='upload image'/>
                <button className='signupbtn'>

                    Post

                </button>
            </div>
            </div>
            </div>
           
           
            
        </div>
        </div>
    );
}

export default Create;