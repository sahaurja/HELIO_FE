//later, pass in the data as a prob per card 
import { useState } from "react"
//for flipping 


export default function Flashcard(){

    const [isFlipped, setIsFlipped] = useState(false) //initially not flipped

    return(
        <>
            <div className = "wrapper" style = {{zIndex: "-1"}}>
            <div className = "flashcard-container" style = {{zIndex:"1"}}>
                <div className = "flashcard">
                    <div className = "flash-text">
                    <div className = "front">
                        <p>Input</p>
                    </div>
                    <div className = "back">
                        <p>Translated</p>
                    </div>
                    </div>
                </div>
                <div className="flash-actions">
                    <button style={{marginRight:"10px"}}>Flip</button>
                    <button>Next</button>
                </div>

            </div>
            </div>


        </>
    )
}