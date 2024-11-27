import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Collection from './pages/Collection'
import Login from './pages/Login'
import PlaceOrder from './pages/PlaceOrder'
import Product from './pages/Product'
import Contact from './pages/Contact'
import About from './pages/About'
import Cart from './pages/Cart'
import Order from './pages/Order'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import Verify from './pages/Verify'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px [7vw] lg:px-[9vw ]'>
    <ToastContainer/>

       <Navbar/>
       <SearchBar/>
      <Routes>

        <Route path='/' element ={<Home/>}/>
        <Route path='/collection' element ={<Collection/>}/>
        <Route path='/cart' element ={<Cart/>}/>
        <Route path='/login' element ={<Login/>}/>
        <Route path='/orders' element ={<Order/>}/>
        <Route path='/Place-order' element ={<PlaceOrder/>}/>
        <Route path='/product/:productId' element ={<Product/>}/>
        <Route path='/about' element ={<About/>}/>
        <Route path='/contact' element ={<Contact/>}/>
        <Route path='/verify' element ={<Verify/>}/>
        





      </Routes>
      <Footer/>
    
    
    </div>
  )
}

export default App;