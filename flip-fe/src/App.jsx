import './App.css'
import FlashcardView from './pages/FlashcardView'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

function App() {
  return (
    <>
      <Router>
          <Routes>
              <Route path = "/flashcards" element = {<FlashcardView/>}/>
          </Routes>
      </Router>
    </>
  )
}

export default App
