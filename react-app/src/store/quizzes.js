// constants
const GET_QUIZZES = 'quizzes/GET_QUIZZES';
const POST_QUIZ = 'quizzes/POST_QUIZ';

// actions
const getQuizzes = (quizzes) => ({
    type: GET_QUIZZES,
    quizzes
})

const createNewQuiz = (quiz) => ({
    type: POST_QUIZ,
    quiz
})

// thunks
export const get_all_quizzes = (id) => async(dispatch) =>{
    const res = await fetch(`/api/quizzes/${id}`)

    if(res.ok){
        const quizzes = await res.json();
        // console.log(quizzes.quizzes)
        dispatch(getQuizzes(quizzes))
    }
}

export const post_new_quiz = (quiz,id) => async(dispatch) =>{
    const res = await fetch(`/api/quizzes/${id}`, {
        method: "POST",
        headers: {
            "Accept": 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(quiz)
    })

    if(res.ok){
        const newQuiz = await res.json()
        await dispatch(createNewQuiz(newQuiz))
        return newQuiz
    } else if (res.status < 500){
        const data = await res.json();
        if(data.error){
            return data.error
        }
    } else {
        return 'Error at post_new_quiz thunk'
    }
}

const initialState = {}
const quizReducer = (state = initialState, action) =>{
    let newState;

    switch(action.type){
        case GET_QUIZZES:
            newState = {};
            action.quizzes.quizzes.forEach((quiz) => (newState[quiz.id] = quiz))
            return newState
        case POST_QUIZ:
            newState = {...state, [action.quiz.id]: action.quiz};
            return newState
        default:
            return state
    }
}

export default quizReducer
