import React from "react";
import { Link} from 'react-router-dom';
import { useSelector } from "react-redux";

const SearchPageList = () =>{

    const searchedQuizzes = useSelector(state => Object.values(state.searchedFor))

    return(
        <div  className="user-page-container">
            <h1 style={{color:"rgb(66, 85, 255)"}} className="subject-title">Searched Page</h1>
            <div className="user-quizzes">
                {searchedQuizzes?.map((quiz) =>(
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

export default SearchPageList
