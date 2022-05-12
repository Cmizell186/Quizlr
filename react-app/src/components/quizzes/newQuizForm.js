import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import { post_new_quiz } from '../../store/quizzes';


const NewQuizForm = () => {
    const dispatch = useDispatch();

    // useStates
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();

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

        await dispatch(post_new_quiz(newQuiz, subjectId))
    }

    return (
        <>
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
                placeholder='About This Quiz'
                onChange={e => setDescription(e.target.value)}
                value={description}
                />
                <button type='submit'> Create New </button>
            </form>
        </>
    )

}

export default NewQuizForm
