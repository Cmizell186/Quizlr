 import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {useParams} from 'react-router-dom';
import { update_quiz } from "../../store/quizzes";
import Popup from "reactjs-popup";
import "./newQuizForm.css"

const EditQuizForm = ({quiz}) =>{
    // react hooks
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const {quizId} = useParams();


    // useStates
    const [title, setTitle] = useState(quiz?.title);
    const [description, setDescription] = useState(quiz.description);
    const [errors, setErrors] = useState([]);
    const [open, setOpen] = useState(false);


    const handleSubmit = async(e) =>{
        e.preventDefault();

        const editQuiz = {
            userId: sessionUser.id,
            title,
            description,
            id: quizId
        }

        const data = await dispatch(update_quiz(editQuiz))
        if(Array.isArray(data)){
            console.log(data)
            return setErrors(data)
        } else {
            setErrors([]);
            setTitle("");
            setDescription("");
            openModal();
        }
    }

    const openModal = () => setOpen(!open);

    return (
        <>
            <button onClick={openModal}>Edit Quiz</button>
            <Popup open={open} modal>
            <form className="edit-quiz-form"  onSubmit={e => handleSubmit(e)}>
                <input
                    id="edit-title"
                    type='text'
                    name='title'
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <input
                    id="edit-description"
                    type="text"
                    name="description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
                <button type="submit">edit quiz confirm</button>
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

export default EditQuizForm
