import { useState } from "react"
import axios from "axios"
import { toast } from 'react-toastify'
import { useNavigate, Link } from "react-router-dom"

export default function Register (){

    const [creds, setCreds] = useState({
        username:"",
        email:"",
        password:""
    })

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate()

    const setCredChange = (e) => {
        setCreds({
            ...creds,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${BACKEND_URL}/register`, creds);

            //the backend sends back a plain error string on failure, or a db result object on success
            if (typeof res.data === "string") {
                toast.error(res.data);
            } else {
                toast.success("Account created! Please log in.");
                setTimeout(() => {
                    navigate("/login");
                }, 1500);
            }
        } catch (err) {
            console.error("Register request failed:", err);
            toast.error("Network error: Could not connect to server.");
        }
    };

    return(
        <div className="flex justify-center items-center min-h-[70vh] px-4 font-[Figtree]">
            <form onSubmit={(e) => handleSubmit(e)} className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-8 flex flex-col gap-4">
                <div className="text-center mb-2">
                    <h1 className="text-2xl font-semibold text-gray-800">Create an account</h1>
                    <p className="text-sm text-gray-500 mt-1">Sign up to start using Helio</p>
                </div>

                <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
                    Username
                    <input name = "username" type = "text" placeholder = "Username" value = {creds.username} onChange = {(e) => setCredChange(e)} className="border border-gray-300 rounded-lg px-3 py-2 font-normal focus:outline-none focus:ring-2 focus:ring-yellow-500"/>
                </label>

                <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
                    Email
                    <input name = "email" type = "email" placeholder = "Email" value = {creds.email} onChange = {(e) => setCredChange(e)} className="border border-gray-300 rounded-lg px-3 py-2 font-normal focus:outline-none focus:ring-2 focus:ring-yellow-500"/>
                </label>

                <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
                    Password
                    <input name = "password" type = "password" value = {creds.password} placeholder = "Password" onChange = {(e) => setCredChange(e)} className="border border-gray-300 rounded-lg px-3 py-2 font-normal focus:outline-none focus:ring-2 focus:ring-yellow-500"/>
                </label>

                <input type = "submit" value = "Sign up" className="mt-2 bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-lg px-4 py-2 transition-colors cursor-pointer"/>

                <p className="text-sm text-gray-500 text-center">
                    Already have an account? <Link to="/login" className="text-yellow-600 hover:underline font-medium">Log in</Link>
                </p>
            </form>
        </div>
    )
}
