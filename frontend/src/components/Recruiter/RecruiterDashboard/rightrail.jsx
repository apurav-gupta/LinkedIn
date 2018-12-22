import React, { Component } from "react";
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import {CONSTANTS} from '../../../Constants';
import setAuthToken from "../../../utils/setAuthToken";


export default class RightRailComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recruiter: localStorage.getItem('recruiterToken')?jwtDecode(localStorage.getItem('recruiterToken')).email : "",
      // recruiter: "recruiter13@gmail.com",
      recruiterData : ""
    };
  }
componentDidMount(){
  axios.defaults.withCredentials = true;
  setAuthToken(localStorage.getItem("recruiterToken"));
  axios
  .get(`${CONSTANTS.BACKEND_URL}/recruiters/` + this.state.recruiter)
  .then(response => {
    console.log("Recruiter details in right rail ",response.data);
    this.setState({
      recruiterData: response.data
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
                  <b><span style={{ fontSize: "120%", color: "#006097" , paddingBottom: "5px"}}><u>Recruiter Details</u></span></b>
                    <dl class="row">
                  
                  <dt class="col-sm-5">First Name :</dt>
                  <dd class="col-sm-7"> {this.state.recruiterData.firstName}</dd>
                  <dt class="col-sm-5">Last Name :</dt>
                  <dd class="col-sm-7">{this.state.recruiterData.lastName}</dd>
                  <dt class="col-sm-5">Email :</dt>
                  <dd class="col-sm-7"> {this.state.recruiterData.email}</dd>
                  <dt class="col-sm-5">Company</dt>
                  <dd class="col-sm-7">{this.state.recruiterData.companyName} </dd>
                  <dt class="col-sm-5">Location:</dt>
                  <dd class="col-sm-7">{this.state.recruiterData.address}</dd>
                  </dl>

                  </div>
                </li>
              </ul>
        </div>
      </div>
    );
  }
}
