import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import {ToastContainer, toast } from 'react-toastify';
import { Authcontext } from '../../contextApi/Authcontext';
import '../../css/login.css';
import { ColorRing } from 'react-loader-spinner'
const Login = () => {
  const navigate=useNavigate()
const {login}=useContext(Authcontext);
  const alertmsg=(msg)=> toast(msg);
  const[email,setemail]=useState('');
  const[password,setpassword]=useState('');
  const[loading,setloading]=useState(false);

  const handlelogin=async()=>{
   
    const localId=localStorage.getItem('Id');
    if(!email||!password){
      return  alertmsg('Enter All The Fields');
      }
      if(password.length<6 || password.length>12){
        return alertmsg("Password length should be between 6-12")
      }
      setloading(true)
    const usercred= await axios.post(`${import.meta.env.VITE_BACKEND_URL}auth/login`,{email,password}).then((data=>{console.log(data);login(data.data.token,data.data.user);setloading(false)})).catch(err=>toast(err.message));
    setemail('');
    setpassword('');
   navigate(`/home/${localId}`,{replace:true});
  }
  return (
    <div >
      <ToastContainer/>
     <div id='login-div' className='w-[30vw] h-[60vh] border-x-2 border-y-2 border-black relative top-[16vh] left-[35vw]'>
      <h1 className='text-center text-3xl font-serif pt-[1.5vh]'>Login</h1>
     <label className='text-2xl pl-[1.5vw] font-mono mt-[8vh]'>Email</label> <input className='mt-[8vh] ml-[4.6vw] border-x-2 border-y-2 border-black w-[18vw] h-[4vh]' type="text" placeholder='Enter Email-id' required value={email} onChange={(e)=>setemail(e.target.value)} id='email-input' /><br />
     <label className='text-2xl pl-[1.5vw] font-mono mt-[9vh]'>Password</label>  <input className='mt-[9vh] ml-[2vw] border-x-2 border-y-2 border-black w-[18vw] h-[4vh]' type="text" placeholder='Enter password' required value={password} onChange={(e)=>setpassword(e.target.value)} /><br />
      <button className='border-x-2 border-y-2 border-black w-[8vw] h-[5vh] relative left-[11vw] top-[12vh] ' onClick={handlelogin}>
       <span className='flex justify-center' >{(loading&&email&&password)?<ColorRing
       visible={true}
        height="40"
        width="40"
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        />:'Login'
    }</span> </button>
     <p className='text-[15px] font-semibold relative top-[15vh] left-[7.5vw]'>Not Created Account? <Link to={'/register'} className='underline text-blue-600 text-[15px] font-bold'>Register</Link></p>
     </div>
    </div>
  )
}

export default Login
