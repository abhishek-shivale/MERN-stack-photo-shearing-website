import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './component/navbar.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import AddPhoto from './pages/AddPhoto.jsx'
import LikedPhoto from './pages/likedPhoto.jsx'
function App() {

  return (
    <>
   
    <div className='app'>

    </div>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/add-photo' element={<AddPhoto />} />
          <Route path='/liked-photo' element={<LikedPhoto />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
