import { useState } from "react"
import axios from "axios"

export default function Login (){

    const [loginCreds, setLoginCreds] = useState({
        username:"",
        password:""
    })

    const handleSubmit = async(e) => {
        e.preventDefault()
        //send to backend and get the jwt
        const res = await axios.post("http://localhost:8081/dologin", {
            username:loginCreds.username,
            password:loginCreds.password
        }, {withCredentials:true})
        console.log(res.data)
    }

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