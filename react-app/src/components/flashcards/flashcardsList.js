import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { get_all_flashcards } from "../../store/flashcards";
import { FlashcardArray } from "react-quizlet-flashcard";
import EditFlashcardForm from "./editFlashcardForm";

const FlashCardList = () => {
    const dispatch = useDispatch();
    const flashcards = useSelector(state => Object.values(state.flashcards))
    const {quizId} = useParams();
    const sessionUser = useSelector(state => state.session.user);


    useEffect(() =>{
        dispatch(get_all_flashcards(quizId))
    }, [dispatch])

    return (
        <>
            <div className="flashcard-carousel">
                <FlashcardArray cards={flashcards}/>
            </div>
            {flashcards.map(flashcard =>(
                <div key={flashcard?.id}>
                    <p>{flashcard?.front}</p>
                    <p>{flashcard?.back}</p>
                    {sessionUser?.id === flashcard?.user_id ? <EditFlashcardForm flashcard={flashcard}/> : <></>}
                </div>
            ))}
        </>
    )
}

export default FlashCardList;
