import { useState } from "react"
import axios from "axios"

export default function EditFlashcardPopup({translator_id, init_input, init_output, init_pic}){

    const [selectedFile, setSelectedFile] = useState(null)
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const [flashcardValues, setFlashcardValues] = useState({
        input_text: init_input,
        output_text: init_output
    })

    const handleFormChange = (e) => {
        setFlashcardValues(
            {
                ...flashcardValues,
                [e.target.name] : e.target.value
            }
        )
    }

    //set image value 
    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0])
        console.log("Selected a file")
    }

    //submit the form to edit the data 
    const handleFormSubmit = async(e) => {
        e.preventDefault()
        let picture_key = init_pic
        //get the picture key if picture was uplaoded
        if(selectedFile != null){
            const formData = new FormData()
            formData.append("flash_image", selectedFile)
            //since there is an image, try to get the url
            try{
                picture_key = await axios.post(`${BACKEND_URL}/uploadImg`, formData)
                picture_key = picture_key.data
                console.log(picture_key)
            }
            catch{
                //nothing 
                console.log("No image url")
            }
        }
        try{
            //update request 
            const res = await axios.put(`${BACKEND_URL}/updateFlashcard`, {
            translator_id:translator_id,
            input_text:flashcardValues.input_text,
            output_text:flashcardValues.output_text,
            pic_key:picture_key
            })
        }
        catch (err){
            console.log(err)
        }

    }

    return(
        <>
            <div className = "border-solid mt-10 p-5 bg-white w-fit">
                <h3>Edit Flashcard</h3>
                <form className="flex flex-col mb-5" onSubmit={(e) => handleFormSubmit(e)}>
                    <input type = "text" name = "input_text" placeholder = "input text" className="w-100" value = {flashcardValues.input_text} onChange = {(e) => handleFormChange(e)}/>
                    <br/>
                    <input type = "text" name = "output_text" placeholder = "output text" className = "w-100" value = {flashcardValues.output_text} onChange = {(e) => handleFormChange(e)}/>
                    <br/>
                    <input type = "file" onChange={(e) => handleFileChange(e)}/>
                    <br/>
                    <input type = "submit" value = "Edit" className = "w-40" />
                </form>
            </div>
        </>
    )
}