import axios from 'axios';

import {
  GET_ALL_RECRUITER_CONNECTIONS,
  GET_PENDING_RECRUITER_REQUESTS
  

} from './types';
import setAuthToken from "../utils/setAuthToken";
import { CONSTANTS } from "../Constants";


  // Get All Connections
  export const getRecruiterConnections = (email) => dispatch => {
    axios.defaults.withCredentials = true;
  setAuthToken(localStorage.getItem("recruiterToken"));
    axios
      .get(`${CONSTANTS.BACKEND_URL}/recruiters/viewconnections/${email}`)
      .then(res =>
        dispatch({
          type: GET_ALL_RECRUITER_CONNECTIONS,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ALL_RECRUITER_CONNECTIONS,
          payload: null
        })
      );
  };

    // Get All Pending Requests
  export const getRecruiterPendingRequets = (email) => dispatch => {
    axios.defaults.withCredentials = true;
  setAuthToken(localStorage.getItem("recruiterToken"));
    axios
      .get(`${CONSTANTS.BACKEND_URL}/recruiters/viewPendingRequests/${email}`)
      .then(res =>
        dispatch({
          type: GET_PENDING_RECRUITER_REQUESTS,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: GET_PENDING_RECRUITER_REQUESTS,
          payload: null
        })
      );
  };

  