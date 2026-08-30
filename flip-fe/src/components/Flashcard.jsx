//later, pass in the data as a prob per card 
import { useState, useEffect } from "react"
import axios from "axios"
import { Tooltip } from 'react-tooltip'
import { useNavigate } from "react-router-dom"




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
    let translator_id_value = currentCard ? currentCard["translator_id"] : "None";
    let pic_key = currentCard ? currentCard["picture_key"] : ""
    const [imgUrl, setImgUrl] = useState("")

    const navigate = useNavigate()
    //check if alr logged in, else redirect 
    useEffect(() => {
        async function fetchLoginStatus(){
            const login_res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/verifyUser`, {withCredentials:true})
            // console.log(login_res.data.success)
            console.log(login_res.data)
            if(!login_res.data.success){
                navigate("/login")
            }
            else{
                console.log(`id: ${login_res.data.user.user_id}`)
                //store the id_value 
                setLangData({
                    ...langData,
                    id_val:login_res.data.user.user_id
                })
                console.log(langData.id_val)
            }
        }
        fetchLoginStatus()
    },[])

    //get the url for the image stored in s3 
    useEffect(() => {
        if(pic_key == "") return
        async function getUrlValue(){
            const url_value = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/getCardImage`, {
                key:pic_key
            })
            setImgUrl(url_value.data)
        }
        getUrlValue()
    }, [pic_key])

    //fetch the flashcard data 
    const fetchCards = async(ilang_value, olang_value) => {
        //todo: replace with QUERY
        const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/generateflashcards`, {
            id_val : langData.id_val,
            ilang: ilang_value,
            olang : olang_value
        })
        console.log(res.data)
        setCardData(res.data)
        setLoading(false)
    }

    const handleLangSubmit = (e) => {
        e.preventDefault();
        fetchCards(langData.ilang, langData.olang)
    }

    const handleValueChange = (e) => {
        setLangData({
            ...langData,
            [e.target.name] : e.target.value
        })
    }

    //add most recent rating 
    //use translator id
    const addRating = async (translator_id, curr_rating) => {
        const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/addrating`, {
            id : translator_id,
            rating : curr_rating
        })
        console.log("Updataed rating")
    }


    if (loading){
        return (
            <>
                <div className = "flashcard-container" style = {{zIndex:"1"}}>
                <div className = "flashcard" style = {{margin : "10px"}}>
                    <form className = "language_selector" onSubmit={(e) => {handleLangSubmit(e)}}>
                    <input name = "ilang" type = "text" placeholder = "input language" onChange={(e) => handleValueChange(e)}/>
                    <input name = "olang" type = "text" placeholder = "output language" onChange={(e) => handleValueChange(e)}/>
                    <input type = "submit" value = "Get flashcards"/>
                </form>
                <p className = "font-[Figtree]">Fill Form to Get Flashcards</p>
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
        setSide(true)
    }

    if(!loading){
        return(
            <>
                <div className = "flashcard-container" style = {{zIndex:"1"}}>
                    <form className = "language_selector" onSubmit={(e) => {handleLangSubmit(e)}} style = {{margin : "10px"}}>
                        <input name = "ilang" type = "text" placeholder = "input language" onChange={(e) => handleValueChange(e)}/>
                        <input name = "olang" type = "text" placeholder = "output language" onChange={(e) => handleValueChange(e)}/>
                        <input type = "submit" value = "Get flashcards"/>
                    </form>
                    <div className = "flashcard">
                        <div className = "flash-text">
                        {side && <div className = "front">
                            <p className = "font-[Figtree]">{front_value}</p>
                            {/* add image if the link exists */}
                            {(pic_key != "") && <img src = {imgUrl} alt = "Image retieval error" className = "flash-pic hover:scale-120"/>}
                        </div>}
                        {!side && <div className = "back">
                            <p className = "font-[Figtree]">{back_value}</p>
                        </div>}
                        </div>
                        {/* add rating btns */}
                        <div className = "rating-actions flex gap-4 items-center">
                            <a href = "#" className = "rating-btn hover:animate-bounce inline-block" data-tooltip-id = "rating-tip" data-tooltip-content = "Confident" data-tooltip-place = "top" onClick = {(e) => addRating(translator_id_value, 3)}>🙌</a>
                            <a  href = "#" className = "rating-btn hover:animate-bounce inline-block" data-tooltip-id = "rating-tip" data-tooltip-content = "Ok" data-tooltip-place = "top" onClick = {(e) => addRating(translator_id_value, 2)}>😑</a>
                            <a  href = "#" className = "rating-btn hover:animate-bounce inline-block" data-tooltip-id = "rating-tip" data-tooltip-content = "Confused" data-tooltip-place = "top" onClick = {(e) => addRating(translator_id_value, 1)}>☹️</a>
                        </div>
                        <Tooltip id = "rating-tip"/>
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