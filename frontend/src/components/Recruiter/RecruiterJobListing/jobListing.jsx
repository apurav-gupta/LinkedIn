import React, { Component } from "react";
import { withRouter } from "react-router";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { CONSTANTS } from "../../../Constants";
import Pagination from "../../common/pagination";
import { paginate } from "../../../utility";

class JobListingComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recruiter: localStorage.getItem("recruiterToken")
        ? jwtDecode(localStorage.getItem("recruiterToken")).email
        : "",
      // recruiter: "recruiter13@gmail.com",
      joblist: "",
      currentPage: 1,
      pageSize: 10
    };
  }

  componentDidMount() {
    console.log("Recruiter is ", this.state.recruiter);
    axios
      .get(
        `${CONSTANTS.BACKEND_URL}/recruiters/` + this.state.recruiter + "/jobs"
      )
      .then(response => {
        console.log("Inside JobListing component", response.data.jobsList);
        // console.log("Inside JobListing component didmount",response.data.jobsList.data);
        this.setState({
          joblist: response.data.jobsList.data
        });
      })
      .catch(function(error) {
        console.log("errored in component did mount jobListing");
        console.log(error);
      });
  }

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  buttonEdit = e => {
    e.preventDefault();
    this.props.history.push({
      pathname: "/jobEdit",
      state: e.target.value
    });
  };
  buttonView = e => {
    e.preventDefault();
    this.props.history.push({
      pathname: "/recruiterjobstats",
      state: e.target.value
    });
  };

  render() {
    //    var propertylist = ();

    //console.log(plist);
    var allImgs = Array.prototype.slice.call(this.state.joblist);

    //var resu = allImgs.map(p=>p.propertyName);

    //console.log("result is", resu);

    const { pageSize, currentPage } = this.state;
    const imgPaginate = paginate(allImgs, currentPage, pageSize);

    return (
      <div>
        <div
          className="card"
          style={{
            // margin: "50px",
            // marginRight: "10px",
            // padding: "40px",
            // paddingBottom: "100px",
            marginTop: "2rem",
            backgroundColor: "#FAFAFA",
            borderRadius: "10px"
          }}
        >
          <h1
            data-test-post-page-title=""
            className="jobs__main-title"
            style={{
              marginLeft: "5rem",
              marginTop: "3rem",
              marginBottom: "2rem"
            }}
          >
            <b>Listed Jobs</b>
          </h1>
          {/* <h4 style={{ marginLeft: "5rem", marginTop: "7rem" }}>
            Jobs listed
          </h4> */}
          {imgPaginate.map((job, i) => (
            <div
              className="card"
              style={{
                marginLeft: "3rem",
                marginRight: "3rem",
                marginBottom: "1rem",
                //  marginLeft: "3rem",
                borderRadius: "10px",
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
              }}
            >
              {" "}
              {/* <div class="card-header border-0">
                <img class="card-img-top" src={job.companyLogo} alt="Company Logo" />
              </div> */}
              <ul
                className="list-group list-group-flush"
                style={{ margin: "5px" }}
              >
                <li
                  className="list-group-item"
                  key={i}
                  style={{ margin: "10px" }}
                >
                  <div className="card-body">
                    <h4>{job.title}</h4>

                    <dl className="form-row">
                      <dl className="col-sm-7">
                        <dt className="col-sm-3">Description :</dt>
                        <dd className="col-sm-9"> {job.description}</dd>
                        <dt className="col-sm-3">Location :</dt>
                        <dd className="col-sm-9"> {job.location}</dd>
                        <dt className="col-sm-3">Industry :</dt>
                        <dd className="col-sm-9"> {job.industry}</dd>
                      </dl>

                      <dl className="col-sm-2">
                        <dl className="row">
                          <button
                            className="btn btn-primary"
                            style={{ margin: "2px", width: "7rem" }}
                            value={job._id}
                            onClick={this.buttonEdit}
                            type="button"
                          >
                            Edit
                          </button>
                        </dl>
                        <dl className="row">
                          <button
                            className="btn btn-primary"
                            style={{ margin: "2px", width: "7rem" }}
                            value={job._id}
                            onClick={this.buttonView}
                            type="button"
                          >
                            View
                          </button>
                        </dl>
                      </dl>
                      <dl className="col-sm-3">
                        <label style={{ fontSize: "160%", color: "Blue" }}>
                          {job.noOfApplicants}
                        </label>
                        <label
                          style={{
                            fontFamily: "Helvetica",
                            marginInlineStart: "4px",
                            fontStyle: "italic",
                            fontSize: "90%",
                            color: "Grey"
                          }}
                        >
                          Applicants
                        </label>
                      </dl>

                    </dl>
                    <br>
                    </br>
                    <dl className="row">
                        <dt className="col">Applicants Viewed :</dt>
                        <dd className="col">{job.readCounter - job.startCounter} </dd>
                        <dt className="col">Applicants InProgress :</dt>
                        <dd className="col">{job.startCounter - job.completedCounter}</dd>
                      </dl>
                  </div>
                </li>
              </ul>
            </div>
          ))}
        </div>
        <div className="ml-5 mt-2">
          <Pagination
            itemsCount={allImgs.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(JobListingComponent);
