import axios from "axios";
import { CONSTANTS } from "../Constants";

import { GET_SEARCHED_PROFILES, GET_SEARCH_NAME } from "./types";

// Get all homes
export const getSearchedProfiles = searchdata => dispatch => {
  axios
    .post(`${CONSTANTS.BACKEND_URL}/applicants/searchprofile`, searchdata)
    .then(res =>
      dispatch({
        type: GET_SEARCHED_PROFILES,
        payload: res.data
      })
    );
};

export const searchProfileFunc = nameData => async dispatch => {
  console.log(nameData);
  dispatch({
    type: GET_SEARCH_NAME,
    payload: nameData
  });
};

export const getSearchedProfilesRecruiter = searchdata => dispatch => {
  axios
    .post(`${CONSTANTS.BACKEND_URL}/applicants/searchprofile`, searchdata)
    .then(res =>
      dispatch({
        type: GET_SEARCHED_PROFILES,
        payload: res.data
      })
    );
};

export const searchProfileFuncRecruiter = nameData => async dispatch => {
  console.log(nameData);
  dispatch({
    type: GET_SEARCH_NAME,
    payload: nameData
  });
};
