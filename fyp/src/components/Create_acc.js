import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./Login.css";

 function Create_acc() {

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().min(3).max(15).required(),
    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
    password: Yup.string().min(4).max(20).required(),
  });

 const onSubmit = (data) => {
  axios.post("http://localhost:3001/auth", data).then(() => {
    console.log(data);
  });
};

        return (
            <div>
              <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="container">
  <div class="form-group">
      <h1 id="signUp">Sign Up</h1>
      <br></br>
         
    <label for="exampleInputEmail1" className="lab">Username</label>
    <input type="text" class="form-control" id="exampleInputEmail1"  placeholder="Enter username" required/>
    {/* <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> */}
  </div>
  <div class="form-group">

    <label for="exampleInputEmail1" className="lab">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" required/>
    {/* <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> */}
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1" className="lab">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" required/>
  </div>
  {/* <div class="form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
    <label class="form-check-label" for="exampleCheck1">Check me out</label>
  </div> */}
 <button type="submit" class="btn btn primary"  style={{padding: "14px 40px",width:"100%",
 backgroundColor:"rgb(43, 43, 148)",border:"none",fontSize:"20px",fontWeight:"bold",color:"white"}}> Sign Up
  </button>
  <a href="/logout" >Login?</a> 
  </Form>
      </Formik>
         </div>
        )
    }


export default Create_acc ;