import React,{useState,useEffect,useContext} from 'react';
import '../styles/profile.css'
import  Axios from 'axios';
import { userContext } from '../App';

function Profile(props) {
    const{ state, dispatch} = useContext(userContext);


  const [myposts,setMyposts]= useState([])
   useEffect(() => {
       getMy()
     
   }, [])

   function getMy(){
       Axios.get("http://localhost:8000/mypost",{
        headers:{
            Authorization:"Bearer "+localStorage.getItem("jwtcircle")
        }
       }).then(res=>{
           console.log(res.data.mypost)
           setMyposts(res.data.mypost)
       })
       
   }
   









    return (
        <div className='profileframe'>
           <div className="detailscard">
               <div className="imgdiv">
               <img src="https://az617363.vo.msecnd.net/imgmodels/styles/fashion_speaker/imgmodelsprod/speakers/fields/field_speaker_image/gigi_2.jpg" alt="" />
               </div>
<div className="details">
    <div className="name">
        <h2>{state?state.name:"Loading"}</h2>
    </div>
    <div className="populariti">
        <div className="posts">
            <h2>
                posts
            </h2>
            <h3>10</h3>
        </div>

        <div className="posts">
            <h2>
               followers
            </h2>
            <h3>1123456789</h3>
        </div>

        <div className="posts">
            <h2>
               followings
            </h2>
            <h3>1034</h3>
        </div>
    </div>
</div>

           </div>

   <div className="prevframe">

   
           <div className="prev">
  {
      myposts.map((post)=>{
          return(

            <div className="imgsdiv">
                 <img src={post.photo}alt={post.title} />


            </div>
         
               
          )
      })
      
  }
  </div>
  </div>
  







        </div>
    );
}

export default Profile;