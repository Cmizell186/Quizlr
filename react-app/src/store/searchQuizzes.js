import quizReducer from "./quizzes"

// constants
const SEARCH_QUIZ = 'quizzes/SEARCH_QUIZ'
// actions
const searchQuiz = (searchedFor) =>({
    type: SEARCH_QUIZ,
    searchedFor
})
// thunks
export const search_quizzes = (searched) => async(dispatch)=>{
    const res = await fetch(`/api/quizzes/search`, {
        method: "POST",
        headers:{
            "Accept": 'application/json',
            "Content-Type": "application/json",
        },
        body: JSON.stringify(searched)
    })

    if(res.ok){
        const quizzesSearched = await res.json()
        dispatch(searchQuiz(quizzesSearched))
        console.log(quizzesSearched, "quizzesSearched")
    } else if (res.status < 500){
        const data = await res.json();
        if(data.error){
            return data.error
        }
    } else {
        return "ERROR AT SEARCH QUIZ THUNK"
    }
}
// reducer
const initialState = {}
const searchReducer = (state = initialState, action) =>{
    let newState;

    switch(action.type){
        case SEARCH_QUIZ:
            newState = {};
            action.searchedFor.searched_for.forEach((quiz) => (newState[quiz.id] = quiz))
            return newState
        default:
            return state
    }
}

export default searchReducer
