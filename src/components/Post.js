import React, {  useState } from "react";
import {Link} from "react-router-dom"
import { format } from "date-fns";

const Post = ({ _id ,title, summary, cover, content, createdAt, author }) => {
  const [coverImg, setCoverImg] = useState(cover.split("uploads\\"));
 

  return (
    <div className="post">
      <div className="image">
       <Link to={`/post/${_id}`}>
       <img src={"http://localhost:4000/" + cover} alt="image1" /> 
       </Link>
      </div>
      <div className="text">
      <Link to={`/post/${_id}`}>
        <h2>{title}</h2>
       </Link>
        <p className="info">
          <a href="/" className="author">
          
            {author.username}{" "}
          </a>
          <time>{format(new Date(createdAt), "MMM d , yyyy HH:mm")}</time>
        </p>
        <p className="summary">{summary}</p>
      
      </div>
    </div>
  );
};

export default Post;
