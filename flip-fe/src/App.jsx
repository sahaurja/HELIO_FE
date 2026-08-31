import './App.css'
import Flashcard from './components/Flashcard'
import Home from './pages/Home_Sections/Home'
import Translator from './pages/Translator'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import { ToastContainer } from 'react-toastify';
import RealNavbar from './components/RealNavbar'
import NavUsers from './components/NavUsers'
import { useState, useEffect } from 'react'
import axios from "axios"
import FlashcardView from './pages/FlashcardView'



function App() {
    const [loggedIn, setLoggedIn] = useState(false)
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    //check if alr logged in, just for navbar display (individual protected pages redirect on their own)
    useEffect(() => {
        async function fetchLoginStatus(){
            const login_res = await axios.get(`${BACKEND_URL}/verifyUser`, {withCredentials:true})
            setLoggedIn(!!login_res.data.success)
        }
        fetchLoginStatus()
    },[])
  return (
    <>
      {!loggedIn ? <RealNavbar/> : <NavUsers/>}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/flashcards" element={<Flashcard />} />
          <Route path="/translate" element={<Translator />} />
          <Route path = "/login" element = {<Login/>}/>
          <Route path = "/register" element = {<Register/>}/>
          <Route path = "/dashboard" element = {<Dashboard/>}/>
          <Route path = "/viewCards" element = {<FlashcardView/>}/>
        </Routes>
      <ToastContainer/>
    </>
  )
}

export default App
