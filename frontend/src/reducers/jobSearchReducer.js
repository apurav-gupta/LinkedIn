import { SEARCHED_JOB_LIST, JOB_ID_DISPLAY } from "../actions/types";

const initialState = {
  jobSearchDetails: [],
  jobDetailsByID: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SEARCHED_JOB_LIST:
      return {
        ...state,
        jobSearchDetails: action.payload
      };

    case JOB_ID_DISPLAY:
      return {
        ...state,
        jobDetailsByID: action.payload
      };
    default:
      return state;
  }
}
