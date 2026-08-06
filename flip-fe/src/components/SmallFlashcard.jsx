import axios from "axios";
import { useState, useEffect } from "react";
import { BsThreeDots } from "react-icons/bs";
import EditFlashcardPopup from "./EditFlashcardPopup";
import CardProgress from "./CardProgress";

export default function SmallFlashcard({ translator_id, input_text, picture_key, output_text }) {
  const show_img = picture_key !== "";
  const [imgUrl, setImgUrl] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [showProgress, setShowProgress] = useState(false)

  const handleShowEdit = () => {
    setShowEdit(!showEdit);
  };

  const handleShowProgress = () => {
    setShowProgress(!showProgress)
  }

  useEffect(() => {
    async function getUrlValue() {
      if (show_img) {
        try {
          const url_value = await axios.post("http://18.117.115.172:8081/getCardImage", { key: picture_key });
          setImgUrl(url_value.data);
        } catch (err) {
          console.log("Error fetching image");
        }
      }
    }
    getUrlValue();
  }, [show_img, picture_key]);

  return (
    <>
      <div className="grid grid-cols-2 divide-x divide-gray-400 border-solid border-gray-400">
        <div className="flex flex-col items-center">
          <p className="text-center">{input_text}</p>
          {show_img && <img src={imgUrl} alt="flashcard image" className="h-48 w-96 object-contain" />}
        </div>
        <div className="relative">
          {/* Main Dropdown Container */}
          <div className="group relative inline-block">
            {/* REMOVED: group-focus-within:pointer-events-none */}
            <button className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm font-medium shadow-xs hover:bg-gray-100">
              <BsThreeDots />
            </button>
            
            {/* Dropdown Menu */}
            <div className="rounded-md border border-gray-200 bg-white p-1 shadow-md grid min-w-40 absolute right-0 mt-2 opacity-0 pointer-events-none transition-opacity group-focus-within:opacity-100 group-focus-within:pointer-events-auto z-10">
              {/* CHANGED: Using button instead of anchor tag for onClick actions */}
              <button 
                type="button"
                className="text-left rounded-md px-2.5 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 w-full" 
                onClick={handleShowEdit}
              >
                Edit
              </button>
              <button 
                type="button"
                className="text-left rounded-md px-2.5 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 w-full"
                onClick = {handleShowProgress}
              >
                View Progress
              </button>
            </div>
          </div>
          <p className="text-center">{output_text}</p>
        </div>
      </div>
      {showEdit && <EditFlashcardPopup translator_id = {translator_id} init_input = {input_text} init_output={output_text} init_pic={picture_key}/>}
      {showProgress && <CardProgress translator_id = {translator_id}/>}
    </>
  );
}
