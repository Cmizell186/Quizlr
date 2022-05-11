// constants
const GET_QUIZZES = 'quizzes/GET_QUIZZES';

// actions
const getQuizzes = (quizzes) => ({
    type: GET_QUIZZES,
    quizzes
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

const initialState = {}
const quizReducer = (state = initialState, action) =>{
    let newState;

    switch(action.type){
        case GET_QUIZZES:
            newState = {};
            action.quizzes.quizzes.forEach((quiz) => (newState[quiz.id] = quiz))
            return newState
        default:
            return state
    }
}

export default quizReducer
