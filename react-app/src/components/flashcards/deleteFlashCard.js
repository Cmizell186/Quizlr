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
                <button onClick={handleClick}>Delete Flash Card</button>
            </div>
        </>
    )
}

export default DeleteFlashCard;
