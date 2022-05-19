// constants
const GET_SUBJECTS = 'subjects/GET_SUBJECTS';
const GET_ONE_SUBJECT = 'subjects/GET_ONE_SUBJECT'

// actions
const getSubject = (subjects) =>({
    type: GET_SUBJECTS,
    subjects
})

const getOneSubject = (subject) =>({
    type: GET_ONE_SUBJECT,
    subject
})

// thunks
export const get_all_subjects = () => async(dispatch) =>{
    const res = await fetch('/api/subjects/')

    if (res.ok){
        const subjects = await res.json();
        dispatch(getSubject(subjects));
    } else {
        return "ERROR AT SUBJECTSLIST THUNK"
    }
}

export const get_one_subject = (id) => async(dispatch) =>{
    const res = await fetch(`/api/subjects/${id}`)

    if(res.ok){
        const subject = await res.json();
        dispatch(getOneSubject(subject.subjects))
    } else {
        return "ERROR AT GETONE SUBJECT THUNK!"
    }
}

const initialState = {}
const subjectReducer = (state = initialState, action) =>{
    let newState;

    switch(action.type){
        case GET_SUBJECTS:
            newState = {};
            action.subjects.subjects.forEach((subject) => (newState[subject.id] = subject))
            return newState;
        case GET_ONE_SUBJECT:
            return {
                [action.subject.id]: {
                    ...state[action.subject.id],
                    ...action.subject
                }
            }
        default:
            return state;
    }
}

export default subjectReducer;
