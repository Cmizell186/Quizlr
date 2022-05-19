import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_all_quizzes } from "../../store/quizzes";
import { Link, useParams } from 'react-router-dom';
import { get_one_subject } from "../../store/subjects";


const QuizList = () =>{
    const dispatch = useDispatch();
    const quizzes = useSelector(state => Object.values(state.quizzes))
    const subject = useSelector(state => Object.values(state.subjects)[0])
    const {subjectId} = useParams()


    useEffect(() =>{
        dispatch(get_all_quizzes(subjectId))
        dispatch(get_one_subject(subjectId))
    }, [dispatch])

    return (
        <div className="user-page-container">
            <h1>{subject?.subject}</h1>
            <div className='user-quizzes'>
                {quizzes?.map((quiz) =>(
                    <div key={quiz?.id}  className="quiz-info-area">
                        <Link to={`/quiz/${quiz?.id}`}>
                            <div className='quiz-info-div'>
                                <p>{quiz?.flashcards.length} flashcards</p>
                                <p className='quiz-username'>{quiz?.user}</p>
                            </div>
                            <h3 className='quiz-title-slice'>{quiz?.title.slice(0,50)}</h3>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default QuizList;
