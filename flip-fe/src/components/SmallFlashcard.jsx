import axios from "axios";
import { useState, useEffect } from "react";
import { BsThreeDots } from "react-icons/bs";
import EditFlashcardPopup from "./EditFlashcardPopup";
import "./ProgressPopup.css";
import { BarChart } from "@mui/x-charts/BarChart";

export default function SmallFlashcard({
  translator_id,
  input_text,
  picture_key,
  output_text,
}) {
  const show_img = picture_key !== "";

  const [imgUrl, setImgUrl] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [ratings, setRatings] = useState([]);

  const handleShowEdit = () => {
    setShowEdit(!showEdit);
  };

  const handleShowProgress = async () => {
    setShowProgress(!showProgress);

    if (!showProgress) {
      try {
        const res = await fetch(
          `http://localhost:8081/getratings?translator_id=${translator_id}`
        );

        const data = await res.json();

        setRatings(data.ratings);
      } catch (err) {
        console.error("Error fetching ratings:", err);
      }
    }
  };

  useEffect(() => {
    async function getUrlValue() {
      if (show_img) {
        try {
          const url_value = await axios.post(
            "http://localhost:8081/getCardImage",
            { key: picture_key }
          );

          setImgUrl(url_value.data);
        } catch (err) {
          console.log("Error fetching image");
        }
      }
    }

    getUrlValue();
  }, [show_img, picture_key]);

  // 1, 2, 3, 4, ...
  const practiceNumbers = ratings.map((_, index) => index + 1);

  // The actual ratings: 1, 2, 3, 4, 5, etc.
  const ratingValues = ratings.map((item) => item.curr_rating);

  return (
    <>
      <div className="grid grid-cols-2 divide-x divide-gray-400 border-solid border-gray-400">
        
        <div className="flex flex-col items-center">
          <p className="text-center">{input_text}</p>

          {show_img && (
            <img
              src={imgUrl}
              alt="flashcard image"
              className="h-48 w-96 object-contain"
            />
          )}
        </div>

        <div className="relative">
          
          <div className="group relative inline-block">
            
            <button className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm font-medium shadow-xs hover:bg-gray-100">
              <BsThreeDots />
            </button>

            <div className="rounded-md border border-gray-200 bg-white p-1 shadow-md grid min-w-40 absolute right-0 mt-2 opacity-0 pointer-events-none transition-opacity group-focus-within:opacity-100 group-focus-within:pointer-events-auto z-10">
              
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
                onClick={handleShowProgress}
              >
                View Progress
              </button>

            </div>
          </div>

          <p className="text-center">{output_text}</p>
        </div>
      </div>

      {showEdit && (
        <EditFlashcardPopup
          translator_id={translator_id}
          init_input={input_text}
          init_output={output_text}
          init_pic={picture_key}
        />
      )}

      {showProgress && (
        <>
          <div className="modal" id="modal">

            <div className="modal-header">

              <div className="title">
                Progress
              </div>

              <button
                type="button"
                className="close-button"
                onClick={handleShowProgress}
              >
                &times;
              </button>

            </div>

            <div className="modal-body">

              {ratings.length === 0 ? (
                <p>No ratings yet.</p>
              ) : (
                <BarChart
                  xAxis={[
                    {
                      data: practiceNumbers,
                      label: "Practice Attempt",
                    },
                  ]}
                  yAxis={[
                    {
                      min: 0,
                      max: 5,
                      tickNumber: 5,
                      label: "Rating",
                    },
                  ]}
                  series={[
                    {
                      data: ratingValues,
                      label: "Rating",
                    },
                  ]}
                  height={300}
                />
              )}

            </div>
          </div>

          <div
            id="overlay"
            className="active"
            onClick={handleShowProgress}
          ></div>
        </>
      )}
    </>
  );
}