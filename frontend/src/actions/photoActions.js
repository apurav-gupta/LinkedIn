import axios from 'axios';
import {CONSTANTS} from "../Constants";
import {PHOTO_ERRORS, SET_CURRENT_SINGLE_PHOTO, SET_CURRENT_PHOTOS} from './types';


//post photo
export const postPhotos = (photos) => dispatch => {

    axios.post(`${CONSTANTS.BACKEND_URL}/api/photos/uploadPhotos`, photos)
        .then(res => {

            dispatch(currentPhotos(res));

        })
        .catch(err => dispatch({
            type: PHOTO_ERRORS,
            payload: err.response.data
        }));

};

export const getPhoto = (imgName) => dispatch => {

    axios.post(`${CONSTANTS.BACKEND_URL}/api/photos/download/` + imgName)
        .then(res => {

            dispatch(currentSinglePhoto(res.data));

        })
        .catch(err => dispatch({
            type: PHOTO_ERRORS,
            payload: err.response
        }));

};

//current single photo
export const currentSinglePhoto = decoded => {
    return {
        type: SET_CURRENT_SINGLE_PHOTO,
        payload: decoded
    }
};


//Set photo
export const currentPhotos = decoded => {
    return {
        type: SET_CURRENT_PHOTOS,
        payload: decoded
    }
};

