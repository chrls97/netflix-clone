import React from 'react'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import { Routes, Route } from 'react-router-dom'
import Player from './pages/Player/Player'


const app = () => {
  return (
    <div>
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
