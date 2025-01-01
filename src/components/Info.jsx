import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate,useParams } from 'react-router-dom'
import { IoHomeSharp } from "react-icons/io5";
import '../css/info.css'
const Info = () => {
    const navigate=useNavigate();
    const {id}=useParams();
    const[product,setproduct]=useState({});
    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_BACKEND_URL}home/info/${id}`).then(data=>setproduct(...(data.data))).catch(err=>console.log(err));
    },[]);
    console.log(product);
    const localId=localStorage.getItem('Id')
  return (
    <div>
        <button onClick={()=>navigate(`/home/4{localId}`)} className='absolute ml-[3vw]'><IoHomeSharp size={32}/></button>
    <h1 id='text1' className='text-center text-3xl font-serif font-semibold underline mt-[4vh] text-cyan-600 outline-2 outline-cyan-600'>Product Info</h1>
    <div className='flex justify-center mt-[8vh]'>
        <div>
        <table className='flex justify-center'>
        <tbody>
            <tr className='border-x-2 border-y-2 border-green-500 '>
                <td id='text2' className='min-w-[6vw] border-x-2 border-green-500 text-wrap font-mono font-bold text-2xl text-center'>Name</td>
                <td id='text3' className='max-w-[60vw] border-x-2  border-green-500 text-wrap font-serif font-thin text-2xl text-start pl-[1vw]'>{product.name}</td>
            </tr>
            <tr className='border-x-2 border-y-2 border-green-500 '>
                <td id='text4' className='min-w-[6vw] border-x-2 border-green-500 text-wrap font-mono font-bold text-2xl text-center'>Price</td>
                <td id='text5' className='max-w-[760vw] border-x-2 border-green-500 text-wrap font-mono font-thin text-2xl text-start pl-[1vw]'>{product.price}</td>
            </tr>
            <tr className='border-x-2 border-y-2 border-green-500 '>
                <td id='text6' className='min-w-[6vw] border-x-2 border-green-500 text-wrap font-mono font-bold text-2xl text-center'>Description</td>
                <td id='text7' className='max-w-[60vw] border-x-2 border-green-500 text-wrap font-mono font-thin text-2xl text-start pl-[1vw]'>{product.description}</td>
            </tr>
        </tbody>
    </table>
    <div className='flex justify-center mt-[5vh]'><img src={product.img} alt={product.name} className='w-[40vw] h-[40vh] border-x-2 border-y-2 border-black' id='info-product-img'></img></div>
        </div>
   
    </div>  
    </div>
  )
}

export default Info
