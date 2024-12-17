// import { csrfFetch } from "./csrf";

const SET_CLASS = 'class/setClass';
const REMOVE_CLASS = 'class/removeClass';
const SET_CLASSES = 'class/setClasses';
const REMOVE_CLASSES = 'class/removeClasses';
// const ADD_ASSIGNMENT = 'class/addAssignment';

const setClass = (class_) => ({
    type: SET_CLASS,
    class_
  });
  
  const removeClass = () => ({
    type: REMOVE_CLASS
  });
  
  const setClasses = (classes) => ({
    type: SET_CLASSES,
    classes
  });
  
  const removeClasses = () => ({
    type: REMOVE_CLASSES
  });

//   const addAssignment = (assignment) => ({
//     type: REMOVE_CLASSES,
//     assignment
//   });
  
    
// Classes
export const fetchClasses = () => async (dispatch) => {
	const response = await fetch(`/api/classes`);
    const data = await response.json();
    dispatch(setClasses(data));
    return data;
};

export const fetchClass = (params) => async (dispatch) => {
    const { classId } = params
	const response = await fetch(`/api/classes/${classId}`);
    const data = await response.json();
    dispatch(setClass(data));
    return data;
};

export const createClass = (params) => async (dispatch) => {
	const response = await fetch("/api/classes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params)
      });
    const data = await response.json();
    dispatch(setClasses(data));
    return data;
};

export const editClass = (params) => async (dispatch) => {
    const { classId, name, subject, grade, period, room } = params;
	const response = await fetch(`/api/classes/${classId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name,
            subject,
            grade,
            period,
            room
        })
      });
    const data = await response.json();
    dispatch(setClasses(data));
    return data;
};

export const deleteClass = (params) => async (dispatch) => {
    const { classId } = params;
	const response = await fetch(`/api/classes/${classId}`, {
        method: "DELETE"
      });
    const data = await response.json();
    dispatch(setClasses(data));
    return data;
};

export const removeClassesState = () => async (dispatch) => {
    dispatch(removeClasses());
};

export const removeClassState = () => async (dispatch) => {
    dispatch(removeClass());
};


//Students
export const addStudent = (params) => async (dispatch) => {
    const { classId, studentId } = params;
	const response = await fetch(`/api/classes/${classId}/students/${studentId}`, {method: "POST"});
    const data = await response.json();
    dispatch(setClass(data))
    return data;
};

export const removeStudent = (params) => async (dispatch) => {
    const { classId, studentId } = params;
	const response = await fetch(`/api/classes/${classId}/students/${studentId}`, {method: "DELETE"});
    const data = await response.json();
    dispatch(setClass(data))
    return data;
};


// Assignments
export const createAssignment = (params) => async (dispatch) => {
    const { classId, name, type, quarter, dueDate } = params;
	const response = await fetch(`/api/classes/${classId}/assignments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name, 
            type,
            quarter,
            due_date: dueDate
        })
      });
    const data = await response.json();
    dispatch(setClass(data))
    return data;
};

export const editAssignment = (params) => async (dispatch) => {
    const { assignmentId, name, type, quarter, dueDate } = params;
	const response = await fetch(`/api/assignments/${assignmentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name, 
            type,
            quarter,
            due_date: dueDate
        })
      });
    const data = await response.json();
    dispatch(setClass(data))
    return data;
};

export const deleteAssignment = (params) => async (dispatch) => {
    const { assignmentId } = params;
	const response = await fetch(`/api/assignments/${assignmentId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      });
    const data = await response.json();
    dispatch(setClass(data))
    return data;
};


// Grades
export const createGrade = (params) => async (dispatch) => {
    const { assignmentId, studentId, grade } = params;
	const response = await fetch(`/api/assignments/${assignmentId}/grades`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            student_id: studentId, 
            grade
        })
      });
    const data = await response.json();
    dispatch(setClass(data))
    return data;
};

export const editGrade = (params) => async (dispatch) => {
    const { assignmentId, studentId, grade } = params;
	const response = await fetch(`/api/assignments/${assignmentId}/grades`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            student_id: studentId, 
            grade
        })
      });
    const data = await response.json();
    dispatch(setClass(data))
    return data;
};

export const deleteGrade = (params) => async (dispatch) => {
    const { assignmentId, studentId } = params;
	const response = await fetch(`/api/assignments/${assignmentId}/grades`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            student_id: studentId
        })
      });
    const data = await response.json();
    dispatch(setClass(data))
    return data;
};


const initialState = { 
    class: null,
    classes: null, 
};

function classReducer(state = initialState, action) {
    switch (action.type) {
        case SET_CLASS:
            return { ...state, class: action.class_ };
        case REMOVE_CLASS:
            return { ...state, class: null };
        case SET_CLASSES:
            return { ...state, classes: action.classes };
        case REMOVE_CLASSES:
            return { ...state, classes: null };
        // case ADD_ASSIGNMENT:
        //     const classEdit = state.class.assignments.push(action.assignment)
        //     return { ...state, class: classEdit };
        default:
            return state;
    }
}

export default classReducer;