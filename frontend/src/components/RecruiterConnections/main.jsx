import React, { Component } from "react";
import { Redirect } from "react-router";
import jwtDecode from "jwt-decode";
import RecruiterNavbar from '../Navbar/recruiterNavbar';
// import GraphTopTenJobPostingComponent from './GraphDashboardComponents/graphTopTenJobPosting';
import RecruiterViewConnections from './RecruiterViewConnections';
import LeftRailComponent from './leftrail';
import Recommendations from  './recommendations';
import { CONSTANTS } from "../../Constants";
import axios from "axios";
export default class MainRecruiterConnections extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recruiter: localStorage.getItem('recruiterToken')?jwtDecode(localStorage.getItem('recruiterToken')).email : "",
      
    };
    
  }
  componentDidMount(){
    axios.defaults.withCredentials = true;
    //setAuthToken(localStorage.getItem("recruiterToken"));
    let trackerdata = { "page": "26" };
    axios
        .put(`${CONSTANTS.BACKEND_URL}/recruiters/track/` + this.state.recruiter, trackerdata)
        .then(response => {
            console.log("Recruiter Connections  View Tracked ", response.data);
  
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
            {redirectVar}

            <RecruiterNavbar />


            <div className="row">

                <div className="col-9">
                    <RecruiterViewConnections />
                </div>
                <div className="col-3" style={{ position: "fixed", right: "20px" }}>
                    <div className="row" >
                        <LeftRailComponent />
                    </div>
                    <div className="row">
                        <Recommendations />
                    </div>
                </div>

            </div>
            {/* <div className="row" >
       <GraphTopTenJobPostingComponent/>
        </div> */}

        </div>
      );
  }
}
