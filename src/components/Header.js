import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Header = () => {
  const { setUserinfo , userInfo} = useContext(UserContext)
  const username = userInfo?.username
  useEffect(() => {
    fetch("http://localhost:4000/profile" , {
      credentials : "include",
    }).then(res => {
       res.json().then(userInfo => {
        setUserinfo(userInfo.username)
       })
    })
  },[])

  const handleLogout = () => {
    fetch("http://localhost:4000/logout" , {
      credentials : "include",
      method : "POST"

    })
    setUserinfo(null)
  }
 

  return (
    <header>
      <Link to="/" className="logo">
        MyBlog
      </Link>
      <nav>
        {username && <>
        <p>{username}</p>
        <Link to="/create">Create new post</Link>
        <Link onClick={handleLogout}>Logout</Link>
        </>}
        {!username && <>
          <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        </>}
    
      </nav>
    </header>
  );
};

export default Header;
