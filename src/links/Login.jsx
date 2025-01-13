// import React from 'react'
import axios from 'axios';
// useEffect
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBCol,
    MDBInput
  }
  
  from 'mdb-react-ui-kit';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import { useNavigate } from 'react-router-dom';
  
function Login() {
  const [formData, setFormData] = useState({"username":"","password":""})
  const Navigate = useNavigate()

 useEffect(() => {
      const localResponse = localStorage.getItem('response');
      if (localResponse) {
        Navigate('/dashboard'); // Redirect to login if not logged in
      } 
    }, [Navigate]); 

  const formChange = (e)=>{
      setFormData({...formData,[e.target.name]:e.target.value})
      console.log(formData);
      
  }

  const gotoLogin = async(e)=>{
    e.preventDefault()
    try {
        const response = await axios.post("https://backend-project-1nk6.onrender.com/login",formData)
        console.log(response)
        localStorage.setItem('response',JSON.stringify({username:response.data.students.username,year:response.data.students.year}))
        Navigate('/dashboard',{state:{username:response.data.students.username,year:response.data.students.year}})
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 200
        console.error('Login failed:', error.response.data.message);
        toast.error(error.response.data.message+", Please Login with your Correct Credentails");
        
      } else {
        // Network error or no response
        console.error('Error:', error.message);
        toast.error(error.response.data.message+", Please Try Again Later");
      }
    }
    console.log(formData);
    
    
    
  }
  return (
    <div>
    <Toaster
  position="top-right"
  reverseOrder={true}
  gutter={8}
  containerClassName=""
  containerStyle={{}}
  toastOptions={{
    // Define default options
    className: '',
    duration: 5000,
    removeDelay: 1000,
    style: {
      background: '#363636',
      color: '#fff',
    },

    // Default options for specific types
    success: {
      duration: 3000,
      iconTheme: {
        primary: 'green',
        secondary: 'black',
      },
    },
  }}
/>
       <MDBContainer className="my-5 login-page">

<MDBCard>
  <MDBRow className='g-0'>

    <MDBCol md='6'>
      <MDBCardImage src='https://mdbootstrap.com/img/new/textures/full/171.jpg' alt="login form" style={{ height: "-webkit-fill-available"}}className='rounded-start w-100'/>
    </MDBCol>

    <MDBCol md='6'>
      <MDBCardBody className='d-flex flex-column'>

        <div className='d-flex flex-row mt-2'>
          {/* <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }}/> */}
          <span className="h1 fw-bold mb-0">SV Student Login</span>
        </div>

        <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px'}}>Sign into your account</h5>

          <MDBInput wrapperClass='mb-4' label='Hallticket Number' id='formControlLg' type='email' size="lg" name ="username" onChange={(e)=>{formChange(e)}}/>
          <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg" name = "password" onChange={(e)=>{formChange(e)}}/>

        <MDBBtn className="mb-4 px-5" color='dark' size='lg' onClick={(e)=>{gotoLogin(e)}}>Login</MDBBtn>
        <a className="small text-muted" href="#!">Forgot password?</a>
        {/* <p className="mb-5 pb-lg-2" style={{color: '#393f81'}}>Don't have an account? <a href="#!" style={{color: '#393f81'}}>Register here</a></p>

        <div className='d-flex flex-row justify-content-start'>
          <a href="#!" className="small text-muted me-1">Terms of use.</a>
          <a href="#!" className="small text-muted">Privacy policy</a>
        </div> */}

      </MDBCardBody>
    </MDBCol>

  </MDBRow>
</MDBCard>

</MDBContainer>
    </div>
  )
}

export default Login
