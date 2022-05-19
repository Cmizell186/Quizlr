import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { get_one_quiz, delete_quiz } from "../../store/quizzes";
import EditQuizForm from "./editQuizForm";
import NewFlashcardForm from "../flashcards/newFlashcardForm";
import FlashCardList from "../flashcards/flashcardsList";


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
        return history.push(`/subject/${quiz.subject_id}`)
    }
    return (
        <>
            <div>
                <h1>{quiz?.title.slice(0,50)}</h1>
                <p>{quiz?.description}</p>
            </div>
            {sessionUser.id === quiz?.user_id ?
            <>
                <EditQuizForm quiz={quiz}/>
                <button onClick={handleClick}>DELETE QUIZ</button>
                <NewFlashcardForm/>
            </>
            : <></>}
            <div>
                <FlashCardList/>
            </div>
        </>
    )
}

export default SpecificQuiz;
