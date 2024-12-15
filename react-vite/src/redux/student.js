// import { csrfFetch } from "./csrf";

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
	const response = await fetch(`/api/students`);
    const data = await response.json();
    dispatch(setStudents(data));
    return data;
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