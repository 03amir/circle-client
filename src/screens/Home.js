import React, { useState, useEffect,useContext } from "react";
import "../styles/home.css";
import Axios from "axios";
import {userContext} from '../App'

function Home(props) {
  const [posts, setPosts] = useState([]);
  const [comment, setComment] = useState("");
  const {state, dispatch}= useContext(userContext)

  useEffect(() => {
    getAllPost();
  }, []);

  function getAllPost() {
    Axios.get("http://localhost:8000/allposts", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwtcircle"),
      },
    }).then((data) => {
      console.log(data.data.posts);
      setPosts(data.data.posts);
    });
  }

  function pushComment(text,id) {
    Axios.put(
      "http://localhost:8000/comment",
      {
        text:text,
        postId:id,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwtcircle"),
        },
      }
    ).then((datas) => {
      console.log(datas.data.result);
      //setPosts(data.data.posts);
      const newData = posts.map((item)=>{
        if(item._id==datas.data.result._id){
          return datas.data.result
        }
        else{
         return item
        }
      })

      setPosts(newData)
      
    
  //console.log(newData)

    });
    
  }

  function getLikes(id) {
    Axios.put(
      "http://localhost:8000/like",
      {
        postId: id,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwtcircle"),
        },
      }
    ).then((datas) => {
      console.log(datas.data);
      //setPosts(data.data.posts);
      
      const newData = posts.map((item)=>{
        if(item._id==datas.data.result._id){
          return datas.data.result
        }
        else{
         return item
        }
      })

  setPosts(newData)
  //console.log(newData)

    });
  }

  function getDislikes(id) {
    Axios.put(
      "http://localhost:8000/dislike",
      {
        postId: id,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwtcircle"),
        },
      }
    ).then((datas) => {
      console.log(datas.data);
      //setPosts(data.data.posts);
      
      const newData = posts.map((item)=>{
        if(item._id==datas.data.result._id){
          return datas.data.result
        }
        else{
         return item
        }
      })

  setPosts(newData)
  //console.log(newData)
    });
  }

  return (
    <div>
      <div className="homeframe">
        {posts.map((post) => {
          return (
            <div className="postframe">
              <h2>{post.postedBy.name}</h2>
              <h3>{post.title}</h3>
              <div className="postimage">
                <img src={post.photo} alt="" />
              </div>
              <div className="like">
              {
                post.likes.includes(state._id)?(
                  <h1
                onClick={() => {
                  getDislikes(post._id);
                }}
              >
                Dis like
              </h1>

                ): 

<h1
onClick={() => {
  getLikes(post._id);
}}
>
like
</h1>
              }
              
               
               

                <h2> {post.likes.length} likes </h2>
                
                <input type="text" value={comment} onChange={(e)=>{
                  setComment(e.target.value)
                  console.log(e.target.value)
                }} placeholder="say something" />
              
                
                <button onClick={()=>{pushComment(comment,post._id)}}>Comment</button>
              </div>
              <div className="comment">
                {
                  post.comments.map((comment)=>{
                    return (
                      <h2>{comment.postedBy.name} <span>{comment.text}</span></h2>
                    )
                  })
                }
                


                

               
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
