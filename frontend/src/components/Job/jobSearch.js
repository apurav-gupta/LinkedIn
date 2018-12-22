import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import jwtDecode from "jwt-decode"
import ProfileNavbar from "../Navbar/applicantNavbar";
import * as Validate from "../../validation/ValidationUtil";
import { capitalizeFirstLetter } from "../../utility";
import { CONSTANTS } from "../../Constants";
import axios from "axios"
class Home extends Component {
  constructor(props) {
    super(props);
    this.changeJobName = this.changeJobName.bind(this);
    this.changeJobLocation = this.changeJobLocation.bind(this);
    this.searchSubmit = this.searchSubmit.bind(this);

    this.state = {
      jobname: "",
      joblocation: "",
      messagediv: "",
      authFlag: false
    };
  }

  changeJobName = e => {
    this.setState({
      jobname: e.target.value
    });
  };

  changeJobLocation = e => {
    this.setState({
      joblocation: capitalizeFirstLetter(e.target.value)
    });
  };

  searchSubmit = e => {
    let valid = Validate.jobSearch(this.state);
    if (valid === "") {
      e.preventDefault();
      sessionStorage.setItem("jobname", this.state.jobname);
      sessionStorage.setItem("joblocation", this.state.joblocation);
      this.setState({
        authFlag: true
      });
    } else {
      this.setState({
        ...this.state,
        messagediv: valid
      });
      e.preventDefault();
    }
  };
  componentDidMount(){

    axios.defaults.withCredentials = true;
    //setAuthToken(localStorage.getItem("recruiterToken"));
    let trackerdata = { "page": "24" };
    axios
        .put(`${CONSTANTS.BACKEND_URL}/recruiters/track/` + jwtDecode(localStorage.getItem('applicantToken')).email, trackerdata)
        .then(response => {
            console.log("Job Search  View Tracked ", response.data);

        })
        .catch(function (error) {
            console.log("Tracker errored");
            console.log(error);
        });


  }

  render() {
    let message = null;
    if (this.state.messagediv !== "") {
      message = (
        <div className="clearfix">
          <div className="alert-danger text-center" role="alert">
            {this.state.messagediv}
          </div>
        </div>
      );
    } else {
      message = <div />;
    }
    let redirect = null;
    if (this.state.authFlag) {
      redirect = <Redirect to="/jobList" />;
    }

    return (
      <div
        style={{
          height: "640px",
          backgroundImage:
            "url('https://static.licdn.com/sc/h/64xk850n3a8uzse6fi11l3vmz')"
        }}
      >
        {redirect}
        <ProfileNavbar />
        <div>{message}</div>
        <div class="col-md-5" style={{ top: "250px", left: "60px" }}>
          <div class="form-group form-group-lg form-group-icon-left">
            <input
              class="form-control"
              placeholder="Search jobs"
              type="text"
              name="jobname"
              onChange={this.changeJobName}
              id="jobname"
            />
          </div>
        </div>

        <div class="col-md-4" style={{ top: "250px", left: "60px" }}>
          <div class="form-group form-group-lg form-group-icon-left">
            <input
              class="form-control"
              placeholder="Search location"
              type="text"
              name="location"
              onChange={this.changeJobLocation}
              id="location"
            />
          </div>
        </div>

        <div class="col-md-2" style={{ top: "250px", left: "60px" }}>
          <div class="hotel-search-button">
            <button
              type="submit"
              onClick={this.searchSubmit}
              class="btn btn-primary btn-lg btn-block"
              value=""
            >
              Search
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
