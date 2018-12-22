import axios from 'axios';
import jwt_decode from 'jwt-decode';
import {CONSTANTS} from '../Constants';

import {
    RECRUITER_PROFILE,
    JOB_GET_ERRORS,
    SET_RECRUITER_CURRENT_USER,
    RECRUITER_SIGNUP_ERROR_REDUCER

} from './types';

import setAuthToken from "../utils/setAuthToken";


//Recruiter login
export const recruiterLogin = (userData) => dispatch => {
    axios.defaults.withCredentials = true;
    
};



export const dispatchRecruiterSignupError = decoded => {
    return {
        type: RECRUITER_SIGNUP_ERROR_REDUCER,
        payload: decoded
    };
};