import React, {useEffect, useRef, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { get_all_flashcards } from "../../store/flashcards";
import { FlashcardArray } from "react-quizlet-flashcard";
import EditFlashcardForm from "./editFlashcardForm";
import DeleteFlashCard from "./deleteFlashCard";
import "./flashcardList.css"

const FlashCardList = () => {
    const dispatch = useDispatch();
    const [cardNumber, setCardNumber] = useState(0)
    const flashcards = useSelector(state => Object.values(state.flashcards))
    const {quizId} = useParams();
    const sessionUser = useSelector(state => state.session.user);
    const arrayRef = useRef({});


    useEffect(() =>{
        dispatch(get_all_flashcards(quizId))
    }, [dispatch, quizId])

    const handleClick = (cardNum) =>{
        arrayRef.current.prevCard()
        let newSpot = cardNum - 1
        return newSpot
    }


    return (
        <div className="flashcardList-main-div">
            <div className="flashcard-carousel">
                <FlashcardArray
                cards={flashcards}
                forwardRef={arrayRef}
                count={true}
                onCardChange={(cardNumber) => setCardNumber(cardNumber)}
                />
            </div>
            <div className="amount-flashcards">
                <p>{flashcards?.length} Flashcards</p>
            </div>
            {flashcards.map(flashcard =>(
                <div key={flashcard?.id} className="flashcard-individual">
                    <div className="flashcard-front-back-div">
                        <p className="front-flashcard">{flashcard?.front}</p>
                        <p className="back-flashcard">{flashcard?.back}</p>
                    </div>
                    {sessionUser?.id === flashcard?.user_id ?
                    <div className="flashcard-edit-delete-div">
                        <EditFlashcardForm flashcard={flashcard}/>
                        <div onClick={() => handleClick(cardNumber)}>
                            <DeleteFlashCard flashcard={flashcard}/>
                        </div>
                    </div>
                     : <></>}
                </div>
            ))}
        </div>
    )
}

export default FlashCardList;
