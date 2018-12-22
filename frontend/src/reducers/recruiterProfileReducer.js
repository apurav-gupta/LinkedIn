import { RECRUITER_PROFILE } from "../actions/types";

const initialState = {
  recruiterProfile: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    // case SET_RECRUITER_CURRENT_USER:
    //   return {
    //     ...state,
    //     isAuthenticated: !isEmpty(action.payload),
    //     applicantUser: action.payload
    //   };
    case RECRUITER_PROFILE:
      return {
        ...state,
        recruiterProfile: action.payload
      };

    default:
      return state;
  }
}
