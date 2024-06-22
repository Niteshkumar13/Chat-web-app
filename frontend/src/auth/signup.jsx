import React, { useState } from 'react';
import '../cssFile/login.css';
import { Link } from 'react-router-dom';
import {signupHook,googleLoginSuccess} from '../hooks/authHook.js';
import {useAuth} from '../context/AuthUser';
import {GoogleLogin} from "@react-oauth/google";
const Signup = () => {
  const [data, setdata] = useState({
    fullName: '',
    email: '',
    password: ''
  });
   const {setAuthUser} = useAuth();

   const handelData2 = (event)=>{
    if (event.key === 'Enter') {
      event.preventDefault();
      signupHook({data,setAuthUser})
    }
  }
  return (
    <div className='signup-container'>
      <span className='login'>Signup</span>
      <input onChange={e=>setdata({...data,fullName:e.target.value})} type='text' placeholder="Name" value={data.fullName} onKeyDown={handelData2}/>
      <input onChange={e=>setdata({...data,email:e.target.value})} type='text' placeholder="Email" value={data.email} onKeyDown={handelData2}/>
      <input onChange={e=>setdata({...data,password:e.target.value})} type='password' placeholder="Password" value={data.password} onKeyDown={handelData2}/>
      <button onClick={e => signupHook({data,setAuthUser})}>Signup</button>
      {/*  */}
      <hr />
      <GoogleLogin
        onSuccess={(credentialResponse)=>googleLoginSuccess({credentialResponse,setAuthUser,type:"signup"})}
        onFailure={() => {
          alert('Login Failed');
        }}
        size='large'
        useOneTap='true'
        ux_mode="popup"
        logo_alignment='left'
        theme="outline"
        text='continue_with'
        shape="rectangular"
        width="296px" />
      <span className='new-user'>already have a account? <Link to='/'>Login</Link></span>
    </div>
  )
}

export default Signup;
