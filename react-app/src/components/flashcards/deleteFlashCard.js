import React from "react";
import { useDispatch } from "react-redux";
import { delete_flashcard } from "../../store/flashcards";

const DeleteFlashCard = ({flashcard}) => {
    const dispatch = useDispatch();

    const handleClick = () =>{
        dispatch(delete_flashcard(flashcard?.id))
    }

    return (
        <>
            <div>
                <div onClick={handleClick} className="fa-solid fa-trash-can"></div>
            </div>
        </>
    )
}

export default DeleteFlashCard;
