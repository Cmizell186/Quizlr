import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import { post_new_quiz } from '../../store/quizzes';
import Popup from 'reactjs-popup';
// import 'reactjs-popup/dist/index.css';
import "./newQuizForm.css"



const NewQuizForm = () => {
    // react hooks
    const dispatch = useDispatch();

    // useStates
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState([]);
    const [open, setOpen] = useState(false);
    // useSelectors
    const sessionUser = useSelector(state => state.session.user);
    const {subjectId} = useParams()
    // console.log(subjectId)
    // console.log(sessionUser)
    // useEffects


    // handle submit functions
    const handleSubmit = async (e) =>{
        e.preventDefault();

        const newQuiz = {
            userId: sessionUser.id,
            title,
            description,
            subject_id: subjectId
        }

        const data = await dispatch(post_new_quiz(newQuiz, subjectId))
        if (Array.isArray(data)){
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
            <button onClick={openModal}>Open modal</button>
            <Popup open={open} modal>
                <form className='new-quiz-form' onSubmit={e => handleSubmit(e)}>
                    <input
                    type='text'
                    name='title'
                    placeholder='Quiz Title'
                    onChange={e => setTitle(e.target.value)}
                    value={title}
                    />
                    <input
                    type='text'
                    name='description'
                    placeholder='Description of quiz'
                    onChange={e => setDescription(e.target.value)}
                    value={description}
                    />
                    <button type='submit'> Create New </button>
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

export default NewQuizForm
