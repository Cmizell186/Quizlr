import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { get_all_flashcards } from "../../store/flashcards";
import { FlashcardArray } from "react-quizlet-flashcard";

const FlashCardList = () => {
    const dispatch = useDispatch();
    const flashcards = useSelector(state => Object.values(state.flashcards))
    const {quizId} = useParams();

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
                </div>
            ))}
        </>
    )
}

export default FlashCardList;
