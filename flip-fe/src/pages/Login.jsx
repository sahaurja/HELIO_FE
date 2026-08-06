import { useState, useEffect } from "react"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify'
import { useNavigate } from "react-router-dom"

export default function Login (){

    const [loginCreds, setLoginCreds] = useState({
        username:"",
        password:""
    })

    //nav to different page
    const navigate = useNavigate()

    //check if alr logged in 
    useEffect(() => {
        async function fetchLoginStatus(){
            //change to ec2
            const login_res = await axios.get("http://18.117.115.172:8081/verifyUser", {withCredentials:true})
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
    const handleSubmit = async(e) => {
        e.preventDefault()
        //send to backend and get the jwt
        const res = await axios.post("http://18.117.115.172:8081/dologin", loginCreds, {withCredentials:true})
        console.log(res.data)
        if(res.data.success){
            window.location.reload()
            toast.success(`Welcome ${loginCreds.username}`)
            navigate("/flashcards"), 3000
            
        }
    }

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