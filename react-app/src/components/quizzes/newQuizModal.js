import React, {useState} from "react";
import {Modal} from '../../context/Modal';
import NewQuizForm from "./newQuizForm.js";

const NewQuizModal = () =>{
    const [showModal, setShowModal] = useState(false);

    return(
        <div>
            <button onClick={() => setShowModal(true)} className="new-quiz-button">New Quiz</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <NewQuizForm />
                </Modal>
            )}
        </div>
    )
}

export default NewQuizModal;
