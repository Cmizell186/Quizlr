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

const createNewFlashcard = (flashcard) =>({
    type: POST_FLASHCARD,
    flashcard
})

// thunks
export const get_all_flashcards = (id) => async(dispatch) =>{
    const res = await fetch(`/api/flashcards/${id}`)

    if(res.ok){
        const flashcards = await res.json()
        dispatch(getFlashcards(flashcards.flashcards))
    }
}

export const post_new_flashcard = (flashcard, id) => async(dispatch) =>{
    const res = await fetch(`/api/flashcards/${id}`, {
        method: "POST",
        headers: {
            "Accept": 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(flashcard)
    })

    if(res.ok){
        const newFlashcard = await res.json()
        await dispatch(createNewFlashcard(newFlashcard))
        return newFlashcard
    } else {
        return "ERROR AT POST_NEW_FLASHCARD THUNK!@"
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
        case POST_FLASHCARD:
            newState = {...state, [action.flashcard.id]: action.flashcard}
            return newState;
        default:
            return state
    }
}

export default flashcardsReducer;
