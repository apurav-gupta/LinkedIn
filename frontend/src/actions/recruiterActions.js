import axios from "axios";
import jwt_decode from "jwt-decode";
import { CONSTANTS } from "../Constants";

import {
    RECRUITER_PROFILE,
    RECRUITER_GET_ERRORS,
    SET_APPLICANT_CURRENT_USER,
    RECRUITER_SIGNUP_ERROR_REDUCER,
    UPDATE_PROFILE_ERROR,
    EDIT_SUMMARY,
    SET_USER_LOGOUT, APPLICANT_DELETE
} from "./types";

import setAuthToken from "../utils/setAuthToken";
import {setDelete} from "./applicantActions";

//Recruiter signup
export const recruiterSignup = (userData, history) => dispatch => {
  axios.defaults.withCredentials = true;
  axios
    .post(`${CONSTANTS.BACKEND_URL}/recruiters/`, userData)
    .then(resSQL => {
      // Save to localStorage
      if (resSQL.status === 201) {
        axios.defaults.withCredentials = true;
        axios
          .post(`${CONSTANTS.BACKEND_URL}/recruiters/mongo`, userData)
          .then(resMongo => {
            if (resMongo.status === 201) {

              const trackerBody = {"location" : "San Jose"};
              console.log("UserDAta is ",userData.email)
              axios.defaults.withCredentials=true;
              axios
                .post(`${CONSTANTS.BACKEND_URL}/recruiters/track/${userData.email}`, trackerBody,{headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
              .then(res => {
                console.log("tracker response",res);
                if(res.data.success){
                  console.log("Tracker started successfully ", res);
                  //create a node in graph DB
                  axios.defaults.withCredentials=true;
                  axios.post(`${CONSTANTS.BACKEND_URL}/graphs/${userData.email}`,{headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
                  .then(res=>{
                    console.log("Added to Graph DB");
                    const { token } =resSQL.data;
                    //set token to local storage
                    localStorage.setItem("recruiterToken", token);
                    setAuthToken(token);
                    // Decode token to get user data
                    const decoded = jwt_decode(token);
                    // Set current user
                    dispatch(setRecruiter(decoded));
                    history.push("/recruitersignup");
                    alert("Recruiter created successfully.");
                  })
                  .catch(err =>{
                    console.log("Graph error is ", err);
                    dispatch({
                      type: RECRUITER_SIGNUP_ERROR_REDUCER,
                      payload: err.response.data.message
                    })
                  })
                }
                


              })
              .catch(err =>{
                console.log();
                dispatch({
                  type: RECRUITER_SIGNUP_ERROR_REDUCER,
                  payload: err.response.data.message
                })
              })



            }
          })
          .catch(err =>
            dispatch({
              type: RECRUITER_SIGNUP_ERROR_REDUCER,
              payload: err.response.data.message
            })
          );
      } else {
        dispatchRecruiterSignupError(resSQL.data);
      }
    })
    .catch(err =>
      dispatch({
        type: RECRUITER_SIGNUP_ERROR_REDUCER,
        payload: err.response.data.message
      })
    );
};

//Recruiter login
export const recruiterLogin = userData => dispatch => {
  axios.defaults.withCredentials = true;
  axios
    .post(`${CONSTANTS.BACKEND_URL}/recruiters/login`, userData)
    .then(res => {
      // Save to localStorage

      if (res.status === 200) {
        const { token } = res.data;
        //set token to local storage
        localStorage.setItem("recruiterToken", token);
        setAuthToken(token);
        // Decode token to get user data
        const decoded = jwt_decode(token);
        // Set current user
        dispatch(setRecruiter(decoded));
      } else {
        dispatchRecruiterSignupError(res.data);
      }
    })
    .catch(err =>
      dispatch({
        type: RECRUITER_SIGNUP_ERROR_REDUCER,
        payload: err.response.data.error
      })
    );
};

//get Recruiter details
export const recruiterDetails = recruiterEmail => dispatch => {
  axios.defaults.withCredentials = true;
  setAuthToken(localStorage.getItem("recruiterToken"));

  axios
    .get(`${CONSTANTS.BACKEND_URL}/recruiters/${recruiterEmail}`)
    .then(res => {
      dispatch(currentRecruiterProfile(res.data));
    })
    .catch(err =>
      dispatch({
        type: RECRUITER_GET_ERRORS,
        payload: err.response
      })
    );
};

//edit summary
export const editSummary = summary => dispatch => {
  axios.defaults.withCredentials = true;
  setAuthToken(localStorage.getItem("recruiterToken"));
  axios
    .put(`${CONSTANTS.BACKEND_URL}/recruiters/summary/edit`, summary)
    .then(res => {
      // Save to localStorage

      if (res.status === 202) {
        dispatch({
          type: EDIT_SUMMARY,
          payload: res.data
        });
      } else {
        dispatch({
          type: UPDATE_PROFILE_ERROR,
          payload: res.data
        });
      }
    })
    .catch(err =>
      dispatch({
        type: UPDATE_PROFILE_ERROR,
        payload: err.message
      })
    );
};

export const currentRecruiterProfile = decoded => {
  return {
    type: RECRUITER_PROFILE,
    payload: decoded
  };
};

// Set logged in user
export const setRecruiter = decoded => {
  return {
    type: SET_APPLICANT_CURRENT_USER,
    payload: decoded
  };
};

export const dispatchRecruiterSignupError = decoded => {
  return {
    type: RECRUITER_SIGNUP_ERROR_REDUCER,
    payload: decoded
  };
};

//Set Logged out User
export const setRecruiterOut = decoded => {
  return {
    type: SET_USER_LOGOUT,
    payload: decoded
  };
};




//Set Logged Out User
export const logOutRecruiter = () => dispatch => {
  // Remove token from sessionStorage
  localStorage.removeItem("recruiterToken");
  //Remove auth Header from future requests
  setAuthToken(false);
  // Set current user to {} which will ser isAuthenticated to false
 // dispatch(setRecruiterOut({}));

    window.location = "/";
};
