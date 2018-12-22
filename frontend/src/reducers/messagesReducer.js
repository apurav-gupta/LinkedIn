import {
  MESSAGE_LIST,
  GET_MESSAGE_ERRORS,
  MESSAGE_DETAILS_BY_ID,
  MESSAGE_VIEW,
  SEND_MESSAGE
} from "../actions/types";

const initialState = {
  messageList: [],
  message_byID: [],
  messageView: [],
  sentMessage: [],
  error: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case MESSAGE_LIST:
      return {
        ...state,
        messageList: action.payload
      };

    case MESSAGE_DETAILS_BY_ID:
      return {
        ...state,
        message_byID: action.payload
      };

    case GET_MESSAGE_ERRORS:
      return {
        ...state,
        error: action.payload
      };

    case SEND_MESSAGE:
      return {
        ...state,
        sentMessage: action.payload
      };

    case MESSAGE_VIEW:
      return {
        ...state,
        messageView: action.payload
      };
    default:
      return state;
  }
}
