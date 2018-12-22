import {SET_CURRENT_PHOTOS, SET_CURRENT_SINGLE_PHOTO} from '../actions/types';

const initialState = {
    photos: "",
    photo:""

}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_PHOTOS:
            return {
                ...state,
                photos: action.payload
            };
        case SET_CURRENT_SINGLE_PHOTO:
            return {
                ...state,
                photo: action.payload
            };


        default:
            return state;

    }

}