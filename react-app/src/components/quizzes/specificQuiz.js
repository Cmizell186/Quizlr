import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { get_one_quiz, delete_quiz } from "../../store/quizzes";
import EditQuizForm from "./editQuizForm";
import NewFlashcardForm from "../flashcards/newFlashcardForm";


const SpecificQuiz = () =>{
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user)
    const quiz = useSelector(state => Object.values(state.quizzes)[0])
    const {quizId} = useParams()


    useEffect(() =>{
        dispatch(get_one_quiz(quizId))
    },[dispatch])

    const handleClick = () =>{
        dispatch(delete_quiz(quizId))
        return history.push('/')
    }
    return (
        <>
            <div>
                <h1>{quiz?.title}</h1>
                <p>{quiz?.description}</p>
            </div>
            {sessionUser.id == quiz?.user_id ?
             <EditQuizForm quiz={quiz}/>
            : <></>}
            {sessionUser.id == quiz?.user_id ?
            <button onClick={handleClick}>DELETE QUIZ</button>
            : <></>}
            {sessionUser.id == quiz?.user_id?
            <NewFlashcardForm/>
            : <></>
            }
        </>
    )
}

export default SpecificQuiz;
