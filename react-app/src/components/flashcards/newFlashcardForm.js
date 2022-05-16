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
    const [errors, setErrors] = useState([]);
    const [open, setOpen] = useState(false);

    // useSelectors
    const sessionUser = useSelector(state => state.session.user);
    const {quizId} = useParams();


    // handle submit functions
    const handleSubmit = async(e) =>{
        e.preventDefault();

        const newFlashcard = {
            user_id: sessionUser.id,
            description,
            answer,
            quiz_id : quizId
        }

        const data = await dispatch(post_new_flashcard(newFlashcard, quizId))
        if(Array.isArray(data)){
            return setErrors(data)
        } else {
            setErrors([]);
            setAnswer("");
            setDescription("");
            openModal();
        }
    }

    const openModal = () => setOpen(!open);

    return (
        <>
            <button onClick={openModal}>New Flashcard</button>
            <Popup open={open} modal>
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
                    {errors &&
                    <div>
                        {errors.map((error, inx) =>(
                            <div key={inx}>{error}</div>
                        ))}
                    </div>
                    }
                </form>
            </Popup>
        </>
    )
}

export default NewFlashcardForm;