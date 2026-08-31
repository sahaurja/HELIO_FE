import { useState, useEffect } from "react"
import axios from "axios"
import { toast } from 'react-toastify'
import { useNavigate, Link } from "react-router-dom"

export default function Login (){

    const [loginCreds, setLoginCreds] = useState({
        username:"",
        password:""
    })

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    //nav to different page
    const navigate = useNavigate()

    //check if alr logged in
    useEffect(() => {
        async function fetchLoginStatus(){
            const login_res = await axios.get(`${BACKEND_URL}/verifyUser`, {withCredentials:true})
            if(login_res.data.success){
                navigate("/flashcards")
            }
        }
        fetchLoginStatus()
    },[])

    //attempt to log the user in
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${BACKEND_URL}/dologin`, loginCreds, { withCredentials: true });

            if (res.data.success) {
                toast.success(`Welcome ${loginCreds.username}`);
                setTimeout(() => {
                    navigate("/flashcards");
                    //auto reload to get new navbar
                    window.location.reload()
                }, 2000);
            } else {
                toast.error(res.data); // Shows "Invalid Password" or "Username not Registered"
            }
        } catch (err) {
            console.error("Login request completely failed:", err);
            toast.error("Network error: Could not connect to server.");
        }
    };

    //change username and password form values
    const setCredChange = (e) => {
        setLoginCreds({
            ...loginCreds,
            [e.target.name] : e.target.value
        })
    }

    return(
        <div className="flex justify-center items-center min-h-[70vh] px-4 font-[Figtree]">
            <form onSubmit={(e) => handleSubmit(e)} className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-8 flex flex-col gap-4">
                <div className="text-center mb-2">
                    <h1 className="text-2xl font-semibold text-gray-800">Welcome back</h1>
                    <p className="text-sm text-gray-500 mt-1">Log in to continue to Helio</p>
                </div>

                <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
                    Username
                    <input name = "username" type = "text" placeholder = "Username" value = {loginCreds.username} onChange = {(e) => setCredChange(e)} className="border border-gray-300 rounded-lg px-3 py-2 font-normal focus:outline-none focus:ring-2 focus:ring-yellow-500"/>
                </label>

                <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
                    Password
                    <input name = "password" type = "password" value = {loginCreds.password} placeholder = "Password" onChange = {(e) => setCredChange(e)} className="border border-gray-300 rounded-lg px-3 py-2 font-normal focus:outline-none focus:ring-2 focus:ring-yellow-500"/>
                </label>

                <input type = "submit" value = "Log in" className="mt-2 bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-lg px-4 py-2 transition-colors cursor-pointer"/>

                <p className="text-sm text-gray-500 text-center">
                    Don't have an account? <Link to="/register" className="text-yellow-600 hover:underline font-medium">Sign up</Link>
                </p>
            </form>
        </div>
    )
}
