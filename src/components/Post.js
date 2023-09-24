
import React, { useState } from 'react'
import {format} from "date-fns"
const Post = ({title , summary , cover , content , createdAt}) => {
    const [coverImg , setCoverImg] = useState(cover.split("uploads\\"))

    
   
  return (
        <div className="post">
    <div className="image">
    <img src={coverImg[1]} alt="image1"/>
    </div>
    <div className="text">
    <h2>{title}</h2>
    <p className="info">
     <a href="/" className="author" >  john cena </a>
     <time>{format(new Date(createdAt), "MMM d , yyyy HH:mm"  )}</time>
    </p>
      <p className="summary">{summary}</p>
      <div
      dangerouslySetInnerHTML={{__html: content}}
    />
    </div>
    
   </div>
  )
}

export default Post