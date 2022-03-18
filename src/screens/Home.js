import React,{useState,useEffect} from 'react';
import '../styles/home.css';
import  Axios  from 'axios';

function Home(props) {
    useEffect(() => {
        getAllPost()
    }, [])
    

  async function getAllPost(){
      const data = await Axios.get("http://localhost:8000/allposts",{
          headers:{
              Authorization:"Bearer "+localStorage.getItem("jwtcircle")
          }
      })

      const res = await data.json();
      console.log(res)



  }






    return (
        <div>
    <div className="homeframe">
        <div className="postframe">
            <h2>Amirul sekh</h2>
            <h3>THE mazing travel vlog</h3>
            <div className="postimage">
            <img src="https://az617363.vo.msecnd.net/imgmodels/styles/fashion_speaker/imgmodelsprod/speakers/fields/field_speaker_image/gigi_2.jpg" alt="" />

            </div>
            <div className="like">
                <h1>like</h1>
                <h1>Dis like</h1>

                <input type="text"  placeholder='say something'/>
                <button>Comment</button>


            </div>
            <div className="comment">
          <div className="singlecomment">
          <h3>
   nice
</h3>

<button>
    delete
</button>
          </div>
          
          <div className="singlecomment">
          <h3>
   nice
</h3>

<button>
    delete
</button>
          </div>
          

          <div className="singlecomment">
          <h3>
   nice
</h3>

<button>
    delete
</button>
          </div>
          
         <div className="showmore">
             <h2>
                 show more
             </h2>
         </div>


            </div>
        </div>
    </div>
        </div>
    );
}

export default Home;