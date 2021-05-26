import React, { useState } from "react";
import { useEffect } from 'react';
import { FaCentercode } from "react-icons/fa";
import Axios from 'axios';
import "./Project.css";

function AddAnnouncement() {

  const [activity, setActivity] = useState("");
  const [tentativeDate, setTentativeDate] = useState("");
  const [responsibility, setResponsibility] = useState("");
  const [deliverables, setDeliverables] = useState("");

  const [dataList, setDataList] = useState([]);

 

 //insert project details function
  const add =() => {
    Axios.post("http://localhost:3001/api/announcement", {
        activity: activity, 
        tentativeDate: tentativeDate,
        responsibility: responsibility,
        deliverables: deliverables });
        
            setDataList([
                ...dataList,
                 { activity: activity, tentativeDate: tentativeDate, responsibility: responsibility, deliverables: deliverables},]);
};


  return (
    <div className="container">
      <h3 style={{ color:"blue",textAlign:"center" }}>ADD AN ANNOUNCEMENT</h3>
    <form>
      <tr >
        <td>
      <input  type="text" name="Activity" placeholder="Activity" onChange={(e) => {
                setActivity(e.target.value);}}
            /></td>
            </tr>
            <tr>
            <td>
            <input type="date" name="Tentative Date" placeholder="Tentative Date" onChange={(e) => {
              setTentativeDate(e.target.value);}}
            />
            </td>
            </tr>
            <tr>
            <td>
            <input type="text" name="Responsibility" placeholder="Responsibility" onChange={(e) => {
              setResponsibility(e.target.value);}}
            />
            </td>
            </tr>
            <tr>
            <td>
            <input type="text" name="Deliverables" placeholder="Deliverables" onChange={(e) => {
              setDeliverables(e.target.value);}}
            />
            </td>
            </tr>
               
            </form>
                    
      <button onClick={add} >Add Announcement</button>         
      
      
    </div>
  );
}

export default AddAnnouncement;
