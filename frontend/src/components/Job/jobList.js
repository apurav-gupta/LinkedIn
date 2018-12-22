import React, { Component } from "react";
import ProfileNavbar from "../Navbar/applicantNavbar";
import axios from "axios";
import JobCard from "./JobCard";
import { Redirect } from "react-router";
import * as Validate from "../../validation/ValidationUtil";
import { CONSTANTS } from "../../Constants";
import { connect } from "react-redux";
import { jobSearchFunc, jobDetalsByID } from "../../actions/jobSearchActions";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import Pagination from "../common/pagination";
import { paginate } from "../../utils/paginate";
import { getPhoto } from "../../actions/jobPhotosAction";
import { capitalizeFirstLetter } from "../../utility";
import jwtDecode from 'jwt-decode';
import _ from "lodash";

class jobList extends Component {
  lookprop = [];
  imageBase = [];
  jobDetails = [];
  constructor(props) {
    super(props);
    this.filterTitle = this.filterTitle.bind(this);
    this.filteremploymentType = this.filteremploymentType.bind(this);
    this.filterLocation = this.filterLocation.bind(this);
    this.filtercompanyName = this.filtercompanyName.bind(this);

    this.filterData = this.filterData.bind(this);
    this.clearData = this.clearData.bind(this);
    this.state = {
      isPassed: false,
      currentPage: 1,
      pageSize: 50,
      title: "",
      photo: [],
      employmentType: "",
      location: "",
      companyName: "",

      // isClicked: false,
      isRes: false,
      authflag: false
    };
    this.getPhoto = false;
  }

  filterTitle = e => {
    this.setState({
      title: e.target.value
    });
  };

  filteremploymentType = e => {
    this.setState({
      employmentType: e.target.value
    });
  };

  filterLocation = e => {
    this.setState({
      location: capitalizeFirstLetter(e.target.value)
    });
  };

  filtercompanyName = e => {
    this.setState({
      companyName: e.target.value
    });
  };

  clearData = e => {
    console.log("clearing filter");
    this.jobDetails = this.props.jobSearchReducer.jobSearchDetails.data;
    console.log(this.jobDetails);
    this.setState({
      ...this.state,
      filterUpdate: true
    });
  };

  redirectDetails = jobID => {
    localStorage.setItem('jobId',jobID);
    this.props.jobDetalsByID(jobID);
    this.props.history.push("/jobDetails");
  };

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.jobSearchReducer.jobSearchDetails.data != null &&
      this.getPhoto === true
    ) {
      let imagePreview = "data:image/jpg;base64, " + nextProps.photos.photo;
      this.imageBase.push(imagePreview);
      this.setState({
        imagePushed: true
      });
    } else if (
      nextProps.jobSearchReducer.jobSearchDetails.data != null &&
      this.getPhoto === false
    ) {
      this.jobDetails = nextProps.jobSearchReducer.jobSearchDetails.data;
      if (this.jobDetails.length > 0) {
        for (let i = 0; i < this.jobDetails.length; i++) {
          var photoData = this.jobDetails[i].companyLogo;
          // var photoArr = JSON.parse(photoData);
          // this.handleGetPhoto(photoArr[0]);
          this.handleGetPhoto(photoData);
        }
        this.setState({
          ...this.state,
          isRes: true
        });
      }
    }
  }

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  componentDidMount() {
    var data = {
      jobname: sessionStorage.getItem("jobname"),
      joblocation: sessionStorage.getItem("joblocation")
    };
    this.props.jobSearchFunc(data);


    axios.defaults.withCredentials = true;
    //setAuthToken(localStorage.getItem("recruiterToken"));
    let trackerdata = { "page": "34" };
    axios
        .put(`${CONSTANTS.BACKEND_URL}/recruiters/track/` + jwtDecode(localStorage.getItem('applicantToken')).email, trackerdata)
        .then(response => {
            console.log("Recruiter Job edit  View Tracked ", response.data);

        })
        .catch(function (error) {
            console.log("Tracker errored");
            console.log(error);
        });
  }

  filterData = e => {
    console.log("Inside filter");
    var filterResult = [];
    e.preventDefault();
    if (
      this.state.location !== "" &&
      this.state.employmentType !== "" &&
      this.state.companyName !== "" &&
      this.state.title !== ""
    ) {
      filterResult = _.map(
        this.props.jobSearchReducer.jobSearchDetails.data,
        o => {
          if (
            o.title === this.state.title &&
            o.location === this.state.location &&
            o.companyName === this.state.companyName &&
            o.employmentType === this.state.employmentType
          )
            return o;
        }
      );
    } else if (
      (this.state.title !== "" &&
        this.state.employmentType !== "" &&
        this.state.location) ||
      (this.state.title !== "" &&
        this.state.location !== "" &&
        this.state.companyName) ||
      (this.state.companyName !== "" &&
        this.state.employmentType !== "" &&
        this.state.location)
    ) {
      filterResult = _.map(
        this.props.jobSearchReducer.jobSearchDetails.data,
        o => {
          if (
            o.title === this.state.title &&
            o.employmentType === this.state.employmentType &&
            o.location === this.state.location
          )
            return o;
          else if (
            o.title === this.state.title &&
            o.companyName === this.state.companyName &&
            o.location === this.state.location
          )
            return o;
          else if (
            o.employmentType === this.state.employmentType &&
            o.companyName === this.state.companyName &&
            o.location === this.state.location
          )
            return o;
        }
      );
    } else if (
      (this.state.title !== "" && this.state.employmentType !== "") ||
      (this.state.title !== "" && this.state.location !== "") ||
      (this.state.title !== "" && this.state.companyName !== "") ||
      (this.state.employmentType !== "" && this.state.location !== "") ||
      (this.state.employmentType !== "" && this.state.companyName !== "") ||
      (this.state.location !== "" && this.state.companyName !== "")
    ) {
      filterResult = _.map(
        this.props.jobSearchReducer.jobSearchDetails.data,
        o => {
          if (
            o.title === this.state.title &&
            o.employmentType === this.state.employmentType
          )
            return o;
          else if (
            o.title === this.state.title &&
            o.location === this.state.location
          )
            return o;
          else if (
            o.title === this.state.title &&
            o.companyName === this.state.companyName
          )
            return o;
          else if (
            o.employmentType === this.state.employmentType &&
            o.location === this.state.location
          )
            return o;
          else if (
            o.employmentType === this.state.employmentType &&
            o.companyName === this.state.companyName
          )
            return o;
          else if (
            o.location === this.state.location &&
            o.companyName === this.state.companyName
          )
            return o;
        }
      );
    } else if (
      this.state.location !== "" ||
      this.state.employmentType !== "" ||
      this.state.companyName !== "" ||
      this.state.title !== ""
    ) {
      filterResult = _.map(
        this.props.jobSearchReducer.jobSearchDetails.data,
        o => {
          if (o.title === this.state.title) return o;
          else if (o.location === this.state.location) return o;
          else if (o.employmentType === this.state.employmentType) return o;
          else if (o.companyName === this.state.companyName) return o;
        }
      );
    }
    this.finalFilter = _.compact(filterResult);
    this.jobDetails = this.finalFilter;
    this.setState({
      ...this.state,
      filterUpdate: true
    });
  };

  handleGetPhoto = imgName => {
    this.props.getPhoto(imgName);
    this.getPhoto = true;
  };

  render() {
    var { length: count } = this.jobDetails;
    console.log(count);
    const { pageSize, currentPage } = this.state;
    const jobs = paginate(this.jobDetails, currentPage, pageSize);

    let redirect = null;
    // if (this.state.isPassed) {
    //   return <Redirect to="/jobDetails" />;
    // }

    return (
      <div>
        {redirect}
        <ProfileNavbar />
        <div class="col-md-2" style={{ top: "25px" }}>
          <div class="form-group">
            <input
              class="form-control"
              placeholder="Search Title"
              type="text"
              name="title"
              onChange={this.filterTitle}
              id="title"
            />
          </div>
        </div>
        <div class="col-md-2" style={{ top: "25px" }}>
          <div class="form-group">
            <input
              class="form-control"
              placeholder="Search Job Type"
              type="text"
              name="employmentType"
              onChange={this.filteremploymentType}
              id="employmentType"
            />
          </div>
        </div>
        <div class="col-md-2" style={{ top: "25px" }}>
          <div class="form-group">
            <input
              class="form-control"
              placeholder="Search Location"
              type="text"
              name="location"
              onChange={this.filterLocation}
              id="location"
            />
          </div>
        </div>
        <div class="col-md-2" style={{ top: "25px" }}>
          <div class="form-group">
            <input
              class="form-control"
              placeholder="Search companyName"
              type="text"
              name="companyName"
              onChange={this.filtercompanyName}
              id="companyName"
            />
          </div>
        </div>
        <div class="col-md-2" style={{ top: "25px" }}>
          <button
            type="submit"
            onClick={this.filterData}
            class="btn btn-primary"
          >
            Filter
          </button>
          &nbsp; &nbsp;
          <button
            type="submit"
            onClick={this.clearData}
            class="btn btn-primary"
            value=""
          >
            Reset Filters
          </button>
        </div>
        <br /> <br /> <br />
        <h3>
          {" "}
          Showing {count} jobs in the database, according to your search,
          {"   "}
          {this.props.applicantProfile.applicantProfile.firstname}:{" "}
        </h3>
        <br />
        {jobs.map((propval, place) => (
          <div className="ml-5 mt-2">
            <JobCard
              title={propval.title}
              companyName={propval.companyName}
              location={propval.location}
              description={propval.description}
              photo={this.imageBase[place]}
              onClick={() => this.redirectDetails(propval._id)}
              //   headline={propval.headline}
              //   description={propval.description}
              //   property_type={propval.property_type}
              //   bedrooms={propval.bedrooms}
              //   bathrooms={propval.bathrooms}
              //   accomodates={propval.accomodates}
              //   currtype={propval.currtype}
              //   dailyrate={propval.dailyrate}
            />
          </div>
        ))}
        <div className="col-sm-12">
          <Pagination
            itemsCount={count}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

jobList.propTypes = {
  jobSearchFunc: PropTypes.func.isRequired,
  jobDetalsByID: PropTypes.func.isRequired,
  getPhoto: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  jobSearchReducer: state.jobSearchReducer,
  applicantProfile: state.applicantProfile,
  photos: state.photos
});

export default connect(
  mapStateToProps,
  { jobSearchFunc, jobDetalsByID, getPhoto }
)(withRouter(jobList));
