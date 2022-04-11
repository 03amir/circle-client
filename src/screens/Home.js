import React, { useState, useEffect, useContext } from "react";
import "../styles/home.css";
import Axios from "axios";
import { userContext } from "../App";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import {TiDelete} from "react-icons/ti";



function Home() {

  const [posts, setPosts] = useState([]);
  const [comment, setComment] = useState("");
  const { state, dispatch } = useContext(userContext);

  //gettin all the posts
console.log(state)
  useEffect(() => {
    getAllPost();
  }, []);

  function getAllPost() {
    Axios.get("https://circlesocial.herokuapp.com/allposts", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwtcircle"), //vlaidating the user
      },
    }).then((data) => {
      console.log(data.data.posts);
      setPosts(data.data.posts);
    });
  }

  //deleting particuler post from user

  function deletepost (postId){
    Axios.delete(
      `https://circlesocial.herokuapp.com/deletepost/${postId}`,{
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwtcircle"),
        },
      }

    ).then((res)=>{
      console.log(res)
      const newData = posts.filter((post)=>{
        return post._id != res.data._id;
      })

      setPosts(newData)
    })

  }

  //deletinng comments

  function deletecomment(postId,commentId){
    Axios.delete(
      'https://circlesocial.herokuapp.com/deletecomment',
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwtcircle"),
        }},
        {
          postsId:postId,
          commentId:commentId
        }
      

    ).then((res)=>{
      console.log( postId)
      console.log(commentId)
      console.log(res)
     
    })

  }
  //function to make comments

  function pushComment(text, id) {
    Axios.put(
      "https://circlesocial.herokuapp.com/comment",
      {
        text: text,
        postId: id,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwtcircle"),
        },
      }
    ).then((datas) => {
        const newmsgdata = posts.map((item) => {
        if (item._id == datas.data.result._id) {
          return datas.data.result;
        } else {
          return item;
        }
      });

      setPosts(newmsgdata);

     
    });
  }

  //for liking the post  and fetching total likes

  function getLikes(id) {
    Axios.put(
      "https://circlesocial.herokuapp.com/like",
      {
        postId: id,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwtcircle"),
        },
      }
    ).then((datas) => {
      
      //reciving the new data after the like from the backend

      const newData = posts.map((item) => {
        if (item._id == datas.data.result._id) { //checking, the id of the post which the uder liked 
          return datas.data.result;
        } else {
          return item;
        }
      });

      setPosts(newData);  // setting the all the posts with new like
     
    });
  }

  //for liking the post  and fetching total likes 

  function getDislikes(id) {
    Axios.put(
      "https://circlesocial.herokuapp.com/dislike",
      {
        postId: id,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwtcircle"),
        },
      }
    ).then((datas) => {
     

      const newData = posts.map((item) => {
        if (item._id == datas.data.result._id) { //checking, the id of the post which the uder disliked 
          return datas.data.result;
        } else {
          return item;
        }
      });

      setPosts(newData); // setting the all the posts with new dislike
     
    });
  }

  return (
    <div>
      <div className="homeframe">
        {posts.map((post) => {
          return (
            <div className="postframe">
              <div className="poster">
                <BiUserCircle className="userlogo" />
                <h2>{post.postedBy.name}</h2>
                {(post.postedBy._id == state._id)?<h3 onClick={()=>{deletepost(post._id)
                }}><TiDelete size="30px"/></h3>:''
                  
                }
                
              </div>

              <h3 className="captions">{post.title}</h3>
              <div className="postimage">
                <img src={post.photo} alt="" />
              </div>

              <div className="like">
                <div className="likesquare">
               
               
                {post.likes.includes(state._id) ? ( //if the user liked before showing them dislike button
                  <h1
                    onClick={() => {
                      getDislikes(post._id);
                    }}
                  >
                    <AiOutlineDislike className="likedislike" />
                  </h1>
                ) : (
                  <h1
                    onClick={() => {
                      getLikes(post._id);
                    }}
                  >
                    <AiOutlineLike className="likedislike" />
                  </h1>
                )}

                <h2 className="likes"> {post.likes.length} likes </h2>

                </div>
                


                  <div className="commentSquare">
                  <input
                className="commentbox"
                  type="text"
                  style={{fontSize: "14px"}}
                  value={comment}
                  onChange={(e) => {
                    setComment(e.target.value);
                    console.log(e.target.value);
                  }}
                  placeholder="Comment"
                />

                <button className="commentbtn"
                  onClick={() => {
                    pushComment(comment, post._id);
                  }}
                >
                  Add
                 
                </button>


                  </div>
             
              </div>
              <div className="comment">
                {post.comments.map((comment) => {
                  return (
                    <>
                   <div className="comment-delete">
                   <h2 className="commentedby">
                      {comment.postedBy.name} :  <span className="comments">{comment.text}</span>
                    </h2>
                    {
                      comment.postedBy._id == state._id? <h4 onClick={()=>{deletecomment(post._id,comment._id)
                      }}></h4>: " "
                    }
                    


                   </div>
                   
                    </>

                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
