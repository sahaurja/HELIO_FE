import { useState, useEffect } from "react"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify'
import { useNavigate } from "react-router-dom"

export default function Login (){

    const [loginCreds, setLoginCreds] = useState({
        username:"",
        password:""
    })

    const BACKEND_URL = "https://helio-be.vercel.app"; 

    //nav to different page
    const navigate = useNavigate()

    //check if alr logged in 
    useEffect(() => {
        async function fetchLoginStatus(){
            const login_res = await axios.get(`${BACKEND_URL}/verifyUser`, {withCredentials:true})
            console.log(login_res.data.success)
            if(login_res.data.success){
                navigate("/flashcards")
            }
        }
        fetchLoginStatus()
    },[])

    //jwt token to be updated upon successful login 
    const [token, setToken] = useState("")

    //attempt to log the user in 
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    // Send to backend and get the jwt
    const res = await axios.post(`${BACKEND_URL}/dologin`, loginCreds, { withCredentials: true });
    console.log("Server response:", res.data); // This will now print if successful
    
    if (res.data.success) {
      toast.success(`Welcome ${loginCreds.username}`);
      setTimeout(() => {
        navigate("/flashcards");
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
        <>
            <form style = {{marginTop:"10px"}} onSubmit={(e) => handleSubmit(e)}>
                <input name = "username" type = "text" placeholder = "Username" value = {loginCreds.username} onChange = {(e) => setCredChange(e)}/>
                <br/>
                <input name = "password" type = "password"  value = {loginCreds.password}  placeholder = "Password" style={{marginTop:"5px"}}  onChange = {(e) => setCredChange(e)}/>
                <br/>
                <input type = "submit" value = "Log in" style={{marginTop:"5px"}}/>
            </form>
        </>
    )
}