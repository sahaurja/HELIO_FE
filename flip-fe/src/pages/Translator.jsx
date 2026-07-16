import React, {Router} from 'react';
import './Translator.css'
// import Arrow from '../../public/arrow.png'
import {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom"
import axios from "axios"

function Translator() {
    const [entryText, setEntryText] = useState("");
    const [entryLanguage, setEntryLanguage] = useState("");
    const [outputLanguage, setOutputLanguage] = useState("");
    const [outputText, setOutputText] = useState("");

    const navigate = useNavigate()
    //check if alr logged in, else redirect 
    useEffect(() => {
        async function fetchLoginStatus(){
            const login_res = await axios.get("http://localhost:8081/verifyUser", {withCredentials:true})
            console.log(login_res.data.success)
            if(!login_res.data.success){
                navigate("/login")
            }
        }
        fetchLoginStatus()
    },[])

    useEffect(() => {
    if (!entryText || !entryLanguage || !outputLanguage) {
        return;
    }

    const translate = async () => {
        try {
            console.log({
            entryText,
            entryLanguage,
            outputLanguage,
        });
            const res = await fetch("http://localhost:8081/translateinto", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    input_text: entryText,
                    input_language: entryLanguage,
                    output_language: outputLanguage,
                }),
            });

            const data = await res.json();
            setOutputText(data.output_text);
        } catch (err) {
            console.error(err);
        }
    };

    translate();
}, [entryText, entryLanguage, outputLanguage]);


  return(
    <div className='gradient-background'>
<button type="button" className ='back-button'>
{/* <img className = "back-arrow" src={Arrow} alt="back-arrow" /> */}
</button>
<div className='translator-base'>
    <div className='translator-language-base'>
        <label>
            <select value={entryLanguage} onChange={(e) => setEntryLanguage(e.target.value)} className='translator-entry-language' defaultValue="Select Entry Language">
                <option value="">Select Entry Language</option>
                <option value="EN">English</option>
                <option value="FR">French</option>
                <option value="ES">Spanish</option>
            </select>
        </label>
        <label>
            <select value={outputLanguage} onChange={(e) => setOutputLanguage(e.target.value)} id="output-language" className='translator-output-language' defaultValue="Select Translated Language">
                <option value=""> Select Translated Language </option>
                <option value="EN">English</option>
                <option value="FR">French</option>
                <option value="ES">Spanish</option>
            </select>
        </label>
    </div>
    <div className="translator-text-base">
       <label> 
        <textarea value={entryText} onChange={(e) => setEntryText(e.target.value)} id="translation-entry" className='translator-entry' placeholder="Enter here:"></textarea>
       </label>
         <label> 
        <textarea value={outputText} readOnly className='translator-output' placeholder="Translation:"></textarea>
       </label>
    </div>
</div>
</div>
  )
}

export default Translator
