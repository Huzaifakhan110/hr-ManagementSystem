// import { useNavigate } from 'react-router-dom';
// import React from 'react'
// // import { useSelector } from "react-redux";
// import { useState } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector , useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";
import { logout } from '../state/reducers/userReducer';
// import Navbar from './Navbar';
const settings = ['Logout'];
function Welcome() {
  const getDataFromStor = useSelector((data) => data.userReducer)
  const token = localStorage.getItem('token') || undefined;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.clear('token');
    dispatch(logout());
    navigate('/');
  }

  useEffect(() => {
      if(token === undefined && getDataFromStor.message === null){
          navigate('/');
      }
  },[])
  return(
      <>
  

<div className="px-4 py-5 px-md-5 text-center text-lg-start">
  <div className="container-fluid">
    <div className="row gx-lg-5 align-items-center">
      <div className="col-lg-6 mb-5 mb-lg-0">
        <h1 className="my-5 display-3 fw-bold ls-tight">
          The best offer <br />
          <span className="text-primary">for your business Welcome   {
                  getDataFromStor.value !== null ? ` ${getDataFromStor.value.name}` : 'Welcome' 
              }</span>
        </h1>

      </div>
    </div>
  </div>
</div>
         
        
          <center><button type="button" className="btn btn-primary btn-block mb-4 mx-3" onClick={handleLogout}>{settings}</button> </center>
      </>
  )
}
  // const naviagte = useNavigate();
  // function onLogutClicked() {
  // naviagte('/');
  // }
//   const dispatch = useDispatch();
  // const val = useSelector((state) => state.signUpvalue.data);



//  val.find((e)=>{

//    if(e.name !== userName){
//     setUserName(e.name);
//    }
// // console.log(userName);
//     return userName;
  
// })



export default Welcome;