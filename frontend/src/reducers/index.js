import messageReducer from "./messagesReducer";
import { combineReducers } from "redux";
import applicantProfile from "./applicantProfileReducer";
import recruiterProfile from "./recruiterProfileReducer";
import applicantErrorReducer from "./applicantErrorReducer";
import recruiterErrorReducer from "./recruiterErrorReducer";
import photosReducer from "./photosReducer";
import jobSearchReducer from "./jobSearchReducer";
import connection from "./connectionReducer";
import searchProfile from './searchProfileReducer';
import recruiterConnection from './recruiterconnectionReducer';

export default combineReducers({
  applicantProfile: applicantProfile,
  recruiterProfile: recruiterProfile,
  applicantErrorReducer: applicantErrorReducer,
  recruiterErrorReducer: recruiterErrorReducer,
  photos: photosReducer,
  messageReducer: messageReducer,
  jobSearchReducer: jobSearchReducer,
  connection: connection,
  searchProfile: searchProfile,
  recruiterConnection: recruiterConnection
});
