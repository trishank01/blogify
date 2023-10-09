import React, { useEffect, useState } from 'react'
import Post from '../components/Post'

const IndexPage = () => {
  const [post , setPost] = useState([])
  useEffect(() => {
    fetch('http://localhost:4000/post').then(res => {
      res.json().then(posts => {
        setPost(posts)
      })
    })
  }, [])
  console.log(post)
  return (
    <main>
     {post.length > 0 && post.map((post) => {
      return (
        <div key={post._id} >
        <Post {...post}/>
        </div>
      )
     })}
    </main>
  )
}

export default IndexPage