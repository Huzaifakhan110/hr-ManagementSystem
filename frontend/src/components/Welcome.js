import { useNavigate } from 'react-router-dom';
import React from 'react'
// import { useSelector } from "react-redux";
import { useState } from "react";
function Welcome() {
  const naviagte = useNavigate();
  function onLogutClicked() {
  naviagte('/');
  }
//   const dispatch = useDispatch();
  // const val = useSelector((state) => state.signUpvalue.data);
  const [userName, setUserName] = useState("");


//  val.find((e)=>{

//    if(e.name !== userName){
//     setUserName(e.name);
//    }
// // console.log(userName);
//     return userName;
  
// })

      return <>

        <div className="px-4 py-5 px-md-5 text-center text-lg-start">
          <div className="container-fluid">
            <div className="row gx-lg-5 align-items-center">
              <div className="col-lg-6 mb-5 mb-lg-0">
                <h1 className="my-5 display-3 fw-bold ls-tight">
                  The best offer <br />
                  <span className="text-primary">for your business Welcome {userName}</span>
                </h1>

              </div>
            </div>
          </div>
        </div>


   <center> <button type="button" className="btn btn-primary btn-block mb-4 " onClick={onLogutClicked}>Log Out</button></center>

    </>
}

export default Welcome;