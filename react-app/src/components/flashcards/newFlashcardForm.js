import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { post_new_flashcard } from "../../store/flashcards";
import Popup from "reactjs-popup";

const NewFlashcardForm = () =>{
    // react hooks
    const dispatch = useDispatch();

    // useStates
    const [description, setDescription] = useState("");
    const [answer, setAnswer] = useState("");

    // useSelectors
    const sessionUser = useSelector(state => state.session.user);
    const {quizId} = useParams();

    // useEffects


    // handle submit functions
    const handleSubmit = async(e) =>{
        e.preventDefault();

        const newFlashcard = {
            user_id: sessionUser.id,
            description,
            answer,
            quiz_id : quizId
        }

        dispatch(post_new_flashcard(newFlashcard, quizId))
    }


    return (
        <>
            <form className="new-flashcard-form" onSubmit={e => handleSubmit(e)}>
                <input
                    type='text'
                    name='description'
                    placeholder="Flashcard Question"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
                <input
                    type='text'
                    name='answer'
                    placeholder="Flashcard Question"
                    value={answer}
                    onChange={e => setAnswer(e.target.value)}
                />
                <button>submit new flashcard!</button>
            </form>
        </>
    )
}

export default NewFlashcardForm;
