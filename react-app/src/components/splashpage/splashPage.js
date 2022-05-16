import React from "react";
import "./splashPage.css";


const SplashPage = () =>{
    return (
        <>
            <div className="chris-image-container">
                <img  className="splash-image" src="https://onlysounds.s3.us-west-1.amazonaws.com/chris-splash-photo.png"/>
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
        </>
    )
}

export default SplashPage;
