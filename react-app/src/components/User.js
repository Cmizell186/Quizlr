import React, { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import "./User.css"

function User() {
    const [user, setUser] = useState({});
    const { userId }  = useParams();
    const userQuizzes = user.quiz;


    // making the first letter in the email capital! and Splitting up the email
    const emailSplit = user?.email?.split('@')[0]
    const str1 = emailSplit?.charAt(0).toUpperCase()
    const str2 = emailSplit?.slice(1)
    const emailName = `${str1 + str2}`;


    useEffect(() => {
        if (!userId) {
        return;
        }
        (async () => {
        const response = await fetch(`/api/users/${userId}`);
        const user = await response.json();
        setUser(user);
        })();
    }, [userId]);

    if (!user) {
        return null;
    }

    return (
        <div className='user-page-container'>
            <div className='user-info'>
                <h3>{user?.username}</h3>
                <p className='user-email'>{emailName}</p>
            </div>
            <div className='user-quizzes'>
                {userQuizzes?.length === 0 ?
                    <div className='no-quizzes'>
                        <img alt="No sets found in library" src="https://assets.quizlet.com/a/j/dist/app/i/library/sets_empty.4533dc3cae314a7.svg"/>
                        <h3 className='not-created-h3'>Looks like you haven't created <br/>any quizzes yet!</h3>
                        <h4 className='not-created-h4'>Create quiz on any subject <br/> to start studying!</h4>
                    </div>

                : <></>}
                {userQuizzes?.map((quiz) =>(
                    <div key={quiz?.id} className="quiz-info-area">
                        <div className='quiz-info-div'>
                            <p>{quiz?.flashcards.length} Flashcards</p>
                            <p className='quiz-username'>{user.username}</p>
                        </div>
                        <NavLink to={`/quiz/${quiz?.id}`}>
                            <h3 className='quiz-title-slice'>{quiz?.title.slice(0,50)}</h3>
                        </NavLink>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default User;
