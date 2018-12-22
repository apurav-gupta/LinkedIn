import { GET_SEARCHED_PROFILES, GET_SEARCH_NAME } from "../actions/types";

const initialState = {
  searchName: "",
  searchedprofiles: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SEARCHED_PROFILES:
      return {
        ...state,
        searchedprofiles: action.payload
      };
    case GET_SEARCH_NAME:
      return {
        ...state,
        searchName: action.payload
      };
    default:
      return state;
  }
}
