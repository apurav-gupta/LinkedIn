import axios from 'axios';

import {
  GET_ALL_CONNECTIONS,
  GET_PENDING_REQUESTS
  

} from './types';
import setAuthToken from "../utils/setAuthToken";
import { CONSTANTS } from "../Constants";


  // Get All Connections
  export const getConnections = (email) => dispatch => {
    axios.defaults.withCredentials = true;
  setAuthToken(localStorage.getItem("applicantToken"));
    axios
      .get(`${CONSTANTS.BACKEND_URL}/applicants/viewconnections/${email}`)
      .then(res =>
        dispatch({
          type: GET_ALL_CONNECTIONS,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ALL_CONNECTIONS,
          payload: null
        })
      );
  };

    // Get All Pending Requests
  export const getPendingRequets = (email) => dispatch => {
    axios.defaults.withCredentials = true;
  setAuthToken(localStorage.getItem("applicantToken"));
    axios
      .get(`${CONSTANTS.BACKEND_URL}/applicants/viewPendingRequests/${email}`)
      .then(res =>
        dispatch({
          type: GET_PENDING_REQUESTS,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: GET_PENDING_REQUESTS,
          payload: null
        })
      );
  };

  