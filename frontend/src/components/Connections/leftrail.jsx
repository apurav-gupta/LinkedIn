import React, { Component } from "react";
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import {CONSTANTS} from '../../Constants';
import setAuthToken from "../../utils/setAuthToken";

export default class LeftRailComponent extends Component {
     lengthOFConnections  = 0 ;
    constructor(props) {
    super(props);

    this.state = {
      applicant: localStorage.getItem('applicantToken')?jwtDecode(localStorage.getItem('applicantToken')).email : "",
      // applicant: "applicant13@gmail.com",
      applicantData : ""
    };
  }

 

componentDidMount(){
  axios.defaults.withCredentials = true;
  setAuthToken(localStorage.getItem("applicantToken"));
  axios
  .get(`${CONSTANTS.BACKEND_URL}/applicants/` + this.state.applicant)
  .then(response => {
    console.log("applicant details in left rail ",response.data);
    this.lengthOFConnections= response.data.connectionsRequests.length;
    this.setState({
        applicantData: response.data
    });
  }) 
  .catch(function(error) {
    console.log("errored");
    console.log(error);
  });


}
  render() {
    return (
      <div>
        <div
          className="card"
          style={{
            borderRadius: "7px",
            margin : "10px",
            boxShadow:
                  "0 1px 5px 1px rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
          }}
        >

          <ul
                className="list-group list-group-flush"
                style={{ margin: "10px" }}
              >
                <li
                  className="list-group-item"
                  // key={i}
                  style={{ margin: "10px" }}
                >
                  <div className="card-body">
                  <b><span style={{ fontSize: "120%", color: "#006097" , paddingBottom: "5px"}}><u>Your Details</u></span></b>
                    <dl class="row">
                  
                  <dt class="col-sm-5">First Name :</dt>
                  <dd class="col-sm-7"> {this.state.applicantData.firstName}</dd>
                  <dt class="col-sm-5">Last Name :</dt>
                  <dd class="col-sm-7">{this.state.applicantData.lastName}</dd>
                  <dt class="col-sm-5">Email :</dt>
                  <dd class="col-sm-7"> {this.state.applicantData.email}</dd>
                 
                  <dt class="col-sm-5">Location:</dt>
                  <dd class="col-sm-7">{this.state.applicantData.address}</dd>
           
                  <dt class="col-sm-5">Pending Requests:</dt>
                  <dd class="col-sm-7">{this.lengthOFConnections}</dd>
                  </dl>

                  </div>
                </li>
              </ul>
        </div>
      </div>
    );
  }
}
