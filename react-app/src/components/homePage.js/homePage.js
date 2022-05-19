import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_quizzes } from "../../store/quizzes";
import { Link } from 'react-router-dom';
import "./homePage.css"
import SubjectList from "../subjects/subjects";



const HomePage = () =>{
    const dispatch = useDispatch()
    const quizzes = useSelector(state => Object.values(state.quizzes).slice(0,6))
    const randomQuizzes = quizzes[Math.floor(Math.random()*quizzes.length)]
    console.log(randomQuizzes)
    useEffect(() =>{
        dispatch(get_quizzes())
    }, [dispatch])


    return (
        <div className="home-container">
            <SubjectList/>
            <div className="welcome-quizlr">
                <h3 className="home-flashcards">Random Quiz!</h3>
                <Link to={`/quiz/${randomQuizzes?.id}`} className="home-quizzes" style={{marginBottom: "100px"}}>
                    <p>{randomQuizzes?.flashcards?.length} flashcards</p>
                    <h3 className="home-quiz-title">{randomQuizzes?.title}</h3>
                </Link>
            </div>
            <h2>Check out these quizzes!</h2>
            <div className="home-quiz-area">
                {quizzes?.map((quiz) =>(
                    <Link key={quiz?.id} to={`/quiz/${quiz?.id}`} className="home-quizzes">
                        <p className="home-flashcards">{quiz?.flashcards?.length} flashcards {quiz?.user}</p>
                        <h3 className="home-quiz-title">{quiz?.title}</h3>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default HomePage;
