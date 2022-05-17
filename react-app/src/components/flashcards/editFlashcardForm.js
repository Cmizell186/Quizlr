import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { update_flashcard } from "../../store/flashcards";
import Popup from "reactjs-popup";

const EditFlashcardForm = ({flashcard}) =>{
    // react hooks
    const dispatch = useDispatch();

    // useStates
    const [front, setFront] = useState("");
    const [back, setBack] = useState("");
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
            <button onClick={openModal}>Edit Flashcard</button>
            <Popup open={open} modal>
                <form className="new-flashcard-form" onSubmit={e => handleSubmit(e)}>
                    <input
                        type='text'
                        name='front'
                        placeholder="Flashcard Question"
                        value={front}
                        onChange={e => setFront(e.target.value)}
                    />
                    <input
                        type='text'
                        name='back'
                        placeholder="Flashcard Answer"
                        value={back}
                        onChange={e => setBack(e.target.value)}
                    />
                    <button>Confirm Edit</button>
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

export default EditFlashcardForm;
