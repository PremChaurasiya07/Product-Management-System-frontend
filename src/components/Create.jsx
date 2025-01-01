import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { IoHomeSharp } from "react-icons/io5";
import {  useNavigate } from 'react-router';
import '../css/edit.css';
import {ColorRing} from 'react-loader-spinner'
const Create = () => {
  const navigate=useNavigate();
  const[name,setname]=useState('');
 // const[isfileupload,setisfileupload]=useState(false);
  const[price,setprice]=useState();
  const[description,setdescription]=useState('');
  const[file,setfile]=useState(null);
  const [fileurl, setfileurl] = useState('');
  const [isloading, setloading] = useState(false);
  const notify = (msg) => toast(msg);
  const reset=(msg)=>{
    document.getElementById("input1").value='';
    document.getElementById("input2").value='';
    document.getElementById("input3").value='';
    document.getElementById("input4").value='';
    notify(msg);
  };
  const handleFileChange = (e) => { setfile(e.target.files[0]); }; 
  const handleFileUpload = async () =>{
   const formData = new FormData(); 
   formData.append('file', file); 
   if(file){
   try{
    
    await axios.post(`${import.meta.env.VITE_BACKEND_URL}home/create/upload`,formData,{ headers: { 'Content-Type': 'multipart/form-data'}}).then(res=>{setfileurl(res.data)}).catch(err=>console.log(err));
    
  }catch(err){
    console.log(err)
  }}
  console.log(fileurl);
}

const localId=(localStorage.getItem('Id'));
  const create=async(msg)=>{
  
  if(name&&price){
  
    await axios.post(`${import.meta.env.VITE_BACKEND_URL}home/create`,{img:fileurl,name,description,price,author:localId}).catch(err=>console.log(err));
  
    document.getElementById("input1").value='';
    document.getElementById("input2").value='';
    document.getElementById("input3").value='';
    document.getElementById("input4").value='';
    setname('');
    setprice('');
    setdescription('');
    setfile('');
    notify(msg);
  }else{
    (notify("Enter the field"));
  }
}
  return (
    
    <div >
      <button onClick={()=>navigate(`/home/${localId}`)} className='absolute top-[3vh] left-[3vw]'><IoHomeSharp size={30}/></button>
     <ToastContainer />
  <h1 id='edit-h1' className='text-center text-3xl font-sans font-semibold mt-[4vh] underline'>Add Products</h1>
  <div className='flex justify-center'>
    <div id='edit-form' className='w-[38vw] h-[60vh] mt-[8vh] border-x-2 border-t-2 border-black'>

      <div className='h-[12vh] w-[37.8vw]' >
      <label htmlFor="name" className='text-xl relative p-[1vw] top-[25%]' >Name</label><input className='border-x-2 border-y-2 border-black w-[28vw] ml-[2vw] h-[6vh] relative top-[2.8vh]' type="text" placeholder='Enter Product Name' onChange={(e)=>setname(e.target.value)} id='input1' />
      </div> 

      <div className='h-[12vh]  w-[37.8vw]'>
      <label  className='text-xl relative p-[1vw] top-[25%]' htmlFor="price">Price</label><input className='border-x-2 border-y-2 border-black w-[28vw] ml-[2.7vw] h-[6vh] relative top-[2.8vh]' type="number" placeholder='Enter Product Price' onChange={(e)=>setprice(e.target.value)} id='input2'  />
      </div> 

      <div id='des-div' className='h-[12vh]  w-[37.8vw] flex  mt-[3vh]'>
      <label className='text-xl relative pl-[0.6vw] pr-[0.5vw]' >Description</label><input type='text'  className='border-x-2 border-y-2 border-black w-[28vw]  h-[6vh]' placeholder='Enter Description' onChange={(e)=>setdescription(e.target.value)}  id='input3' />
      </div> 

    <div id='file-div' className='h-[12vh]  w-[37.8vw]'>
    <input className=' w-[27.7vw] ml-[2vw]  h-[8vh] relative top-[2.8vh]' type="file"  id='input4' onChange={handleFileChange}  /><button className='border-x-2 border-y-2 border-black w-[5vw] h-[4vh] text-xl font-serif relative top-[3vh] bg-gray-200 hover:bg-gray-100 ' onClick={handleFileUpload}>
      {
        (!isloading)?(<h1>Upload</h1>):( <span className='relative left-[1.5vw] bottom-[0.3vh]'>
           <ColorRing
          visible={true}
          height="30"
          width="30"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
          />
        </span>
       )
      }
    </button>
    </div>
    <div id='edit-box' className='flex justify-evenly h-[8.8vh] border-y-2 border-black  w-[37.8vw]'>
    <button className='border-x-2 border-y-2 border-black w-[7vw] h-[5vh] relative top-[2vh] bg-green-500 hover:bg-green-400 transition-all font-serif text-xl' onClick={()=>create("Product added Successfully")} >
  Create
    </button>
    <button className='relative top-[2vh] border-x-2 border-y-2 border-black w-[7vw] h-[5vh] bg-blue-500 transition-all hover:bg-blue-400 font-serif text-xl' onClick={()=>reset("Form has been reset")}>Reset</button>
    </div>
    </div>
  
  </div>
  <div  className='flex justify-center '>
  <img src={fileurl} className='w-[25vw] h-[25vh] border-x-2 border-y-2 border-black mt-[5vh] mb-[5vh]'/>
  </div>
    </div>
  )
}

export default Create;
