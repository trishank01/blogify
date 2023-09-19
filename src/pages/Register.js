import React, { useState } from "react";

const Register = () => {
  const [username, setUserName] = useState("");
  const [password, setUserPassword] = useState("");
  
  
  async function handleRegister(e) {
    e.preventDefault();
  const response =   await fetch("http://localhost:4000/register" , {
      method : "POST",
      body : JSON.stringify({username , password}),
      headers : {'Content-Type' : "application/json"},
    })
    if(response.status === 200){ 
      alert("Ragistration successful")
    }else {
      alert("Ragistration failed")
    }
   }

   
  return (
    <> 
      <form onSubmit={handleRegister} className="register">
        <h1>Register</h1>
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
        <button>Register</button>
      </form>
    </>
  );
};

export default Register;
