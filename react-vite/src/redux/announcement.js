import { csrfFetch } from "./csrf";

const SET_ANNOUNCEMENTS = 'announcement/setAnnouncements';
const REMOVE_ANNOUNCEMENTS = 'announcement/removeAnnouncements';
const SET_ANNOUNCEMENT = 'announcement/setAnnouncement';
// const REMOVE_ANNOUNCEMENT = 'announcement/removeAnnouncement';
const ADD_ANNOUNCEMENT = 'announcement/addAnnouncement';
const UPDATE_ANNOUNCEMENT = 'announcement/updateAnnouncement';
const DELETE_ANNOUNCEMENT = 'announcement/deleteAnnouncement';

const setAnnouncements = (announcements) => ({
    type: SET_ANNOUNCEMENTS,
    announcements
});

const removeAnnouncements = () => ({
    type: REMOVE_ANNOUNCEMENTS
});

const setAnnouncement = (announcement) => ({
    type: SET_ANNOUNCEMENT,
    announcement
});

// const removeAnnouncement = () => ({
//     type: REMOVE_ANNOUNCEMENT
// });

const addAnnouncement = (announcement) => ({
    type: ADD_ANNOUNCEMENT,
    announcement
});

const updateAnnouncement = (announcement) => ({
    type: UPDATE_ANNOUNCEMENT,
    announcement
});

const deleteAnnouncement = (announcementId) => ({
    type: DELETE_ANNOUNCEMENT,
    announcementId
});

export const fetchAnnouncements = () => async (dispatch) => {
    const response = await csrfFetch(`/api/announcements`);

    if (response.ok) {
        const data = await response.json();
        dispatch(setAnnouncements(data));
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

export const createAnnouncement = (params) => async (dispatch) => {
    const { title, content, image_url } = params;
    const response = await csrfFetch(`/api/announcements`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title,
            content,
            image_url
        })
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(addAnnouncement(data));
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

export const editAnnouncement = (params) => async (dispatch) => {
    const { announcementId, title, content, image_url } = params;
    const response = await csrfFetch(`/api/announcements/${announcementId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title,
            content,
            image_url
        })
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(updateAnnouncement(data));
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

export const removeAnnouncement = (params) => async (dispatch) => {
    const { announcementId } = params;
    const response = await csrfFetch(`/api/announcements/${announcementId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        dispatch(deleteAnnouncement(announcementId));
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

export const removeAnnouncementsState = () => async (dispatch) => {
    dispatch(removeAnnouncements());
};

// export const removeAnnouncementState = () => async (dispatch) => {
//     dispatch(removeAnnouncement());
// };

const initialState = {
    announcements: null,
    announcement: null
};

function announcementReducer(state = initialState, action) {
    switch (action.type) {
        case SET_ANNOUNCEMENTS:
            return { ...state, announcements: action.announcements };
        case REMOVE_ANNOUNCEMENTS:
            return { ...state, announcements: null };
        case SET_ANNOUNCEMENT:
            return { ...state, announcement: action.announcement };
        // case REMOVE_ANNOUNCEMENT:
        //     return { ...state, announcement: null };
        case ADD_ANNOUNCEMENT:
            return {
                ...state,
                announcements: state.announcements
                    ? [action.announcement, ...state.announcements]
                    : [action.announcement]
            };
        case UPDATE_ANNOUNCEMENT:
            return {
                ...state,
                announcements: state.announcements
                    ? state.announcements.map(ann => 
                        ann.id === action.announcement.id ? action.announcement : ann
                    )
                    : null
            };
        case DELETE_ANNOUNCEMENT:
            return {
                ...state,
                announcements: state.announcements
                    ? state.announcements.filter(ann => ann.id !== action.announcementId)
                    : null
            };
        default:
            return state;
    }
}

export default announcementReducer;
