import './App.css'
import Flashcard from './components/Flashcard'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Translator from './pages/Translator'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import RealNavbar from './components/RealNavbar'


function App() {
  return (
    <>
      <RealNavbar/>
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
