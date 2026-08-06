import React, {Router} from 'react';
import './Translator.css'
import {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom"
import axios from "axios"

function Translator() {
    const [entryText, setEntryText] = useState("");
    const [entryLanguage, setEntryLanguage] = useState("");
    const [outputLanguage, setOutputLanguage] = useState("");
    const [outputText, setOutputText] = useState("");
    const [userid, setUserID] = useState("");
    //optional image selection
    const [selectedFile, setSelectedFile] = useState(null)

    const navigate = useNavigate()
    //check if alr logged in, else redirect 
    useEffect(() => {
        async function fetchLoginStatus(){
            const login_res = await axios.get("http://18.117.115.172:8081/verifyUser", {withCredentials:true})
            console.log(login_res.data.success)
            if(!login_res.data.success){
                navigate("/login")
            }
            else{
                setUserID(login_res.data.user.user_id)
            }
        }
        fetchLoginStatus()
    },[])
    
    //save the translated data to the db (modified for image)
    const save_translation = async () => {
        let picture_key = ""
        if(selectedFile != null){ //image was uploaded
            const formData = new FormData()
            formData.append("flash_image", selectedFile)
            //since there is an image, try to get the url
            try{
                picture_key = await axios.post("http://18.117.115.172:8081/uploadImg", formData)
                picture_key = picture_key.data
                console.log(picture_key)
            }
            catch{
                //nothing 
                console.log("No image url")
            }
        }
        else{
            console.log("No selected image value")
        }
        try {
            const res = await fetch("http://18.117.115.172:8081/translate", {
            method: "POST",
            headers: {
                    "Content-Type": "application/json",
                },
                //if there is no image, keep the url value as null
                body: JSON.stringify({
                    input_text: entryText,
                    input_language: entryLanguage,
                    output_language: outputLanguage,
                    output_text: outputText,
                    user_id: userid,
                    picture_key : picture_key
                }),
            });

            const data = await res.json();
            console.log(data);

        } catch (err) {
            console.error(err);
        }
    };

    //set image value 
    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0])
        console.log("Selected a file")
    }



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
         <button type="button" onClick={save_translation} className ="save-to-database-btn bg-yellow-500 mx-4 shadow-lg shadow-yellow-500/50 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-yellow-600"> Add translation to flashcards </button>
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
    {/* add image (optional) */}
    <input type="file" className = "flash-img" style = {{marginTop:"25px", marginBottom:"25px"}} onChange = {(e) => handleFileChange(e)}/>
</div>
</div>
  )
}

export default Translator
