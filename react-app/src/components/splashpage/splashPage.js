import React from "react";
import "./splashPage.css";




const SplashPage = () =>{
    return (
        <>
            <div className="chris-image-container">
                <img  className="splash-image" src="./images/chris-splash-photo.png"/>
            </div>
            <div className="text-splash-area">
                <h1 style={{color: 'white', fontSize:'32px'}}>
                    Learn it. Own it.
                    Quizlr.
                </h1>
                <p style={{color: 'white', fontWeight: 'bold', fontSize: '20px'}} className='splash-description'>
                    Enjoy a clean layout, with a swift and engaging study process.
                    Start creating quizzes and flash cards now.
                </p>
            </div>

            <div className="splash-page-content">
                <div className="info-splash-area">
                    <p className="students-who-use">
                        <em id="id90em">90%</em>
                        of the students who use Quizlr report higher grades.
                    </p>
                </div>
                <div className="flashcards-on-area">
                    <div className="flashcards-image">
                        <img height="400" src="https://images.prismic.io/quizlet-prod/d4052d90-f71e-466a-86f5-080cf02de2da_20210814_QZ_Home_Flashcards.png?auto=compress,format&rect=0,2,3072,2395&w=1026&h=800 1x, https://images.prismic.io/quizlet-prod/d4052d90-f71e-466a-86f5-080cf02de2da_20210814_QZ_Home_Flashcards.png?auto=compress,format&rect=0,2,3072,2395&w=1026&h=800 2x"/>
                    </div>
                    <div className="flashcards-splash-desc">
                        <h2 id="flashcard-info-h2">Flashcards on repeat. Study modes on shuffle.</h2>
                        <p id="flashcard-info-p">Mixed with smart study tools, our flashcards have been helping students ace their toughest exams since 2005.</p>
                    </div>
                </div>
                <div className="jam-on-area">
                    <div className="jam-image">
                        <img height="400" width="514" src="./images/razer-nommo-chroma.png"/>
                    </div>
                    <div className="jam-splash-desc">
                        <h2 id="flashcard-info-h2">Whether you plan or cram, find your study jam.</h2>
                        <p id="flashcard-info-p">Early morning? All-nighter? With teaching methods backed by learning science, Quizlr is designed to save you time.</p>
                    </div>
                </div>
            </div>
            <div className="bottom-splash-page">
                <div className="my-links">
                    <p>Created by Christopher Mizell</p>
                    <a href="https://github.com/Cmizell186" className='fa-brands fa-github fa-2x'></a>
                    <a href="https://www.linkedin.com/in/christopher-mizell-4b21a4174/" className='fa-brands fa-linkedin fa-2x'></a>
                </div>
            </div>
        </>
    )
}

export default SplashPage;
