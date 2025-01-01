import axios from 'axios'
import React from 'react'
import { useParams,useNavigate } from 'react-router';
import '../css/delete.css'
const Delete = () => {
  const navigate=useNavigate();
  const {id}=useParams();
  const localId=localStorage.getItem('Id')
  const handledelete=async()=>{
    await axios.delete(`${import.meta.env.VITE_BACKEND_URL}home/delete/${id}`).then(data=>navigate(`/home/${localId}`)).then(data=>toast("Product Deleted Succesfully")).catch(err=>console.log(err))
  }
  return (
   <div id='delete-div' className='bg-cyan-200 w-[50vw] h-[22vh] border-x-2 border-y-2 border-yellow-400 absolute top-[30vh] left-[25vw]'>
     <div id='delete-h1' className='flex justify-center p-[3vh] text-2xl font-serif font-medium'><h2>Do You Really Want To Delete The Product?</h2></div>
     <div className='flex justify-evenly'>
      <button className='w-[6vw] mt-[2vh]  h-[5vh] border-x-2 border-y-2 border-black bg-black text-white text-xl font-sans hover:bg-red-600 transition-all' onClick={handledelete}>Yes</button>
      <button className='w-[6vw] mt-[2vh] h-[5vh] border-x-2 border-y-2 border-black bg-black text-white text-xl font-sans hover:bg-green-600 transition-all' onClick={()=>navigate('/home')}>No</button>
      </div>
    </div>
  )
}

export default Delete
