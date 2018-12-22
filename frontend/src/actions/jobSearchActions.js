import setAuthToken from "../utils/setAuthToken";
import axios from "axios";
import { CONSTANTS } from "../Constants";

import { JOB_ID_DISPLAY, SEARCHED_JOB_LIST } from "./types";

// export const searchProperty = searchData => async dispatch => {
//   console.log("Inside display property after search");
//   console.log(searchData.location);
//   const response = await axios.post(
//     `${ROOT_URL}/api/properties/searchProperties`,
//     searchData
//   );
//   console.log(response.data);
//   dispatch({
//     type: DISPLAY_SEARCHED_PROPERTIES,
//     payload: response.data
//   });
// };

export const jobSearchFunc = jobListData => async dispatch => {
  console.log("Inside job list after search");
  axios.defaults.withCredentials = true;
  setAuthToken(localStorage.getItem("applicantToken"));
  axios
    .get(`${CONSTANTS.BACKEND_URL}/jobs/jobSearch`, {
      params: {
        jobname: jobListData.jobname,
        joblocation: jobListData.joblocation
      }
    })
    .then(res =>
      dispatch({
        type: SEARCHED_JOB_LIST,
        payload: res.data
      })
    );
};

/************* Saving the job id to display on the job details ******* */

export const jobDetalsByID = jobDetailsID => async dispatch => {
  console.log("Inside job details display page");
  console.log(jobDetailsID);
  dispatch({
    type: JOB_ID_DISPLAY,
    payload: jobDetailsID
  });
};
