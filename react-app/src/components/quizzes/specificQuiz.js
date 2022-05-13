import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { get_one_quiz } from "../../store/quizzes";

const SpecificQuiz = () =>{
    const dispatch = useDispatch();
    const quiz = useSelector(state => Object.values(state.quizzes)[0])
    const {quizId} = useParams()
    // console.log(useParams())


    useEffect(() =>{
        dispatch(get_one_quiz(quizId))
    },[dispatch])

    return (
        <>
            <div>
                <h1>{quiz?.title}</h1>
                <p>{quiz?.description}</p>
            </div>
        </>
    )
}

export default SpecificQuiz;
