import { 
    GET_ALL_RECRUITER_CONNECTIONS,
    GET_PENDING_RECRUITER_REQUESTS
    
  } from '../actions/types';
  
  const initialState = {
    
    allconnections: null,
    pendingrequests:null
    
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case GET_ALL_RECRUITER_CONNECTIONS:
      return {
        ...state,
        allconnections: action.payload
      };

      case GET_PENDING_RECRUITER_REQUESTS:
      return {
        ...state,
        pendingrequests: action.payload
      };

      
      
      default:
        return state;
    }
  }
  