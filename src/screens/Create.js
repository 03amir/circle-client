import Axios from "axios";
import React, { useState, useEffect } from "react";
import "../styles/signup.css";
import { useNavigate } from "react-router-dom";

function Create() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("jwtcircle");

  // have to use the use effect to prevent errors beacuse the generation of the url may take a  little bit longer time

  // saving the details of the image on the database

  useEffect(() => {
    if (url) {
      Axios.post(
        `${process.env.REACT_APP_BASE_URL}/createpost`,
        {
          title,
          body,
          pic: url,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      ).then((res) => {
        console.log(res);
        if (res.status == 202) {
          navigate("/");
        }
      });
    }
  }, [url]);

  //uploading the image on cloudinary

  function setPost() {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "circle");
    data.append("cloud_name", "amir");
    Axios.post(
      "https://api.cloudinary.com/v1_1/circle1/image/upload",
      data
    ).then((data) => {
      setUrl(data.data.url);
    });
  }

  return (
    <div>
      <div>
        <div className="signupframe">
          <div className="signupsubframe">
            <div className="signupcard">
              <input
                type="text"
                placeholder="Tittle"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
              <input
                type="text"
                placeholder="Body"
                value={body}
                onChange={(e) => {
                  setBody(e.target.value);
                }}
              />
              <input
                type="file"
                placeholder="upload image"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                }}
              />
              <button
                className="signupbtn"
                onClick={() => {
                  setPost();
                }}
              >
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
