import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./Login.css";

function Registration() {
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

        <h1 id="signUp">Sign Up</h1>
        <br></br>
            <label className="lab">Username: </label>
          <ErrorMessage className="error" name="name" component="span" />
          <br></br>
          <Field
           style={{width : "98%"}}
            autocomplete="off"
            id="inputCreatePost"
            name="name"
            placeholder="Enter your username"
          />
           <br></br>
 <br></br>
            <label className="lab">Email: </label>
          <ErrorMessage className="error" name="email" component="span" />
          <br></br>
          <Field
           style={{width : "98%"}}
            autocomplete="off"
            id="inputCreatePost"
            name="email"
            placeholder="Enter your email"
          />
           <br></br>
 <br></br>
          <label className="lab">Password: </label>
          <ErrorMessage className="error" name="password" component="span" />
          <br></br>
          <Field
          style={{width : "98%"}}
            autocomplete="off"
            type="password"
            id="inputCreatePost"
            name="password"
            placeholder="Enter Your Password"
          />
           <br></br> <br></br>
 <button type="submit" class="btn btn primary"  style={{padding: "14px 40px",width:"100%",
 backgroundColor:"rgb(43, 43, 148)",border:"none",fontSize:"20px",fontWeight:"bold",color:"white"}}> Sign Up
  </button>

  <a href="/logout" >Login?</a> 
       
        </Form>
      </Formik>
    </div>
  );
}

export default Registration;