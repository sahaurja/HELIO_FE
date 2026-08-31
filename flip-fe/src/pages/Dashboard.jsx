import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import { toast } from "react-toastify"

export default function Dashboard(){

    const [user, setUser] = useState(null)
    const navigate = useNavigate()
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

    //check if alr logged in, else redirect
    useEffect(() => {
        async function fetchUser(){
            const res = await axios.get(`${BACKEND_URL}/verifyUser`, { withCredentials: true })
            if(!res.data.success){
                navigate("/login")
            }
            else{
                setUser(res.data.user)
            }
        }
        fetchUser()
    }, [])

    const handleLogout = async () => {
        await axios.post(`${BACKEND_URL}/dologout`, {}, { withCredentials: true })
        toast.success("Successfully logged out")
        navigate("/login")
        window.location.reload()
    }

    if(!user){
        return null
    }

    return (
        <div className="flex justify-center py-10 px-4 font-[Figtree]">
            <div className="w-full max-w-lg flex flex-col gap-6">
                <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col gap-1">
                    <h1 className="text-2xl font-semibold text-gray-800">Hi, {user.username}</h1>
                    <p className="text-sm text-gray-500">{user.email}</p>
                </div>

                <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col gap-3">
                    <h2 className="text-lg font-medium text-gray-800">Quick links</h2>
                    <Link to="/flashcards" className="bg-gray-100 hover:bg-gray-200 rounded-lg px-4 py-3 text-gray-800 font-medium transition-colors">Study Flashcards</Link>
                    <Link to="/viewCards" className="bg-gray-100 hover:bg-gray-200 rounded-lg px-4 py-3 text-gray-800 font-medium transition-colors">My Cards</Link>
                    <Link to="/translate" className="bg-gray-100 hover:bg-gray-200 rounded-lg px-4 py-3 text-gray-800 font-medium transition-colors">Translator</Link>
                </div>

                <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg px-4 py-2 transition-colors">Sign out</button>
            </div>
        </div>
    )
}
