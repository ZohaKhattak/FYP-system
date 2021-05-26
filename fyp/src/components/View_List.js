import React, { Component } from 'react'
import { useEffect, useState } from 'react'
import Axios from 'axios';

import Table from 'react-bootstrap/Table';
import "./View_List.css";


function View_List(){

const [title, setTitle] = useState("");
const [project_id, setProject_id] = useState("");
const [dataList, setDataList] = useState([]);

useEffect(()=> {
  Axios.get("http://localhost:3001/api/view_list").then((response)=> {
  setDataList(response.data);
  });

}, []);

const deleteButton =(project_id) => {
  Axios.delete("http://localhost:3001/api/delete/${project_id}").then((response)=> {
    setDataList(dataList.filter((val)=> {
      return val.Project_id != project_id;
    }));

  });
     
      
};



//export class View_List extends Component {
    //render() {
        return (
            <div id="table-div">
                <Table striped bordered hover size="sm">
  <thead id="view_thead">
    <tr>
      <th>#</th>
      <th>Project Title</th>
      <th>Student</th>
      <th>Internal</th>
      <th>External</th>
      <th>Email Id</th>
      <th>Action</th>
      <th>Action</th>

    </tr>
  </thead>
  <tbody>
    
{dataList.map((val)=> {
      return ( 
    <tr>
      <td>{val.Project_id}</td>
      <td>{val.Title}</td>
      <td>{val.Student}</td>
      <td>{val.Internal}</td>
      <td>{val.External}</td>
      <td>{val.Email}</td>
      <td><button class="btn btn-primary" >Edit</button></td>
      <td><button onClick={deleteButton}>Delete</button></td>
    </tr>);
     })}
    
  </tbody>
</Table>

                
            </div>
        )
    }
    

export default View_List;
