// constants
const GET_FLASHCARDS ='flashcards/GET_FLASHCARDS';
const GET_ONE_FLASHCARD = 'flashcards/GET_ONE_FLASHCARD';
const POST_FLASHCARD = 'flashcards/POST_FLASHCARD';
const EDIT_FLASHCARD = 'flashcards/EDIT_FLASHCARD';
const DELETE_FLASHCARD = 'flashcards/DELETE_FLASHCARD';

// actions
const getFlashcards = (flashcards) =>({
    type: GET_FLASHCARDS,
    flashcards
})

// thunks
export const get_all_flashcards = (id) => async(dispatch) =>{
    const res = await fetch(`/api/flashcards/${id}`)

    if(res.ok){
        const flashcards = await res.json()
        dispatch(getFlashcards(flashcards.flashcards))
    }
}


// reducer
const initialState = {};
const flashcardsReducer = (state = initialState, action) =>{
    let newState;

    switch(action.type){
        case GET_FLASHCARDS:
            newState = {};
            action.flashcards.forEach((flashcard) => (newState[flashcard.id] = flashcard))
            return newState;
        default:
            return state
    }
}

export default flashcardsReducer;
