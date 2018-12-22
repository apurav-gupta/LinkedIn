import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";
import { Provider } from "react-redux"; //hold the state acts as a store
import store from "../store";
import { Redirect } from "react-router";
import { setCurrentUser, logoutCustomer } from "../actions/applicantActions";
import { setRecruiter, logOutRecruiter } from "../actions/recruiterActions";
import PrivateRoute from "./Private/PrivateRoute";

//Import Components
// import RecruiterLoginNavbar from './Navbar/RecruiterLoginNavbar';
// import ApplicantLoginNavbar from "./Navbar/ApplicantLoginNavbar";
import MessageView from "./Applicant/Messages/messageView";
import MessageList from "./Applicant/Messages/messageList";
import MessageListRecruiter from "./Recruiter/Messages/messageList";
import UserNavbar from "./Navbar/UserNavbar";
import PostJob from "./Job/jobPost/jobPost";
import ApplicantSignup from "./Applicant/ApplicantSignup/ApplicantSignup";
import RecruiterSignup from "./Recruiter/RecruiterSignup/RecruiterSignup";
import ApplicantProfileView from "./Applicant/ApplicantProfile/ApplicantProfileView";
import RecruiterProfileView from "./Recruiter/RecruiterProfile/RecruiterProfileView";
import MainRecruiterDashboard from "./Recruiter/RecruiterDashboard/main";
import MainApplicantDashboard from "./Applicant/ApplicantDashboard/main";
import MainApplicantConnections from "./Connections/main";
import MainRecruiterConnections from "./RecruiterConnections/main";
import ViewPendingRequests from "./Connections/ViewPendingRequests";
import ViewRecruiterPendingRequests from "./RecruiterConnections/RecruiterViewPendingRequests";
import JobDetails from "./Job/jobDetails";
import JobApply from "./Job/jobapply";
import JobSearch from "./Job/jobSearch";
import JobList from "./Job/jobList";
import MainRecruiterJobListing from "./Recruiter/RecruiterJobListing/main";
import Temp from "./Temp";
import MainRecruiterJobStats from "./Recruiter/RecruiterJobStastics/main";
import UserTraceDashboard from "./Recruiter/RecruiterDashboard/userTraceDashboard";
import ProfileSearch from "./SearchProfile/ProfileSearch";
import LocationTraceDashboard from "./Recruiter/RecruiterDashboard/locationTraceDashboard";
import EditJob from "./Job/jobEdit/jobEdit";
import ProfileSearchRecruiter from "./SearchProfile/ProfileSearchRecruiter";

//Check for applicant token
if (localStorage.applicantToken) {
  // Set Auth Token Header Auth
  setAuthToken(localStorage.applicantToken);
  // decode token and get user info
  const decoded = jwt_decode(localStorage.applicantToken);
  // Set user and is authenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutCustomer());
    // Redirect to login
    window.location.href = "/";
  }
}
if (localStorage.recruiterToken) {
  // Set Auth Token Header Auth
  setAuthToken(localStorage.recruiterToken);
  // decode token and get user info
  const decoded = jwt_decode(localStorage.recruiterToken);
  // Set user and is authenticated
  store.dispatch(setRecruiter(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logOutRecruiter());
    // Redirect to login
    window.location.href = "/";
  }
}

// Create a Main Component
class Main extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          {/*Render Different Component based on Route*/}
          <Route exact path="/" component={ApplicantSignup} />
          <Route path="/applicantsignup" component={ApplicantSignup} />
          <Route path="/recruitersignup" component={RecruiterSignup} />
          <Switch>
            {" "}
            <PrivateRoute
              path="/applicantprofileview"
              component={ApplicantProfileView}
            />
          </Switch>
          <Switch>
            {" "}
            <PrivateRoute
              path="/recruiterprofileview"
              component={RecruiterProfileView}
            />
          </Switch>
          <Switch>
            {" "}
            <PrivateRoute path="/messages" component={MessageList} />
          </Switch>
          <Switch>
            {" "}
            <PrivateRoute
              path="/messagesRecruiter"
              component={MessageListRecruiter}
            />
          </Switch>
          <Switch>
            {" "}
            <PrivateRoute path="/messageview" component={MessageView} />
          </Switch>
          {/* <Route path="/ownerlogin" component={OwnerLogin}/> */}
          <Switch>
            {" "}
            <PrivateRoute path="/profile" component={UserNavbar} />
          </Switch>
          <Switch>
            {" "}
            <PrivateRoute path="/job" component={PostJob} />
          </Switch>
          <Switch>
            {" "}
            <PrivateRoute path="/jobDetails" component={JobDetails} />
          </Switch>
          <Switch>
            {" "}
            <PrivateRoute path="/jobApply" component={JobApply} />
          </Switch>
          <Switch>
            {" "}
            <PrivateRoute path="/jobEdit" component={EditJob} />
          </Switch>
          <Switch>
            {" "}
            <PrivateRoute
              path="/applicantDashboard"
              component={MainApplicantDashboard}
            />
          </Switch>
          <Switch>
            {" "}
            <PrivateRoute
              path="/recruiterDashboard"
              component={MainRecruiterDashboard}
            />
          </Switch>
          <Switch>
            {" "}
            <PrivateRoute
              path="/recruiterJobListing"
              component={MainRecruiterJobListing}
            />
          </Switch>
          <Switch>
            {" "}
            <PrivateRoute
              path="/viewConnections"
              component={MainApplicantConnections}
            />
          </Switch>
          <Switch>
            {" "}
            <PrivateRoute
              path="/viewRecruiterConnections"
              component={MainRecruiterConnections}
            />
          </Switch>
          <Switch>
            {" "}
            <PrivateRoute
              path="/viewPendingRequests"
              component={ViewPendingRequests}
            />
          </Switch>
          <Switch>
            {" "}
            <PrivateRoute
              path="/viewRecruiterPendingRequests"
              component={ViewRecruiterPendingRequests}
            />
          </Switch>
          <Switch>
            {" "}
            <PrivateRoute path="/jobSearch" component={JobSearch} />
          </Switch>
          <Switch>
            {" "}
            <PrivateRoute path="/jobList" component={JobList} />
          </Switch>
          <Switch>
            {" "}
            <PrivateRoute path="/temp" component={Temp} />
          </Switch>
          <Switch>
            {" "}
            <PrivateRoute
              path="/recruiterjobstats"
              component={MainRecruiterJobStats}
            />
          </Switch>
          <Switch>
            {" "}
            <PrivateRoute path="/searchProfile" component={ProfileSearch} />
          </Switch>
          <Switch>
            {" "}
            <PrivateRoute
              path="/searchProfileRecruiter"
              component={ProfileSearchRecruiter}
            />
          </Switch>
          <Switch>
            {" "}
            <PrivateRoute path="/traceuser" component={UserTraceDashboard} />
          </Switch>
          <Switch>
            {" "}
            <PrivateRoute
              path="/tracelocation"
              component={LocationTraceDashboard}
            />
          </Switch>
        </div>
      </Provider>
    );
  }
}

//Export The Main Component
export default Main;
