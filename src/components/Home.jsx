
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { MdCreate } from "react-icons/md";
import { FaInfo } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import {Link} from 'react-router-dom'
import '../css/home.css';
// import '@/css/home.css';
import { ColorRing,BallTriangle } from 'react-loader-spinner'
import {Authcontext} from '../contextApi/Authcontext';
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const navigate=useNavigate();
  const[query,setquery]=useState('')
  const[searchdata,setsearchdata]=useState([]);
  const[products,setproducts]=useState(null);
  const[loading,setloading]=useState(false);
  const[visible,setvisible]=useState(false);
  const {token,user,logout}=useContext(Authcontext);
  const localtoken=localStorage.getItem('token');
  const localid=localStorage.getItem('Id');
  const username=localStorage.getItem('name');
  useEffect(()=>{
    const localtoken=localStorage.getItem('token');
    const localId=localStorage.getItem('Id');
    const product=axios.get(`${import.meta.env.VITE_BACKEND_URL}home/${localId}`,{
    headers:{Authorization:`Bearer ${localtoken}`}
    }).then(product=>setproducts(product.data)).catch(err=>console.log(err));
  },[token]);
  useEffect(() =>
     {navigate(`/home/${localid}`, { replace: true });
     },[navigate]);

   console.log(products);
  const imgscale=(index)=>{
    document.getElementById(`pd-img${index}`).style.position="absolute";
    document.getElementById(`pd-img${index}`).style.width="25%";
    document.getElementById(`pd-img${index}`).style.height="100%";
    document.getElementById(`pd-img${index}`).style.zIndex=99;
    
  }
  const imgdescale=(index)=>{
    document.getElementById(`pd-img${index}`).style.position="relative";
     document.getElementById(`pd-img${index}`).style.width="6vw";
     document.getElementById(`pd-img${index}`).style.height="6vh";
     document.getElementById(`pd-img${index}`).style.zIndex=0;
  };
  const search=async(e)=>{
   const value=e.target.value;
   setquery(value)
   if(value){
 const res=await axios.get(`${import.meta.env.VITE_BACKEND_URL}${localid}/search?q=${value}`,).then(res=>{console.log(res.data.items);setsearchdata(res.data.items)}).catch(err=>console.log(err));
   }
}
const handlelogout=()=>{
  logout();
  navigate('/');
}
console.log(user)
  return (
    <div className='w-[100vw] h-[100vh]'>
      <button id='logout-icon' onClick={()=>setvisible(!visible)} className='transition-all w-[2.8vw] h-[2.8vw] text-2xl text-white font-serif mt-[1vh] absolute right-[1.6vw] rounded-full border-x-2 border-y-2 border-white bg-cyan-400'><span className='flex justify-center pt-[0.4vh] capitalize'>{(username)?username[0]:'L'}</span></button>
      <div id='logout-div' className='bg-orange-500 hover:bg-orange-400 transition-all w-[6vw] h-[5vh]  text-xl font-mono border-x-2 border-y-2 border-black absolute right-[0.05vw] top-[8.2vh] cursor-pointer' onClick={handlelogout} style={(visible?{display:'block'}:{display:"none"})}><span className='flex justify-center' >{(loading&&email&&password)?<ColorRing
             visible={true}
              height="40"
              width="40"
              ariaLabel="color-ring-loading"
              wrapperStyle={{}}
              wrapperClass="color-ring-wrapper"
              colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
              />:'Logout'
          }</span></div>
     <div className='h-[8vh] w-[100vw] bg-gray-800 flex justify-between text-white'>
      <p className='font-serif text-pretty text-2xl pl-7 relative top-[18%]'><span className='pl-8 italic items-baseline'>H</span><span className='pl-1 font-semibold'>m</span><span className='pl-1 italic items-baseline'>S</span></p>
      <button id='create' className='rounded-3xl w-[5vw] h-[5vh] border-x-2 border-y-2 border-none hover:border-white flex justify-center relative top-[18%] mr-[5%]'><Link to={"/create"}><MdCreate color='white' size={"32"}/></Link></button>
     </div>
     <div className='min-h-[92vh] w-[100vw]'>
      <div className='flex justify-center relative top-[6vh]'>
      <input type='text' placeholder='Enter The Product Name ' value={query} onChange={search}  className='border-x-2 border-y-2 border-black w-[30vw] h-[5vh] align-middle' id='search-input'/>
      <button className='w-[2.5vw] h-[5vh] ml-[1vw] rounded-full flex justify-center bg-red-500 p-[0.5vh] hover:bg-black transition-all' onClick={()=>{setquery('')}} id="cancel-button"><RxCross2 size={30} color='white'/></button>
      </div>
      { (products==null)? <div className='absolute top-[40vh] left-[45vw]'><BallTriangle
          height={150}
          width={150}
          radius={5}
          color="#4fa94d"
          ariaLabel="ball-triangle-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          /></div>
      :<div className='relative border-t-2 top-[10vh]'>
          <section className='flex justify-center'>
        <table id='table' className='w-[99vw] border-x-2 border-y-2 border-black'>
          <thead>
          <tr className='m-0 p-0 text-xl'>
            <th className='w-[5vw] border-r-2 border-black'>Sr.no</th>
            <th id='img-th' className='max-w-[5vw] border-x-2 border-black'>Image</th>
            <th className='w-[50vw] border-x-2 border-black'>Name</th>
            <th className='w-[15vw] border-x-2 border-black'>Price</th>
            <th className='w-[25vw] border-l-2 border-black'>Operations</th>
          </tr>
          </thead>
        <tbody>
            {
            (!query)?(
             products.map((data,index)=>(
               <tr key={index} className='border-y-2 border-black h-[6vh] text-x5 font-serif md:text-xs'>
                   <td className='border-x-2 border-black text-center'>{index+1}</td>
                   <td className='border-x-2 border-black transition-all'><img src={data.img} alt="" onMouseEnter={()=>imgscale(index)} onMouseLeave={()=>imgdescale(index)} id={`pd-img${index}`} className='product-img'/></td>
                   <td className='border-x-2 border-black'>{data.name}</td>
                   <td className='border-x-2 border-black text-center'>{`RS- ${data.price}`}</td>
                   <td id='logo' className='border-x-0 border-black flex justify-center'>
                   <Link to={`/info/${data._id}`}><button className='w-[3vw] ml-[3vw] relative top-1'><FaInfo size={22}/></button></Link> 
                   <Link to={`/edit/${data._id}`}><button className='w-[3vw] ml-[5vw] relative top-1'><FaUserEdit size={22}/></button></Link>  
                   <Link to={`/delete/${data._id}`}><button className='w-[3vw] ml-[5vw] relative top-1'><MdDelete size={22}/></button></Link> 
                   </td>
               </tr>
           
             ))):(
               searchdata.map((data,index)=>(
                 <tr key={index} className='border-y-2 border-black min-h-[5vh] text-x5 font-serif md:text-xs'>
                     <td className='border-x-2 border-black text-center'>{index+1}</td>
                     <td className='border-x-2 border-black transition-all '><img src={data.img} alt="" onMouseEnter={imgscale} onMouseLeave={imgdescale} id='pd-img' className='transition-all bg-contain w-[6vw] h-[6vh]' /></td>
                     <td className='border-x-2 border-black'>{data.name}</td>
                     <td className='border-x-2 border-black text-center'>{`RS- ${data.price}`}</td>
                     <td className='border-x-0 border-black flex justify-center'>
                       <button className='w-[3vw] ml-[3vw] relative top-1'><FaInfo size={22}/></button>
                       <button className='w-[3vw] ml-[5vw] relative top-1'><FaUserEdit size={22}/></button>
                       <button className='w-[3vw] ml-[5vw] relative top-1'><MdDelete size={22}/></button>
                     </td>
                 </tr>
             
               
               )))
           }
         </tbody>
          
          </table>
      </section>
      {
            (query&&searchdata.length==0)&&
            <div className='w-[26vw] h-[6vh] flex justify-center border-x-2 border-y-2 border-black align-middle absolute top-[20vh] left-[34vw] bg-yellow-300'>
               <h1 className='text-xl uppercase font-serif p-[1vh] '>product not found!</h1>
            </div>
        }
      
    
    </div>

        
      }
      
    
     </div>
    </div>
  )
}

export default Home
