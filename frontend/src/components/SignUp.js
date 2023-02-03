import React, {useState} from 'react';
import image from '../images/hm.jpg'
// import { useDispatch } from 'react-redux';
// import {signUp} from '../state/reduxReducers/userReducers';
// import React from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios';

function SignUp() {
  const navigate = useNavigate();
    const [userInput, setUserInput] = useState({
      userName : '',
      email : '',
      password : ''
  });
  const getDataHandle = (e) => {
      e.preventDefault();
      setUserInput({...userInput,[e.target.name] : e.target.value})
  }
  async function userRegister(data){
      const insertUserData = {
          name : `${data.userName}`,
          email : `${data.email}`,
          password : `${data.password}`
      }
      const passData = {
          method : 'POST',
          headers :{
              'Content-Type':'application/json'
          },
          data : JSON.stringify(insertUserData)
      }
      try {
          let response = await axios('http://localhost:5000/add',passData);
          let res2 = await response.data;
          console.log(res2);
          return res2
      } catch (error) {
          // console.log(error);
          if(error.response.data.validationError){
              return alert(`${error.response.data.validationError[0].msg}`)
          }else{
              return alert(`${error.response.data.error}`);
          }
      }
  }
    const handleSubmit = async (event) => {
      event.preventDefault();
      await userRegister(userInput).then((response) => {
          if(response.message){
              alert(response.message);
              setUserInput({
                  userName : '',
                  email : '',
                  password : ''
              });
              navigate('/')
          }
      }).catch((e)=>{
          console.log(e);
      })
  };

   
  return (
    <>
     
<section className="">

  <div className="px-4 py-5 px-md-5 text-center text-lg-start">
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
              <form onSubmit={handleSubmit}>
              <div className='text-center'><h1>Sign Up</h1></div>
                
                  <div className="col-md-12 mb-4">
                    <div className="form-outline">
                      <label className="form-label" htmlFor="form3Example1">First name</label>

                      <input type="text" id="uName" className="form-control" name='userName'  onChange={getDataHandle} />
                    </div>
                  </div>
                 

                
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="form3Example3">Email address</label>

                  <input type="email" id="uEmail" className="form-control"  name='email'  onChange={getDataHandle}/>
                </div>

                
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="form3Example4">Password</label>

                  <input type="password" id="uPassword" className="form-control" name='password'  onChange={getDataHandle} />
                </div>

             
        

                <center>
               <button type="submit" className="btn btn-primary btn-block mb-4"  >
                  Sign up
                </button>
               
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
  )
}

 export default SignUp;