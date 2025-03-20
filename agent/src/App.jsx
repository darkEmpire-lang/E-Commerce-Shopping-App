import React, { useEffect, useState } from 'react'
import NavBar from './component/NavBar'
import Sidebar from './component/Sidebar'
import {Routes,Route} from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'
import AssignedOrders from './pages/AssignedOrders'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddDeliveryOfficer from './pages/AddDeliveryOfficer '
import DeliveryOfficerPage from './pages/DeliveryOfficerPage'
import DeliveryAgentLogin from './component/DeliveryAgentLogin'
import DeliveryAgentDashboard from './pages/DeliveryAgentDashboard'
import UpdateProfile from './pages/UpdateProfile'


export const backendUrl=import.meta.env.VITE_BACKEND_URL
export const currency ='$'
const App = () => {

  const [token,setToken]=useState(localStorage.getItem('token')?localStorage.getItem('token'):'');


  useEffect(()=>{

    localStorage.setItem('token',token)


  },[token])


  return (


    <div className='bg-gray-50 min-h-screen'>

      <ToastContainer/>

      {token ===""
      ? <DeliveryAgentLogin setToken={setToken}/> 
      : <>

      <NavBar setToken={setToken}/>
      <hr />
      <div className='flex w-full'>
  
        <Sidebar/>
  
        <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
  
  
        
          <Routes>
  
          <Route path='/add' element ={<Add token={token}/>}/>
          <Route path='/list' element ={<List token={token}/>}/>
          <Route path='/orders' element ={<Orders token={token}/>}/>
          <Route path='/delivery' element ={<AssignedOrders token={token}/>}/>
          <Route path='/agent' element ={<AddDeliveryOfficer token={token}/>}/>
          <Route path='/agents' element ={<DeliveryOfficerPage token={token}/>}/>
          <Route path='/dashboard' element ={<DeliveryAgentDashboard token={token}/>}/>
           <Route path='/update' element ={<UpdateProfile token={token}/>}/>
  
  
         </Routes>
  
  
  
  
  
  
        </div>
  
  
  
        
      </div>
  
      
      
      
  
      </>
       }
  

    </div>
  )
}

export default App