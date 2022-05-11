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
    qizzes: quiz
})

// thunks
export const get_all_quizzes = (id) => async(dispatch) =>{
    const res = await fetch(`/api/quizzes/${id}`)

    if(res.ok){
        const quizzes = await res.json();
        console.log(quizzes.quizzes)
        dispatch(getQuizzes(quizzes))
    }
}

export const post_new_quiz = () => async(dispatch) =>{
    const res = await fetch('/api/quizzes/')

    if(res.ok){
        const newQuiz = await res.json()
        console.log(newQuiz)
        dispatch()
    } else {
        return "error at post_new_quiz thunk!"
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
            newState = {};

        default:
            return state
    }
}

export default quizReducer
