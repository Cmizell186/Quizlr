// constants
const GET_SUBJECTS = 'subjects/GET_SUBJECTS';

const getSubject = (subjects) =>({
    type: GET_SUBJECTS,
    subjects
})

export const subjectsList = () => async(dispatch) =>{
    const res = await fetch('/api/subjects', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
    })

    if (res.ok){
        const subjects = await res.json();
        dispatch(getSubject(subjects));
        return subjects
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
            action.subjects.forEach((subject) => (newState[subject.id] = subject))
            return newState;
        default:
            return state;
    }
}

export default subjectReducer;
