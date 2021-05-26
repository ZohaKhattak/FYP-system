import React, { useEffect, useState } from 'react'
import { Component } from 'react';
import Axios from 'axios';
import "./Create_acc.css";

function Signup(){
    
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [dataList, setDataList] = useState([]);


const register =() => {
    Axios.post("http://localhost:3001/api/register", {
        name: name, 
        email: email, 
        password: password}).then((response) => {
            console.log(response);
        });
       
        
};




//class Login extends Component{


//render(){
    return(
        <div>
        <form className="container">

 <div class="form-group">
 <h1 id="signUp">Sign Up</h1>
 <br></br>
 <label className="lab" > Name </label>
 <input type="text"  placeholder="Enter your name" required onChange={(e) => {
     setName(e.target.value);}}
    />
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

          
       
<button  onClick={register}>Sign Up</button>


</form>

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
 
 
   
    
    
    )

}
export default Signup;
