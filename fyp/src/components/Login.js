import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import Axios from 'axios';
import "./Create_acc.css";

import { Component } from 'react';


function Login(){


const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [loginStatus, setLoginStatus] = useState("");
const [status, setStatus] = useState(false);


let history = useHistory();


Axios.defaults.withCredentials = true;

const submit =() => {
    Axios.post("http://localhost:3001/api/login", {
        name: name,
        email: email, 
        password: password}).then((response) => {
            
            if(response.data.message){
                setLoginStatus(response.data.message);


            if(!response.data.auth){ 
               setStatus(false);

            }}else {
                setLoginStatus("");
                console.log(response.data);
                localStorage.setItem("token", response.data.token);

                setStatus(true);
            }
        });
       
};

useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {
      if (response.data.loggedIn == true) {
        setLoginStatus(response.data.user[0].username);
      }
    });
  }, []);

const userAuthenticated = () => {
    Axios.get("http://localhost:3001/isUserAuth", {
        headers: {
            "x-access-token": localStorage.getItem("token"),
        },
    }).then((response) => {
       console.log(response);
   });
};


//class Login extends Component{


//render(){
    return(
        <div>

 <div class="form-group">
 <h1 id="signUp">Login</h1>
 <br></br>
 <label for="exampleInputEmail1" className="lab"> Email address </label>
 <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" required onChange={(e) => {
     setEmail(e.target.value);}}
    />
{/* <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> */}
</div>
<div class="form-group">
<label for="exampleInputPassword1" className="lab">Password</label>
<input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" required onChange={(e) => {
    setPassword(e.target.value);}} 
/>
</div>
{/* <div class="form-check">
<input type="checkbox" class="form-check-input" id="exampleCheck1"/>
<label class="form-check-label" for="exampleCheck1">Check me out</label>
</div> */}
          
<a href="/about"> Forget Password?</a>         
<button  onClick = {submit} >Login</button>
<button onClick= {userAuthenticated} > Check if authenticated? </button>


<h1 className="lab">{loginStatus}</h1>



</div>
//         <section>
//     <div className="form-container">
//         <h1 className="Log_In">Login Form</h1>
//         <form>
//             <div className="control">
//             <label >Email</label>
//              <input type="email" class="form-control" name="email" id="name" />
//              <div className="control">
//               <label >Password</label>
//               <input type="password" name="psw" class="form-control" id="psw" />
//                </div>
//                {/* <span><input type="checkbox" /> Remember Me </span> */}
//                <div className ="control">
//              <input type="submit" class="btn btn-primary" value="Log In" />
//               </div>
//             </div>

//         </form>
//         <div className="Loglink">
//            <a href="/about"> Forget Password?</a>
//                 </div>
 
//    </div>
//   </section>
 
   

    );

}
export default Login;
