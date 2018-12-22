import {
  APPLICANT_PROFILE,
  SET_APPLICANT_CURRENT_USER,
  ADD_EXPERIENCE,
  ADD_EDUCATION,
  ADD_SKILLS,
  EDIT_SUMMARY,
  APPLICANT_DELETE,
  SET_USER_LOGOUT
} from "../actions/types";
import { isEmpty } from "../validation/ValidationUtil";

const initialState = {
  applicantProfile: {},

  applicantUser: {},
  experience: [],
  education: [],
  skills: [],
  summary: {},
  delete: "",
    isAuthenticated: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_APPLICANT_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: true,
        applicantUser: action.payload
      };
    case APPLICANT_PROFILE:
      return {
        ...state,
        applicantProfile: action.payload
      };
    case ADD_EXPERIENCE:
      return {
        ...state,
        experience: action.payload
      };
    case ADD_EDUCATION:
      return {
        ...state,
        education: action.payload
      };
    case ADD_SKILLS:
      return {
        ...state,
        skills: action.payload
      };
    case EDIT_SUMMARY:
      return {
        ...state,
        summary: action.payload
      };
    case APPLICANT_DELETE:
      return {
        ...state,
        delete: action.payload
      };

    case SET_USER_LOGOUT:
      return {
        isAuthenticated: false,
        applicantUser: action.payload
      };

    default:
      return state;
  }
}
