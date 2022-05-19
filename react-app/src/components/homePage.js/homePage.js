import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_quizzes } from "../../store/quizzes";
import { Link } from 'react-router-dom';
import "./homePage.css"



const HomePage = () =>{
    const dispatch = useDispatch()
    const quizzes = useSelector(state => Object.values(state.quizzes))
    console.log(quizzes)
    useEffect(() =>{
        dispatch(get_quizzes())
    }, [dispatch])


    return (
        <div className="home-container">
            <div className="welcome-quizlr">
                <h1>Quizlr home</h1>
                <h3>Check out these quizzes</h3>
            </div>
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
