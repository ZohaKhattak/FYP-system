import React, { useState, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { AuthContext } from "./helpers/AuthContext";

import "./Login.css";



function Login() {
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");

  const [password, setPassword] = useState("");
  const {setAuthState} = useContext(AuthContext);

  let history = useHistory();


  const login = () => {
    const data = { email: email, password: password };
    axios.post("http://localhost:3001/auth/login", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        console.log(response.data);
        localStorage.setItem("accessToken", response.data);
        setAuthState({
          email: response.data.email,
          id: response.data.id,
          status: true,
        });
        history.push("/profile");

      }
    });
  };

  return (
   
    <div className="container">
      
       <div class="form-group">
       <h1 id="Login">Log In</h1>
               <br></br>
        <label for="exampleInputEmail1" className="lab">Email address</label>
      <input  input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" required
        onChange={(event) => {
          setEmail(event.target.value);
        }}
      /></div>
        <div class="form-group">
      <label for="exampleInputPassword1" className="lab">Password</label>
        <input name="password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" required
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      /></div>
<br></br>
      <button onClick={login} class="btn btn primary" type="submit" style={{padding: "14px 40px",width:"100%",backgroundColor:"rgb(43, 43, 148)",border:"none",fontSize:"20px",fontWeight:"bold",color:"white"}}> Login </button>
     
      <a href="/signup" > Sign Up?</a> 

    </div>
 
  );
}

export default Login;