import React, { Component } from "react";
import { Redirect } from "react-router";
import jwtDecode from "jwt-decode";
import axios from "axios";
import {CONSTANTS} from '../../../Constants';
import RightRailComponent from "./rightrail";
import ApplicantNavbar from "../../Navbar/applicantNavbar";
import GraphProfileViewCount from "./graphProfileViewCount";
export default class MainApplicantDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      applicant: localStorage.getItem('applicantToken')?jwtDecode(localStorage.getItem('applicantToken')).email : "",
    //   applicant: "ag@gmail.com"
    };
  }
componentDidMount(){
  axios.defaults.withCredentials = true;
  //setAuthToken(localStorage.getItem("recruiterToken"));
  let trackerdata = { "page":"18"};
  axios
  .put(`${CONSTANTS.BACKEND_URL}/recruiters/track/` + this.state.applicant,trackerdata)
  .then(response => {
    console.log("Applicant Dashboard Tracked ",response.data);
    
  }) 
  .catch(function(error) {
    console.log("errored");
    console.log(error);
  });

}
  render() {
    // check for auth flag
    let redirectVar = null;
    if (!localStorage.getItem("applicantToken")) {
      redirectVar = <Redirect to="/" />;
    }
    return (
      <div
        style={{
          minHeight: "100vh",
          minWidth: "100%",
          boxSizing: "border-box",
          backgroundColor: "#f4f4f4",
          borderRadius: "15px"
        }}
      >
        {/* {redirectVar} */}
        <ApplicantNavbar />

   

       
        <div className="row">
        <div className="col-9">
        <GraphProfileViewCount/>
          </div>
          
          <div className="col-3" style={{position: "fixed", right:"20px"}}>
            <RightRailComponent />
          </div>
        </div>


      </div>
    );
  }
}
