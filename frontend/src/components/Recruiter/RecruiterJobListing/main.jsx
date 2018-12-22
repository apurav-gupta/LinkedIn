import React, { Component } from "react";
import { Redirect } from "react-router";
import jwtDecode from "jwt-decode";

// import LeftRailComponent from "./rightrail";
import  JobListingComponent from "./jobListing";
import JobNavbar from "../../Navbar/JobNavbar";
import axios from "axios";
import { CONSTANTS } from "../../../Constants";
export default class MainRecruiterJobListing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recruiter: localStorage.getItem('recruiterToken')?jwtDecode(localStorage.getItem('recruiterToken')).email : ""
      
    };
  }
componentDidMount(){
  axios.defaults.withCredentials = true;
  //setAuthToken(localStorage.getItem("recruiterToken"));
  let trackerdata = { "page": "32" };
  axios
      .put(`${CONSTANTS.BACKEND_URL}/recruiters/track/` +this.state.recruiter, trackerdata)
      .then(response => {
          console.log("Recruiter JobListing  View Tracked ", response.data);

      })
      .catch(function (error) {
          console.log("Tracker errored");
          console.log(error);
      });

}
  render() {
    // check for auth flag
    let redirectVar = null;
    if (!localStorage.getItem("recruiterToken")) {
      return redirectVar = <Redirect to="/recruiterSignup" />;
    }
    return (
      <div
        style={{
          // minHeight: "100vh",
          // minWidth: "100%",
          boxSizing: "border-box",
          backgroundColor: "#f4f4f4",
          borderRadius: "15px"
        }}
      >
        {redirectVar}

        <JobNavbar />

       
        <div className="row">
        <div className="col-3" style={{position: "fixed", right:"20px"}}>
            {/* <LeftRailComponent /> */}
          </div>
        <div className="col-9">
        <JobListingComponent />
          </div>
          

        </div>


      </div>
    );
  }
}
