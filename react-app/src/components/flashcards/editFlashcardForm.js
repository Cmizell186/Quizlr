import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { update_flashcard } from "../../store/flashcards";
import Popup from "reactjs-popup";
import "./form.css"

const EditFlashcardForm = ({flashcard}) =>{
    // react hooks
    const dispatch = useDispatch();

    // useStates
    const [front, setFront] = useState(flashcard?.front);
    const [back, setBack] = useState(flashcard?.back    );
    const [errors, setErrors] = useState([]);
    const [open, setOpen] = useState(false);

    // useSelectors
    const sessionUser = useSelector(state => state.session.user);



    // handle submit functions
    const handleSubmit = async(e) =>{
        e.preventDefault();

        const editFlashcard = {
            user_id: sessionUser.id,
            front,
            back,
            id: flashcard?.id
        }

        const data = await dispatch(update_flashcard(editFlashcard))
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
            <div onClick={openModal} className="fa-solid fa-pen"></div>
            <Popup open={open} modal>
                <form className="edit-flashcard-form" onSubmit={e => handleSubmit(e)}>
                    <h4 style={{color:"black"}}>Edit Flashcard</h4>
                    <input
                        id="edit-front"
                        type='text'
                        name='front'
                        placeholder="Flashcard Question"
                        value={front}
                        onChange={e => setFront(e.target.value)}
                    />
                    <input
                        id="edit-back"
                        type='text'
                        name='back'
                        placeholder="Flashcard Answer"
                        value={back}
                        onChange={e => setBack(e.target.value)}
                    />
                    <button type="submit" id="confirm-edit-flashcard">Confirm Edit</button>
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

export default EditFlashcardForm;
