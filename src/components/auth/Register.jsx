import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { ToastContainer,toast } from 'react-toastify';
import '../../css/register.css'
const Register = () => {
  const navigate=useNavigate();
const[name,setname]=useState('');
const[email,setemail]=useState('');
const[password,setpassword]=useState('');
const[confirmpass,setconfirmpass]=useState('');
const alertmsg=(msg)=> toast(msg);
  const handlesubmit=async()=>{
    if(!name||!email||!password||!confirmpass){
    return  alertmsg('Enter All The Fields');
    }
    if((password.length<6 || password.length>12 )|| (confirmpass.length<6 || confirmpass.length>12)){
      return alertmsg("Password length should be between 6-12")
    }
    if(confirmpass!==password){
      return alertmsg("Password Does't Match");
    }
    const credentials=await axios.post(`${import.meta.env.VITE_BACKEND_URL}auth/register`,{name,email,password}).then(res=>{alertmsg(res.data.message);
      setTimeout(() => {
        navigate('/');
      }, 4000);
    }).catch(err=>alertmsg(err.response.data.message));
    setname('');
    setemail('');
    setpassword('');
    setconfirmpass('');
  }
  return (
    <div>
      <ToastContainer/>
     <div id='register-div' className='w-[40vw] h-[84vh] border-x-2 border-y-2 border-black relative top-[9vh] left-[30vw] bg-gray-200 text-black'>
      <h1 className='text-center text-3xl font-serif pt-[1.5vh] underline'>Create Account</h1>
     <label className='text-xl pl-[1.5vw] font-mono mt-[8vh]'>Name</label> <input id='input-1' className='mt-[8vh] ml-[7.2vw] border-x-2 border-y-2 border-black w-[25vw] h-[5vh]' type="text" placeholder='EnterName' required value={name} onChange={(e)=>setname(e.target.value)} /><br />
     <label className='text-xl pl-[1.5vw] font-mono mt-[8vh]'>Email</label> <input id='input-2' className='mt-[8vh] ml-[6.5vw] border-x-2 border-y-2 border-black w-[25vw] h-[5vh]' type="text" placeholder='Enter Email-id' required value={email} onChange={(e)=>setemail(e.target.value)} /><br />
     <label className='text-xl pl-[1.5vw] font-mono mt-[9vh]'>Password</label>  <input id='input-3' className='mt-[9vh] ml-[4.4vw] border-x-2 border-y-2 border-black w-[25vw] h-[5vh]' type="password" placeholder='Enter password' required value={password} onChange={(e)=>setpassword(e.target.value)} /><br />
     <label className='text-[16px] pl-[1.5vw] font-mono mt-[9vh]' id='confirm-label'>Confirm Password</label>  <input id='confirm-input'  className='mt-[9vh] ml-[1vw] border-x-2 border-y-2 border-black w-[25vw] h-[5vh]' type="text" placeholder='Enter password' required value={confirmpass} onChange={(e)=>setconfirmpass(e.target.value)} /><br />
      <button className='border-x-2 border-y-2 border-black w-[10vw] bg-yellow-400 hover:bg-yellow-300 hover:text-white h-[6vh] transition-all text-xl font-mono relative left-[15vw] top-[8vh]' onClick={handlesubmit}>Register</button>
      <p className='text-[15px] font-semibold relative top-[8.8vh] left-[12.7vw]'>Already Have Account? <Link to={'/'} className='underline text-blue-600 text-[15px] font-bold'>Login</Link></p>
     </div>
    </div>
  )
}

export default Register
