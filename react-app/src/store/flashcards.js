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

const getOneFlashcard = (flashcard) =>({
    type: GET_ONE_FLASHCARD,
    flashcard
})

const createNewFlashcard = (flashcard) =>({
    type: POST_FLASHCARD,
    flashcard
})

const editFlashcard = (flashcard) =>({
    type: EDIT_FLASHCARD,
    flashcard
})

const deleteFlashcard = (id) =>({
    type: DELETE_FLASHCARD,
    flashcard_id: id
})

// thunks
export const get_all_flashcards = (id) => async(dispatch) =>{
    const res = await fetch(`/api/flashcards/${id}`)

    if(res.ok){
        const flashcards = await res.json()
        dispatch(getFlashcards(flashcards.flashcards))
    }
}

export const get_one_flashcard = (id) => async(dispatch) =>{
    const res = await fetch(`/api/flashcards/flashcard/${id}`)

    if(res.ok){
        const flashcard = await res.json()
        dispatch(getOneFlashcard(flashcard.flashcard))
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
    }else if (res.status < 500){
        const data = await res.json();
        if(data.error){
            return data.error
        }
    } else {
        return "ERROR AT POST_NEWFLASHCARD thunk"
    }
}

export const update_flashcard = (flashcard) => async(dispatch) =>{
    const res = await fetch (`/api/flashcards/flashcard/${flashcard.id}`, {
        method: "PUT",
        headers: {
            "Accept": 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(flashcard)
    })

    if (res.ok){
        const flashcard = await res.json()
        dispatch(editFlashcard(flashcard))
        return flashcard
    } else if (res.status < 500){
        const data = await res.json()
        if(data.error){
            return data.error
        }
    } else {
        return "ERROR AT UPDATE THUNK FOR FLASHCARDS!"
    }
}

export const delete_flashcard = (id) => async(dispatch) =>{
    const res = await fetch(`/api/flashcards/flashcard/${id}`, {
        method: "DELETE",
    })

    if(res.ok){
        dispatch(deleteFlashcard(id))
    } else {
        return "ERROR AT DELETE FLASHCARD THUNK"
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
        case GET_ONE_FLASHCARD:
            return {
                [action.flashcard.id]: {
                    ...state[action.flashcard.id],
                    ...action.flashcard
                }
            }
        case EDIT_FLASHCARD:
            return {
                ...state,
                [action.flashcard.id]: action.flashcard
            }
        case POST_FLASHCARD:
            newState = {...state, [action.flashcard.id]: action.flashcard}
            return newState;
        case DELETE_FLASHCARD:
            newState = {...state};
            delete newState[action.flashcard_id]
            return newState
        default:
            return state
    }
}

export default flashcardsReducer;
