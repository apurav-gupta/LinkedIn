import React, { Component } from "react";
import { Redirect } from "react-router";
import jwtDecode from "jwt-decode";

// import LeftRailComponent from "./rightrail";
import  JobStats from "./jobStats";
import JobNavbar from "../../Navbar/JobNavbar";
import  LeftRailComponent from "./jobstatLeftRail";
import axios from "axios";
import { CONSTANTS } from "../../../Constants";

export default class MainRecruiterJobStats extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recruiter: localStorage.getItem('recruiterToken')?jwtDecode(localStorage.getItem('recruiterToken')).email : "",
      // recruiter: "testrecruiter2@gmail.com",
      jobId : this.props.location.state
    };
  }
componentDidMount(){
  axios.defaults.withCredentials = true;
  //setAuthToken(localStorage.getItem("recruiterToken"));
  let trackerdata = { "page": "38" };
  axios
      .put(`${CONSTANTS.BACKEND_URL}/recruiters/track/` + this.state.recruiter, trackerdata)
      .then(response => {
          console.log("Recruiter message  View Tracked ", response.data);

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
      return redirectVar = <Redirect to="/Recruitersignup" />;

    } else {
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
          {/* {redirectVar} */}
  
          <JobNavbar />
  
         
          <div className="row">
          <div className="col-3" >
              <LeftRailComponent jobId={this.state.jobId}/>
              {/* <h1> Hello there!</h1> */}
          </div>
          <div className="col-9">
            <JobStats jobId={this.state.jobId}/>
          </div>
            
  
          </div>
  
  
        </div>
      );
    }
  }
}
