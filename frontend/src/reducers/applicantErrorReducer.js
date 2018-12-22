import {APPLICANT_SIGNUP_ERROR_REDUCER,UPDATE_PROFILE_ERROR} from '../actions/types';

const initialState = {
    error: "",
    updateProfileError:""

};

export default function (state = initialState, action) {
    switch (action.type) {
        case APPLICANT_SIGNUP_ERROR_REDUCER:
            return {
                ...state,
                error: action.payload
            };
            case UPDATE_PROFILE_ERROR:
            return {
                ...state,
                updateProfileError: action.payload
            };
        default:
            return state;

    }

}