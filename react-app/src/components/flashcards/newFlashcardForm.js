import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { post_new_flashcard } from "../../store/flashcards";
import Popup from "reactjs-popup";
import "./flashcardList.css"

// react mui imports
import TextareaAutosize from '@mui/base/TextareaAutosize';

const NewFlashcardForm = () =>{
    // react hooks
    const dispatch = useDispatch();

    // useStates
    const [front, setFront] = useState("");
    const [back, setBack] = useState("");
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
            front,
            back,
            quiz_id : quizId
        }

        const data = await dispatch(post_new_flashcard(newFlashcard, quizId))
        if(Array.isArray(data)){
            return setErrors(data)
        } else {
            setErrors([]);
            setBack("");
            setFront("");
            openModal();
        }
    }

    const openModal = () => setOpen(!open);

    return (
        <>
            <div onClick={openModal} className="new-flashcard-btn">Add New Flashcard</div>
            <Popup open={open} modal>
                <form className="new-flashcard-form" onSubmit={e => handleSubmit(e)}>
                    <p style={{color:"black"}}>Create New Flashcard</p>
                    {/* <TextareaAutosize
                        aria-label="minimum height"
                        minRows={10}
                        placeholder="Front of flashcard"
                        style={{ width: 200, height: "200px" }}
                        value={front}
                        onChange={e => setFront(e.target.value)}
                    /> */}
                    <input
                        id="new-front"
                        type='text'
                        name='front'
                        placeholder="Flashcard Question"
                        value={front}
                        onChange={e => setFront(e.target.value)}
                    />
                    <input
                        id="new-back"
                        type='text'
                        name='back'
                        placeholder="Flashcard Answer"
                        value={back}
                        onChange={e => setBack(e.target.value)}
                    />
                    <button type="submit" id="confirm-edit-flashcard">submit new flashcard!</button>
                    {errors &&
                    <div>
                        {errors.map((error, inx) =>(
                            <div key={inx} style={{color:"red"}}>{error}</div>
                        ))}
                    </div>
                    }
                </form>
            </Popup>
        </>
    )
}

export default NewFlashcardForm;
