import axios from "axios";
import { CONSTANTS } from "../Constants";
import { GET_ERRORS, SET_CURRENT_SINGLE_PHOTO } from "./types";

//get photo of image name

export const getPhoto = imgName => dispatch => {
  axios
    .post(`${CONSTANTS.BACKEND_URL}/api/photos/download/` + imgName)
    .then(res => {
      dispatch({
        type: SET_CURRENT_SINGLE_PHOTO,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
