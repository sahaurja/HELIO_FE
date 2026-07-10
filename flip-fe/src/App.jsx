import './App.css'
import Flashcard from './components/Flashcard'
import Home from './pages/Home'
import FlashcardView from './pages/FlashcardView'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

function App() {
  return (
    <>
      <Router>
          <Routes>
              <Route path = "/" element = {<Home/>}/>
              <Route path = "/flashcards" element = {<Flashcard/>}/>
          </Routes>
      </Router>
    </>
  )
}

export default App
