import { USER_ACTIONS_TYPES } from './user.types';

// initialState
const initialState = {
    currentUser: null,
    isLoading: false,
    error: null,
};

// reducer:

export const userReducer = ( state = initialState, action ) => {
    const { type, payload } = action;

    switch ( type ) {
        case USER_ACTIONS_TYPES.SIGN_IN_SUCCESS:
            return {
                ...state,
                currentUser: payload
            };
        case USER_ACTIONS_TYPES.SIGN_UP_START:
            return {
                ...state,
                isLoading: true,
            };
        case USER_ACTIONS_TYPES.SIGN_UP_SUCCESS:
            return {
                ...state,
                isLoading: false,
            };
        case USER_ACTIONS_TYPES.SIGN_OUT_SUCCESS:
            return {
                ...state,
                currentUser: null
            };
        case USER_ACTIONS_TYPES.SIGN_OUT_FAILED:
        case USER_ACTIONS_TYPES.SIGN_IN_FAILED:
        case USER_ACTIONS_TYPES.SIGN_UP_FAILED:
            return {
                ...state,
                isLoading: false,
                error: payload
            };
        default:
            return state;
    }

};



