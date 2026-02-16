import { csrfFetch } from "./csrf";

const SET_APPOINTMENTS = 'appointment/setAppointments';
const REMOVE_APPOINTMENTS = 'appointment/removeAppointments';
const SET_APPOINTMENT = 'appointment/setAppointment';
const ADD_APPOINTMENT = 'appointment/addAppointment';
const UPDATE_APPOINTMENT = 'appointment/updateAppointment';
const DELETE_APPOINTMENT = 'appointment/deleteAppointment';

const setAppointments = (appointments) => ({
    type: SET_APPOINTMENTS,
    appointments
});

const removeAppointments = () => ({
    type: REMOVE_APPOINTMENTS
});

const setAppointment = (appointment) => ({
    type: SET_APPOINTMENT,
    appointment
});

const addAppointment = (appointment) => ({
    type: ADD_APPOINTMENT,
    appointment
});

const updateAppointment = (appointment) => ({
    type: UPDATE_APPOINTMENT,
    appointment
});

const deleteAppointment = (appointmentId) => ({
    type: DELETE_APPOINTMENT,
    appointmentId
});

export const fetchAppointments = () => async (dispatch) => {
    const response = await csrfFetch(`/api/appointments`);

    if (response.ok) {
        const data = await response.json();
        dispatch(setAppointments(data));
        return data;
    } else {
        const errorObj = {};
        if (response.status < 500) {
            const errorMessages = await response.json();
            errorObj.errors = errorMessages;
        } else {
            errorObj.errors = { message: "Something went wrong. Please try again" };
        }
        return errorObj;
    }
};

export const fetchAppointment = (params) => async (dispatch) => {
    const { appointmentId } = params;
    const response = await csrfFetch(`/api/appointments/${appointmentId}`);

    if (response.ok) {
        const data = await response.json();
        dispatch(setAppointment(data));
        return data;
    } else {
        const errorObj = {};
        if (response.status < 500) {
            const errorMessages = await response.json();
            errorObj.errors = errorMessages;
        } else {
            errorObj.errors = { message: "Something went wrong. Please try again" };
        }
        return errorObj;
    }
};

export const createAppointment = (params) => async (dispatch) => {
    const { teacher_id, student_id, appointment_date, appointment_time, notes } = params;
    
    // Format time as HH:MM
    const timeStr = typeof appointment_time === 'string' ? appointment_time : 
                    appointment_time instanceof Date ? 
                    `${appointment_time.getHours().toString().padStart(2, '0')}:${appointment_time.getMinutes().toString().padStart(2, '0')}` :
                    appointment_time;
    
    // Format date as YYYY-MM-DD
    const dateStr = appointment_date instanceof Date ? 
                    appointment_date.toISOString().split('T')[0] : 
                    appointment_date;

    const response = await csrfFetch(`/api/appointments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            teacher_id,
            student_id,
            appointment_date: dateStr,
            appointment_time: timeStr,
            notes: notes || null
        })
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(addAppointment(data));
        return data;
    } else {
        const errorObj = {};
        if (response.status < 500) {
            const errorMessages = await response.json();
            errorObj.errors = errorMessages;
        } else {
            errorObj.errors = { message: "Something went wrong. Please try again" };
        }
        return errorObj;
    }
};

export const editAppointment = (params) => async (dispatch) => {
    const { appointmentId, teacher_id, student_id, appointment_date, appointment_time, notes } = params;
    
    // Format time as HH:MM
    const timeStr = typeof appointment_time === 'string' ? appointment_time : 
                    appointment_time instanceof Date ? 
                    `${appointment_time.getHours().toString().padStart(2, '0')}:${appointment_time.getMinutes().toString().padStart(2, '0')}` :
                    appointment_time;
    
    // Format date as YYYY-MM-DD
    const dateStr = appointment_date instanceof Date ? 
                    appointment_date.toISOString().split('T')[0] : 
                    appointment_date;

    const response = await csrfFetch(`/api/appointments/${appointmentId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            teacher_id,
            student_id,
            appointment_date: dateStr,
            appointment_time: timeStr,
            notes: notes || null
        })
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(updateAppointment(data));
        return data;
    } else {
        const errorObj = {};
        if (response.status < 500) {
            const errorMessages = await response.json();
            errorObj.errors = errorMessages;
        } else {
            errorObj.errors = { message: "Something went wrong. Please try again" };
        }
        return errorObj;
    }
};

export const removeAppointment = (params) => async (dispatch) => {
    const { appointmentId } = params;
    const response = await csrfFetch(`/api/appointments/${appointmentId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        dispatch(deleteAppointment(appointmentId));
        return { success: true };
    } else {
        const errorObj = {};
        if (response.status < 500) {
            const errorMessages = await response.json();
            errorObj.errors = errorMessages;
        } else {
            errorObj.errors = { message: "Something went wrong. Please try again" };
        }
        return errorObj;
    }
};

export const removeAppointmentsState = () => async (dispatch) => {
    dispatch(removeAppointments());
};

const initialState = {
    appointments: null,
    appointment: null
};

function appointmentReducer(state = initialState, action) {
    switch (action.type) {
        case SET_APPOINTMENTS:
            return { ...state, appointments: action.appointments };
        case REMOVE_APPOINTMENTS:
            return { ...state, appointments: null };
        case SET_APPOINTMENT:
            return { ...state, appointment: action.appointment };
        case ADD_APPOINTMENT:
            return {
                ...state,
                appointments: state.appointments
                    ? [...state.appointments, action.appointment].sort((a, b) => {
                        const dateA = new Date(`${a.appointment_date}T${a.appointment_time}`);
                        const dateB = new Date(`${b.appointment_date}T${b.appointment_time}`);
                        return dateA - dateB;
                    })
                    : [action.appointment]
            };
        case UPDATE_APPOINTMENT:
            return {
                ...state,
                appointments: state.appointments
                    ? state.appointments.map(apt => 
                        apt.id === action.appointment.id ? action.appointment : apt
                    ).sort((a, b) => {
                        const dateA = new Date(`${a.appointment_date}T${a.appointment_time}`);
                        const dateB = new Date(`${b.appointment_date}T${b.appointment_time}`);
                        return dateA - dateB;
                    })
                    : null
            };
        case DELETE_APPOINTMENT:
            return {
                ...state,
                appointments: state.appointments
                    ? state.appointments.filter(apt => apt.id !== action.appointmentId)
                    : null
            };
        default:
            return state;
    }
}

export default appointmentReducer;
