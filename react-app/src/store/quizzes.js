// constants
const GET_QUIZZES = 'quizzes/GET_QUIZZES';
const GET_ONE_QUIZ = 'quizzes/GET_ONE_QUIZ';
const POST_QUIZ = 'quizzes/POST_QUIZ';

// actions
const getQuizzes = (quizzes) => ({
    type: GET_QUIZZES,
    quizzes
})

const getOneQuiz = (quiz) =>({
    type: GET_ONE_QUIZ,
    quiz
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

export const get_one_quiz = (id) => async(dispatch) =>{
    const res = await fetch(`/api/quizzes/quiz/${id}`)

    if(res.ok){
        const quiz = await res.json();
        console.log(quiz.quiz, "FROM REACT THUNK");
        dispatch(getOneQuiz(quiz.quiz));
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
        case GET_ONE_QUIZ:
            return {
                [action.quiz.id]: {
                    ...state[action.quiz.id],
                    ...action.quiz
                }
            }
        default:
            return state
    }
}

export default quizReducer
