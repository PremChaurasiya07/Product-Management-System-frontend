import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { IoHomeSharp } from 'react-icons/io5';
import { useParams,useNavigate } from 'react-router'
import { ToastContainer,toast } from 'react-toastify';
import '../css/edit.css'
import {Link} from 'react-router-dom'
const Update = () => {
const {id}=useParams();
const navigate=useNavigate();
const[prev,setprev]=useState({});

useEffect(()=>{
  axios.get(`${import.meta.env.VITE_BACKEND_URL}home/info/${id}`).then(data=>{setprev(...(data.data))
    setupdated({name:data.data[0].name,price:data.data[0].price,description:data.data[0].description,img:data.data[0].img});
  }).catch(err=>console.log(err));
  
},[]);
console.log(prev);
const [file, setfile] = useState(null);
const [fileurl, setfileurl] = useState('');
const handleFileChange = (e) => { setfile(e.target.files[0]); }; 
const[updated,setupdated]=useState({
  name:'',
  price:'',
  description:'',
  img:"",
});
const handleFileUpload = async () =>{
  const formData = new FormData(); 
  formData.append('file', file); 
  try{
   await axios.post(`${import.meta.env.VITE_BACKEND_URL}home/create/upload`,formData,{ headers: { 'Content-Type': 'multipart/form-data'}}).then(res=>setfileurl(res.data)).catch(err=>console.log(err));
 }catch(err){
   console.log(err)
 }
 
}
console.log(fileurl);
const edit=async(msg)=>{
  await axios.put(`${import.meta.env.VITE_BACKEND_URL}home/edit/${id}`,{name:updated.name,img:fileurl,description:updated.description,price:updated.file}).then(data=>toast(msg)).catch(err=>console.log(err));
}
const localId=localStorage.getItem('Id')
 return (
    <div >
      <ToastContainer />
  
     
  <h1 id='edit-h1' className='text-center text-3xl font-sans font-semibold mt-[4vh] underline relative'>Edit Products</h1>
  <div className='flex justify-center'>
    <div id='edit-form' className='w-[38vw] h-[60vh] mt-[8vh] border-x-2 border-t-2 border-black'>

      <div className='h-[12vh] w-[37.8vw]' >
      <label className='text-xl relative p-[1vw] top-[25%]' >Name</label><input className='border-x-2 border-y-2 border-black w-[28vw] ml-[2vw] h-[6vh] relative top-[2.8vh]' type="text" placeholder='Enter The Product Name' value={(prev!='')?updated.name:''} onChange={(e)=>setupdated({...updated,name:e.target.value})} contentEditable required/>
      </div> 
     
      <div className='h-[12vh]  w-[37.8vw]'>
      <label  className='text-xl relative p-[1vw] top-[25%]' >Price</label><input className='border-x-2 border-y-2 border-black w-[28vw] ml-[2.7vw] h-[6vh] relative top-[2.8vh]' type="number" placeholder='Enter The Product Price' value={(prev!='')?updated.price:''} onChange={(e)=>setupdated({...updated,price:e.target.value})}  required  />
      </div> 
      
      <div id='des-div' className='h-[12vh]  w-[37.8vw] flex  mt-[3vh]'>
      <label className='text-xl relative pl-[0.6vw] pr-[0.5vw]' >Description</label><input text  className='border-x-2 border-y-2 border-black w-[28vw]  h-[6vh]' placeholder='Enter The Product Description'  value={(prev!='')?updated.description:''}   onChange={(e)=>setupdated({...updated,description:e.target.value})} required />
      </div> 
    
    <div id='file-div' className='h-[12vh]  w-[37.8vw] flex'>
    <input className=' w-[27.7vw]  h-[8vh] relative ' type="file"  onChange={handleFileChange}/>
    <button className='border-x-2 border-y-2 border-black w-[5vw] h-[4vh]' onClick={handleFileUpload}>Upload</button>
    </div>
   
    <div id='edit-box' className='flex justify-center h-[8.8vh] border-y-2 border-black  w-[37.8vw]'>
    <button className='border-x-2 border-y-2 border-black w-[7vw] h-[5vh] relative top-[1.7vh] bg-green-500 hover:bg-green-400 transition-all font-serif text-xl' onClick={()=>edit("Product Edited Successfully")} >Edit</button>
  
    </div>
    </div>
  
  </div>
  <div id='img-div' className='flex justify-center mt-[4vh] '>
    <img  src={fileurl} className=' w-[18vw] h-[18vh] border-x-2 border-y-2 border-black' />
  </div>
  <div id='edit-des'>
    <h1>Decription:</h1>{
   (prev!='')?updated.description:'No Description Found!'
    }</div>
      <Link to={`/home/${localId}`}> <button onClick={()=>console.log("hii")} className='absolute top-[3vh] left-[3vw] hover:cursor-pointer '><IoHomeSharp size={30}/></button></Link>
    </div>
  )
}

export default Update
