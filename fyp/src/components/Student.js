import React, { useState , useContext } from "react";
import { Redirect } from 'react-router-dom';
import { useEffect } from 'react';
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { Component } from 'react';
import { Link } from 'react-router-dom';
import "./Student.css";
import { AuthContext } from "./helpers/AuthContext";

//import { response } from 'express';




function Student( ) {

    let { id } = useParams();
   // let history = useHistory();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const {setAuthState} = useContext(AuthContext);

    
    useEffect(() => {axios.get(`http://localhost:3001/auth/basicinfo/${id}`).then((response) => {
         //setName(response.data.name);
         // setEmail(response.data.email);
        console.log(response.data.email);

        });
    

    }, []);

    
return(



<div className="container emp-profile">
    
            <form method="post">
                <div className="row">
                    <div className="col-md-4">
                        <div className="profile-img">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog" alt=""/>
                            <div className="file btn btn-lg btn-primary">
                                Change Photo
                                <input type="file" name="file"/>
                            
                            </div>
                            
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="profile-head">
                                    <h5>
                                    {name}                                    
                                     </h5>
                                    
                        </div>
                    </div>
                  
                </div>
                <div className="row">
                  
                    <div className="col-md-8">
                       
                            <hr></hr>
                                        <div className="row">
                                            <div className="col-md-6">
                                                
                                                <label className="lab">User Id</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>NED/1500/2017</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label className="lab">Name</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{name}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label className="lab">Email</label>
                                            </div>
                                            <div className="col-md-6">
                                            <p>{email}</p>
                                            </div>
                                        </div>
                                       
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label className="lab">Department</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>SE</p>
                                            </div>
                                        </div>
                                        <br></br>
                                      <Link to="/edit_profile">  <input type="submit" className="profile-edit-btn" name="btnAddMore" value="Edit Profile"/></Link>
                         
                    </div>
                </div>
            </form>           
        </div>

    
    )
}

export default Student;