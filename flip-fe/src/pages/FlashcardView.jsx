import Flashcard from "../components/Flashcard"
import AllFlashcards from "./AllFlashcards"
import { useNavigate } from "react-router-dom"
import {useState, useEffect} from "react"
import axios from "axios"
import SmallFlashcard from "../components/SmallFlashcard"
 
export default function FlashcardView(){

    const [userId, setUserId] = useState(null)
    
    //store all of the user's flashcards 
    const [allCards, setAllCards] = useState([])

    const navigate = useNavigate()
    //check if alr logged in, else redirect 
    useEffect(() => {
        async function fetchLoginStatus(){
            const login_res = await axios.get("http://18.117.115.172:8081/verifyUser", {withCredentials:true})
            // console.log(login_res.data.success)
            console.log(login_res.data)
            if(!login_res.data.success){
                navigate("/login")
            }
            else{
                console.log(`id: ${login_res.data.user.user_id}`)
                //store user identity 
                setUserId(login_res.data.user.user_id)
            }
        }
        fetchLoginStatus()
    },[])

    //get all the card values given the id 
    useEffect( () => {
        async function fetchAllCards(){
            if(userId != null){
                console.log("fetching cards")
                const res = await axios.post("http://18.117.115.172:8081/fetchCards",{
                    id_val : userId
                })
                setAllCards(res.data)
            }
        }
        fetchAllCards()
    }, [userId])

    return(
        <>
            <h1 className = "text-center font-[Figtree]">View all Your Flashcards in One Place</h1>
            {/* map the data from allCards */}
            {allCards.map(card => 
                <div key = {card.translator_id}>
                    <SmallFlashcard translator_id = {card.translator_id} input_text={card.input_text} picture_key={card.picture_key} output_text={card.output_text}/>
                    <br/>
                </div>
            )}
        </>
    )
}