import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';


const NewQuizForm = () => {

    // useStates
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();

    // useSelectors
    const sessionUser = useSelector(state => state.sessionUser.user);
    console.log(sessionUser)
    // useEffects


    // handle submit functions
    const handleSubmit = (e) =>{
        e.preventDefault();

        const newQuiz = (
            userId = sessionUser.id
        )
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
