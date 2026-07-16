import './App.css'
import Flashcard from './components/Flashcard'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Translator from './pages/Translator'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'

function App() {
  return (
    <>
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/flashcards" element={<Flashcard />} />
          <Route path="/translate" element={<Translator />} />
          <Route path = "/login" element = {<Login/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
