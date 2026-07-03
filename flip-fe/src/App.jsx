import './App.css'
import Flashcard from './components/Flashcard'
import FlashcardView from './pages/FlashcardView'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

function App() {
  return (
    <>
      <Router>
          <Routes>
              <Route path = "/flashcards" element = {<Flashcard/>}/>
          </Routes>
      </Router>
    </>
  )
}

export default App
