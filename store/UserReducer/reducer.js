import {
    SET_ALL,
    SET_FULLNAME,
    SET_EMAIL,
    SET_DATE_OF_BIRTH,
    SET_PHONE,
    SET_ROLE,
    SET_ADDRESS,
    CLEAR_ALL,
    SET_ALL_EXCEPT_EMAIL,
} from "./constants";

export const initUserState = {
    id: null,
    fullName: null,
    email: null,
    dateOfBirth: null,
    phoneNumber: null,
    role: null,
    address: null,
};

const UserReducer = (state, action) => {
    switch (action.type) {
        case SET_FULLNAME:
            return {
                ...state,
                fullName: action.payload,
            };
        case SET_EMAIL:
            return {
                ...state,
                email: action.payload,
            };
        case SET_DATE_OF_BIRTH:
            return {
                ...state,
                dateOfBirth: action.payload,
            };
        case SET_PHONE:
            return {
                ...state,
                phoneNumber: action.payload,
            };
        case SET_ROLE:
            return {
                ...state,
                role: action.payload,
            };
        case SET_ADDRESS:
            return {
                ...state,
                address: action.payload,
            };
        case SET_ALL:
            return {
                ...state,
                ...action.payload,
            };
        case CLEAR_ALL:
            return { ...initUserState };
        default:
    }
};

export default UserReducer;
