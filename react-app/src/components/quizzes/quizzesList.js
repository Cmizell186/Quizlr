import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_all_quizzes } from "../../store/quizzes";
import { Link, useParams } from 'react-router-dom';

const QuizList = () =>{
    const dispatch = useDispatch();
    const quizzes = useSelector(state => Object.values(state.quizzes))
    const {subjectId} = useParams()
    // console.log(subjectId)
    // console.log(quizzes)
    useEffect(() =>{
        dispatch(get_all_quizzes(subjectId))
    }, [dispatch])

    return (
        <>
            <div className="quiz-list">
                {quizzes.map((quiz) =>(
                    <div key={quiz.id}>
                        <Link to='/'>{quiz.title}</Link>
                    </div>
                ))}
            </div>
        </>
    )
}

export default QuizList;
