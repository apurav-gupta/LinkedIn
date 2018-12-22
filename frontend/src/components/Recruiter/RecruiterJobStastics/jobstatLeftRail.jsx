import React, { Component } from "react";
import axios from 'axios';
import {CONSTANTS} from '../../../Constants';
import {usaDateFormat} from '../../../utility';
import jwtDecode from 'jwt-decode';


export default class LeftRailComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recruiter: localStorage.getItem('recruiterToken')?jwtDecode(localStorage.getItem('recruiterToken')).email : "",
    //   recruiter: "recruiter@gmail.com",
      jobData : "",
      jobId : this.props.jobid
    };
  }
componentDidMount(){
  axios.defaults.withCredentials = true;

  axios
  .get(`${CONSTANTS.BACKEND_URL}/jobs/`+this.props.jobId)
  .then(response => {
    console.log("Inside /jobs/jobid",response.data.data[0]);
    this.setState({
        jobData: response.data.data[0]
    });
  }) 
  .catch(function(error) {
    console.log("errored");
    console.log(error);
  });


}
  render() {
    console.log("Props in left rail ", this.props.jobId)
    return (
      <div>
        <div
          className="card"
          style={{
             position: "fixed",
            borderRadius: "7px",
            margin : "10px",
            width : "45rem",
            marginTop: "2rem",
            boxShadow:
                  "0 1px 5px 1px rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
          }}
        >

          <ul
                className="list-group list-group-flush"
                style={{ margin: "0px" }}
              >
                <li
                  className="list-group-item"
                  // key={i}
                  style={{ margin: "0px" }}
                >
                  <div className="card-body">
                    <b><span style={{ fontSize: "120%", color: "#006097" , paddingBottom: "5px"}}><u>Job Details</u></span></b>
                    <dl class="row">
                  
                  <dt class="col-sm-5">Job Title :</dt>
                  <dd class="col-sm-7"> {this.state.jobData.title}</dd>
                  <dt class="col-sm-5">Location :</dt>
                  <dd class="col-sm-7"> {this.state.jobData.location}</dd>
                  <dt class="col-sm-5">Posted On :</dt>
                  <dd class="col-sm-7">{usaDateFormat(this.state.jobData.postedDate)}</dd>
                  </dl>

                  </div>
                </li>
              </ul>
        </div>
      </div>
    );
  }
}
