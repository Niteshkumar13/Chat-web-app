import React, { useState } from 'react'
import '../cssFile/login.css';
import { Link } from 'react-router-dom';
import { loginHook, googleLoginSuccess } from '../hooks/authHook';
import { useAuth } from '../context/AuthUser';
import {GoogleLogin} from "@react-oauth/google";
const Login = () => {
  const [data, setdata] = useState({
    email: '',
    password: ''
  });
  const { setAuthUser } = useAuth();

  const handelData = (event)=>{
    if (event.key === 'Enter') {
      event.preventDefault();
      loginHook({ data, setAuthUser })
    }
  }
  
  return (
    <div className='login-container'>
      <span className='login'>Login</span>
      <input onChange={e => setdata({ ...data, email: e.target.value })} value={data.email} type='text' placeholder="Username"  onKeyDown={handelData}/>
      <input onChange={e => setdata({ ...data, password: e.target.value })} value={data.password} type='password' placeholder="Password"  onKeyDown={handelData}/>
      <button onClick={e => loginHook({ data, setAuthUser })}>Login</button>
      <hr />
      <GoogleLogin
        onSuccess={(credentialResponse)=>googleLoginSuccess({credentialResponse,setAuthUser,type:"login"})}
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
      <span className='new-user'>New user? <Link to='/signup'>Signup</Link></span>
    </div>
  )
}

export default Login
