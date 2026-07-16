import axios from "axios"
import { toast } from "react-toastify"


export default function Navbar() {


    const handleLogout = async(e) => {
        const res = await axios.post("http://localhost:8081/dologout", {}, {withCredentials:true})
        if(res.data.success){
            toast.success("Successfully logged out")
        }
    }

    return(
        <>
            <nav>
                <a href = "/">Home</a>
                <br/>
                <a href = "/flashcards">Flashcards</a>
                <br/>
                <a href = "/translate">Translator</a>
                <br/>
                <a href = "/login">Login</a>
                <br/>
                <button style = {{marginTop:"5px"}} onClick = {(e) => handleLogout(e)}>Logout</button>
            </nav>
        </>
    )
}