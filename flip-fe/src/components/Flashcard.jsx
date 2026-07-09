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
    const [langData, setLangData] = useState({
        id_val : "",
        ilang: "",
        olang : ""
    })
    let currentCard = cardData.length > 0 ? cardData[currentIndex] : null;
    let front_value = currentCard ? currentCard["output_text"] : "No cards found";
    let back_value = currentCard ? currentCard["input_text"] : "No cards found";

    

    //fetch the flashcard data 
    const fetchCards = async(user_id, ilang_value, olang_value) => {
        const res = await axios.post("http://localhost:8081/generateflashcards", {
            id_val : user_id,
            ilang: ilang_value,
            olang : olang_value
        })
        console.log(res.data)
        setCardData(res.data)
        setLoading(false)
    }

    //fetch card data
    // useEffect( () => {
    //     fetchCards(0, "", "")
    // }, [])

    const handleLangSubmit = (e) => {
        e.preventDefault();
        fetchCards(langData.id_val, langData.ilang, langData.olang)
    }

    const handleValueChange = (e) => {
        setLangData({
            ...langData,
            [e.target.name] : e.target.value
        })
    }


    if (loading){
        return (
            <>
                <div className = "flashcard-container" style = {{zIndex:"1"}}>
                <div className = "flashcard">
                    <form className = "language_selector" onSubmit={(e) => {handleLangSubmit(e)}}>
                    <input name = "id_val" type = "number" placeholder="user id"  onChange={(e) => handleValueChange(e)}/>
                    <input name = "ilang" type = "text" placeholder = "input language" onChange={(e) => handleValueChange(e)}/>
                    <input name = "olang" type = "text" placeholder = "output language" onChange={(e) => handleValueChange(e)}/>
                    <input type = "submit" value = "Get flashcards"/>
                </form>
                <p>Fill Form to Get Flashcards</p>
                </div>
               
            </div>
            </>
        )
    }


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

    if(!loading){
        return(
            <>
                <div className = "flashcard-container" style = {{zIndex:"1"}}>
                    <form className = "language_selector" onSubmit={(e) => {handleLangSubmit(e)}}>
                        <input name = "id_val" type = "number" placeholder="user id" onChange={(e) => handleValueChange(e)}/>
                        <input name = "ilang" type = "text" placeholder = "input language" onChange={(e) => handleValueChange(e)}/>
                        <input name = "olang" type = "text" placeholder = "output language" onChange={(e) => handleValueChange(e)}/>
                        <input type = "submit" value = "Get flashcards"/>
                    </form>
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
            </>
        )
    }

}