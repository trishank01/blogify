import { formatISO9075 } from "date-fns";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const PostDetails = () => {
  const { id } = useParams();
  const [postInfo, setpostInfo] = useState(null);
  const {userInfo} = useContext(UserContext)
  // console.log("postInfo", postInfo?.author._id)
  // console.log("userInfo", userInfo?.id)
  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`).then((response) => {
      response.json().then((postInfoData) => {
        setpostInfo(postInfoData);
      });
    });
  }, []);


  if (!postInfo) return "";

  return (
    <div className="post-page">
      <h1>{postInfo.title}</h1>
      <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
      <div className="author">by @{postInfo.author?.username}</div>
      {userInfo.id === postInfo?.author._id && (
        <div  className="edit-row">
          <Link to={`/edit/${postInfo._id}`} className="edit-btn">Edit this post</Link>

        </div>
      )}
      <div className="image">
        <img
          src={`http://localhost:4000/${postInfo.cover}`}
          alt={postInfo.title}
        />
      </div>

      <div dangerouslySetInnerHTML={{ __html: postInfo.content }} />
    </div>
  );
};

export default PostDetails;
