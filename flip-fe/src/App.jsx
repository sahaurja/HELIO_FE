import './App.css'
import Flashcard from './components/Flashcard'
import Home from './pages/Home_Sections/Home'
import Navbar from './components/Navbar'
import Translator from './pages/Translator'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import RealNavbar from './components/RealNavbar'
import NavUsers from './components/NavUsers'
import { useState, useEffect } from 'react'
import axios from "axios"



function App() {
    const [loggedIn, setLoggedIn] = useState(false)
    //check if alr logged in, else redirect 
    useEffect(() => {
        async function fetchLoginStatus(){
            const login_res = await axios.get("http://localhost:8081/verifyUser", {withCredentials:true})
            // console.log(login_res.data.success)
            console.log(login_res.data)
            if(!login_res.data.success){
                navigate("/login")
            }
            else{
                setLoggedIn(true)
            }
        }
        console.log(fetchLoginStatus())
    },[])
  return (
    <>
      {!loggedIn ? <RealNavbar/> : <NavUsers/>}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/flashcards" element={<Flashcard />} />
          <Route path="/translate" element={<Translator />} />
          <Route path = "/login" element = {<Login/>}/>
        </Routes>
      </Router>
      <ToastContainer/>
    </>
  )
}

export default App
