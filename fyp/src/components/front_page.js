import React, { Component } from 'react';

import Dept  from "./Dept";
import Login from "./Login";
 //import Button from "./Button";
import {BrowserRouter as Router ,Switch,Route} from 'react-router-dom';
import './front_page.css';
import Student from "./Student";
import Project  from "./Project";
import Upload from "./Upload";
import Create_acc from "./Create_acc";
import Edit_profile from "./Edit_profile";
import Navbar from "./Navbar";
import View_List from "./View_List";
import Info from "./Info";
import Announcement from "./Announcement";



class front_page extends Component{
    render(){
        return(
            
            
            //     <Router>
            //         <div>
               
            //    <Navbar />
            
            // <Sidebar/>
           
            
            //    <Switch>
            //    <Route path="/Home" component={Sidebar}/>
              
            //    <Route path="/Profile" component={Student}/>
            //    <Route path="/Sign_Up" component={Create_acc}/>
             
            //    <Route path="/Announcement" component={Dept}/>
            //    <Route path="/Upload" component={Upload}/>
            //    <Route path="/Edit_profile" component={Edit_profile}/>
            //    <Route path="/Logout" component={Login}/>
               
            //    </Switch>
            
            //    </div>
            //    </Router>

<Router>
<Navbar />
{/* <Sidebar /> */}
<Switch>
   <Route exact path='/' component={Project} />
  <Route path='/logout' exact component={Login} />
  <Route path='/profile:admin_id' component={() => <Student authorized={false}/>} />
  <Route path='/upload' component={Upload} />
  <Route path='/signup' component={Create_acc} />
  <Route path='/edit_profile' component={Edit_profile} />
  <Route path='/assignment' component={View_List} />
  <Route path='/info' component={Info} />
  <Route path='/announcement' component={Announcement} />


  
  {/* <Route path='/login' exact component={Login} />
        <Route path='/Profile' exact component={Student} />
        <Route path='/Edit_profile' exact component={Edit_profile} />
        <Route path='/Create_acc' exact component={Create_acc} />
        <Route path='/change_pwd' exact component={Dept} />
        <Route path='/Upload' exact component={Upload} /> */}
</Switch>
</Router>
               
           
            
        )
    }
}
export default front_page;