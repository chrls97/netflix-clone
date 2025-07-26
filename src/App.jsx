import React, { useEffect } from 'react'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Player from './pages/Player/Player'
import { onAuthStateChanged } from 'firebase/auth' // Import onAuthStateChanged from Firebase Authentication
import { auth } from './firebase' // Import auth from firebase.js

//TOAST
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer for notifications
import 'react-toastify/dist/ReactToastify.css'; // Import Toast CSS



const app = () => {

  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged( auth, async (user) =>{
      if(user){
        console.log("User is logged in:", user);
        navigate('/'); // Redirect to home if user is logged in
      }else{
        console.log("No user is logged in");
        navigate('/login'); // Redirect to login if no user is logged in  
      }
    })
  }, [])

  return (
    <div>
      <ToastContainer /> {/* ToastContainer for notifications */}
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login/>} />
        <Route path="/player/:id" element={<Player/>} />
        <Route path="*" element={<Home/>} />
      </Routes>
    </div>
  )
}

export default app
