import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setUserPassword] = useState("");
  const [redirect , setRedirect] = useState(false)
  const {setUserinfo} = useContext(UserContext)
  
  async function handleLogin(e) {
    e.preventDefault();
  const response = await fetch("http://localhost:4000/login" , {
      method : "POST",
      body : JSON.stringify({username , password}),
      headers : {'Content-Type' : "application/json"},
      credentials : "include",
    })
    if(response.ok){
      response.json().then(userInfo => {
        setUserinfo(userInfo)
        setRedirect(true)
      })
    
    }else {
      alert("wrong credentials")
     }
     
   }


   if(redirect){
    return <Navigate to="/"/>
   }
  return (
    <> 
      <form onSubmit={handleLogin} className="register">
        <h1>Login</h1>
        <input type="text" 
        placeholder="username"  
        value={username}
        onChange={(e) => setUserName(e.target.value)}
        />
        <input 
        type="password" 
        placeholder="password"
        value={password}
        onChange={(e) => setUserPassword(e.target.value)}
        />
        <button>Login</button>
      </form>
    </>
  );
};

export default Login;
