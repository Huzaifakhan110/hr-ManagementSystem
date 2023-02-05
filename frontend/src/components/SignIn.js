import { useState } from "react";
import React from "react";
import image from '../images/hm.jpg'
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../state/reducers/userReducer'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
function SignIn() {
const googleAuth = (e)=>{
  e.preventDefault();
  window.open(`${process.env.REACT_APP_API_URL}/auth/google/callback`,"_self")
  // window.open("http://localhost:5000/auth/google/callback","_self")
  console.log(`${process.env.REACT_APP_API_URL}/auth/google/callback`,"_self")
}

  const naviagte = useNavigate();
  const getDataFromStor = useSelector((data) => data.userReducer);
  const token = localStorage.getItem('token') || null;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userInput, setUserInput] = useState({
      email : '',
      password : ''
  })
  const handleChange = (e) => {
      e.preventDefault();
      setUserInput({...userInput,[e.target.name]: e.target.value})
  }
  const handleSubmit = (event) => {
      event.preventDefault();
      console.log('from signin',userInput);
      dispatch(userLogin(userInput));
      setUserInput({
          email : '',
          password : ''
      });
      // navigate('/Welcome');
  };
  useEffect(() => {
    if(getDataFromStor.message === 'active' && token !== null){
        navigate('/Welcome');
    }
},[getDataFromStor])
  const signUpPage = () =>{
  naviagte('/SignUp');
  }
  
  const logSubmit = () =>{
    console.log('Huzaifa')
  }

 

  return (
    <>
      <section className="">
        <div className="px-4 py-5 px-md-5 text-center text-lg-start ">
          <div className="container">
            <div className="row gx-lg-5 align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0">
          <h5 className="my-5 display-3 fw-bold ls-tight">
           
          <img src={image}></img>
         
          </h5>
          
        </div>

              <div className="col-lg-6 mb-5 mb-lg-0">
                <div className="card">
                  <div className="card-body py-5 px-md-5">
                    <form  onSubmit={handleSubmit}>
                      <div className="text-center">
                        <h1>Sign In</h1>
                      </div>

                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form3Example3">
                          Email address
                        </label>

                        <input
                          type="email"
                          name="email"
                          id="loginEmail"
                          className="form-control"
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form3Example4">
                          Password
                        </label>

                        <input
                          type="password"
                          name="password"
                          id="loginPassword"
                          className="form-control"
                          onChange={handleChange}
                        />
                      </div>

                      <center>
                        <button
                          type="submit"
                          className="btn btn-primary btn-block mb-4"
                          
                        >
                          Sign In
                        </button>
                        
                        <button
                          type="button"
                          className="btn btn-primary btn-block mb-4 mx-3"
                          onClick={()=>signUpPage()}
                        >
                          Sign Up
                        </button>
                       <button  type="button"className="btn btn-primary btn-block mb-4 mx-3" onClick={googleAuth}>Sign In With Google</button>
                      </center>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default SignIn;
