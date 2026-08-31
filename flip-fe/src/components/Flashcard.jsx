//later, pass in the data as a prob per card
import { useState, useEffect } from "react"
import axios from "axios"
import { Tooltip } from 'react-tooltip'
import { useNavigate } from "react-router-dom"

export default function Flashcard(){

    const [cardData, setCardData] = useState([])
    //side visible to users
    const [side, setSide] = useState(true) //true = front, false = back
    //specific flashcard we are on
    const [currentIndex, setCurrentIndex] = useState(0)
    //loading state
    const [loading, setLoading] = useState(true)
    const [langData, setLangData] = useState({
        id_val : "",
        ilang: "",
        olang : ""
    })
    const [imgUrl, setImgUrl] = useState("")

    const navigate = useNavigate()
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

    const currentCard = cardData.length > 0 ? cardData[currentIndex] : null
    const front_value = currentCard ? currentCard["output_text"] : "No cards found"
    const back_value = currentCard ? currentCard["input_text"] : "No cards found"
    const translator_id_value = currentCard ? currentCard["translator_id"] : "None"
    const pic_key = currentCard ? currentCard["picture_key"] : ""

    //check if alr logged in, else redirect
    useEffect(() => {
        async function fetchLoginStatus(){
            const login_res = await axios.get(`${BACKEND_URL}/verifyUser`, {withCredentials:true})
            if(!login_res.data.success){
                navigate("/login")
            }
            else{
                //store the id_value
                setLangData(prev => ({
                    ...prev,
                    id_val: login_res.data.user.user_id
                }))
            }
        }
        fetchLoginStatus()
    },[])

    //get the url for the image stored in s3
    useEffect(() => {
        if(pic_key == ""){
            setImgUrl("")
            return
        }
        async function getUrlValue(){
            const url_value = await axios.post(`${BACKEND_URL}/getCardImage`, {
                key:pic_key
            })
            setImgUrl(url_value.data)
        }
        getUrlValue()
    }, [pic_key])

    //fetch the flashcard data
    const fetchCards = async(ilang_value, olang_value) => {
        const res = await axios.post(`${BACKEND_URL}/generateflashcards`, {
            id_val : langData.id_val,
            ilang: ilang_value,
            olang : olang_value
        })
        setCardData(res.data)
        setCurrentIndex(0)
        setSide(true)
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
        await axios.post(`${BACKEND_URL}/addrating`, {
            id : translator_id,
            rating : curr_rating
        })
    }

    if (loading){
        return (
            <div className="flex justify-center py-16 px-4 font-[Figtree]">
                <form className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-6 flex flex-col gap-3" onSubmit={(e) => {handleLangSubmit(e)}}>
                    <h2 className="text-lg font-semibold text-gray-800">Get your flashcards</h2>
                    <input name = "ilang" type = "text" placeholder = "input language" onChange={(e) => handleValueChange(e)} className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"/>
                    <input name = "olang" type = "text" placeholder = "output language" onChange={(e) => handleValueChange(e)} className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"/>
                    <input type = "submit" value = "Get flashcards" className="mt-2 bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-lg px-4 py-2 transition-colors cursor-pointer"/>
                    <p className="text-sm text-gray-500 text-center">Fill the form to get flashcards</p>
                </form>
            </div>
        )
    }

    const handleSide = () => {
        setSide(!side)
    }

    const handleMovement = (direction) => {
        if(cardData.length === 0) return
        const nextIndex = direction === "front"
            ? (currentIndex + 1) % cardData.length
            : (currentIndex - 1 + cardData.length) % cardData.length
        setCurrentIndex(nextIndex)
        setSide(true)
    }

    return(
        <div className="flex flex-col items-center gap-6 py-10 px-4 font-[Figtree]">
            <form className="w-full max-w-md bg-white rounded-2xl shadow-md p-4 flex flex-col sm:flex-row gap-2" onSubmit={(e) => {handleLangSubmit(e)}}>
                <input name = "ilang" type = "text" placeholder = "input language" onChange={(e) => handleValueChange(e)} className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"/>
                <input name = "olang" type = "text" placeholder = "output language" onChange={(e) => handleValueChange(e)} className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"/>
                <input type = "submit" value = "Get flashcards" className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-lg px-4 py-2 transition-colors whitespace-nowrap cursor-pointer"/>
            </form>

            {/* flip card */}
            <div className="perspective-distant w-full max-w-md h-72">
                <div
                    className={`relative w-full h-full rounded-2xl transition-transform duration-700 ease-in-out transform-3d ${
                        side
                            ? "transform-[rotateY(0deg)] shadow-[10px_15px_30px_rgba(0,0,0,0.25)]"
                            : "transform-[rotateY(180deg)] shadow-[-10px_15px_30px_rgba(0,0,0,0.25)]"
                    }`}
                >
                    {/* front */}
                    <div className="absolute inset-0 backface-hidden rounded-2xl bg-white border border-gray-100 flex flex-col items-center justify-center gap-3 p-6 overflow-hidden">
                        <p className="text-xl font-medium text-gray-800 text-center">{front_value}</p>
                        {imgUrl && (
                            <img src={imgUrl} alt="flashcard" className="max-h-32 rounded-lg object-contain hover:scale-105 transition-transform"/>
                        )}
                    </div>
                    {/* back */}
                    <div className="absolute inset-0 backface-hidden transform-[rotateY(180deg)] rounded-2xl bg-yellow-50 border border-yellow-100 flex items-center justify-center p-6">
                        <p className="text-xl font-medium text-gray-800 text-center">{back_value}</p>
                    </div>
                </div>
            </div>

            {/* rating actions */}
            <div className="flex gap-6 items-center text-2xl">
                <a href = "#" data-tooltip-id = "rating-tip" data-tooltip-content = "Confident" data-tooltip-place = "top" onClick = {() => addRating(translator_id_value, 3)} className="hover:scale-125 transition-transform cursor-pointer">🙌</a>
                <a href = "#" data-tooltip-id = "rating-tip" data-tooltip-content = "Ok" data-tooltip-place = "top" onClick = {() => addRating(translator_id_value, 2)} className="hover:scale-125 transition-transform cursor-pointer">😑</a>
                <a href = "#" data-tooltip-id = "rating-tip" data-tooltip-content = "Confused" data-tooltip-place = "top" onClick = {() => addRating(translator_id_value, 1)} className="hover:scale-125 transition-transform cursor-pointer">☹️</a>
            </div>
            <Tooltip id = "rating-tip"/>

            {/* nav */}
            <div className="flex gap-3">
                <button onClick={() => handleMovement("back")} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg px-4 py-2 transition-colors">Back</button>
                <button onClick={handleSide} className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-lg px-4 py-2 transition-colors">Flip</button>
                <button onClick={() => handleMovement("front")} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg px-4 py-2 transition-colors">Next</button>
            </div>
        </div>
    )
}
