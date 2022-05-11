// constants
const GET_SUBJECTS = 'subjects/GET_SUBJECTS';

// actions
const getSubject = (subjects) =>({
    type: GET_SUBJECTS,
    subjects
})

// thunks
export const get_all_subjects = () => async(dispatch) =>{
    const res = await fetch('/api/subjects/')

    if (res.ok){
        const subjects = await res.json();
        console.log(subjects)
        dispatch(getSubject(subjects));
    } else {
        return "ERROR AT SUBJECTSLIST THUNK"
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
        default:
            return state;
    }
}

export default subjectReducer;
