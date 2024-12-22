import { csrfFetch } from "./csrf";

const SET_STUDENTS = 'class/setStudents';
const REMOVE_STUDENTS = 'class/removeStudents';

const setStudents = (students) => ({
    type: SET_STUDENTS,
    students
  });
  
  const removeStudents = () => ({
    type: REMOVE_STUDENTS
  });
  

export const fetchStudents = () => async (dispatch) => {
	const response = await csrfFetch(`/api/students`);
    
    if (response.ok) {
        const data = await response.json();
        dispatch(setStudents(data));
        return data
    } else {
        const errorObj = {}
        if (response.status < 500) {
            const errorMessages = await response.json();
            errorObj.errors = errorMessages
        } else {
            errorObj.errors = { message: "Something went wrong. Please try again" }
        }
        return errorObj
    }
};

export const removeStudentsState = () => async (dispatch) => {
    dispatch(removeStudents());
};

const initialState = { 
    students: null,
};

function studentReducer(state = initialState, action) {
    switch (action.type) {
        case SET_STUDENTS:
            return { ...state, students: action.students };
        case REMOVE_STUDENTS:
            return { ...state, students: null };
        default:
            return state;
    }
}

export default studentReducer;