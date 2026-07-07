//later, pass in the data as a prob per card 
import { useState, useEffect } from "react"
import axios from "axios"


export default function Flashcard(){

    const [isFlipped, setIsFlipped] = useState(false) //initially not flipped
    const [cardData, setCardData] = useState([])
    //side visible to users
    const [side, setSide] = useState(true)
    //specific flashcard we are on
    const [currentIndex, setCurrentIndex] = useState(0)
    //loading state
    const [loading, setLoading] = useState(true)

    //fetch the flashcard data 
    const fetchCards = async() => {
        const res = await axios.get("http://localhost:8081/getcards")
        console.log(res.data)
        setCardData(res.data)
        setLoading(false)
    }

    //fetch card data
    useEffect( () => {
        fetchCards()
    }, [])

    if (loading){
        return <p>Loading cards...</p>
    }

    //get current card's data
    let currentCard = cardData[currentIndex]
    let front_value = currentCard["output_text"] //question
    let back_value = currentCard["input_text"] //answer 

    const handleSide = (e) => {
        setSide(!side)
    }

    const handleMovement = (e, direction) => {
        if(direction == "front"){
            setCurrentIndex(currentIndex + 1)
        }
        else{
            setCurrentIndex(currentIndex - 1)
        }
        currentCard = cardData[currentIndex]
        front_value = currentCard["output_text"] //question
        back_value = currentCard["input_text"] //answer 
        setSide(true)

    }

    return(
        <>
            
            <div className = "wrapper" style = {{zIndex: "-1"}}>
            <div className = "flashcard-container" style = {{zIndex:"1"}}>
                <div className = "flashcard">
                    <div className = "flash-text">
                    {side && <div className = "front">
                        <p>{front_value}</p>
                    </div>}
                    {!side && <div className = "back">
                        <p>{back_value}</p>
                    </div>}
                    </div>
                </div>
                <div className="flash-actions">
                    <button style={{marginRight:"10px"}} onClick={(e) => handleMovement(e, "back")}>Back</button>
                    <button style={{marginRight:"10px"}} onClick={(e) => handleSide(e)}>Flip</button>
                    <button onClick={(e) => handleMovement(e, "front")}>Next</button>
                </div>

            </div>
            </div>


        </>
    )
}