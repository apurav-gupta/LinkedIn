import React, { Component } from "react";
import { CONSTANTS } from "../../Constants";
import { extractNameFromEmail, capitalizeFirstLetter } from "../../utility";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";

class JobNavbar extends Component {
  constructor(props) {
    super();
    this.state = {
      isRecruiter: true,
      isLogged: true
      // isTraveler: jwtDecode(localStorage.getItem('token')).isTraveler
    };
    // this.notOwnerHandler = this.notOwnerHandler.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  //handle logout to destroy the cookie
  handleLogout = () => {
    let loggedInUser = capitalizeFirstLetter(
      extractNameFromEmail(
        jwtDecode(localStorage.getItem("recruiterToken")).email
      )
    );
    localStorage.removeItem("recruiterToken");
    // let user = {}
    // this.props.logoutData(false, user, true);
    this.setState = {
      ...this.state,
      isLogged: false
    };
    this.props.history.push("/");
    alert(`${loggedInUser} logged out successfully.`);
    console.log("User logged out Successfully.");
  };

  render() {
    let userLogin = null;
    if (this.state.isRecruiter && this.state.isLogged) {
      console.log("Able to read session.");
      userLogin = (
        <div className="dropdown" tabindex="-1" role="presentation">
          <button
            style={{
              background: "#006097",
              fontSize: "1.6rem",
              color: "#fff",
              border: "none",
              marginTop: "0px",
              fontWeight: "600"
            }}
            aria-haspopup="true"
            aria-expanded="false"
            className="site-header-nav__toggle Dropdown__toggle"
            id="dropdownMenuButton"
            label="Login"
            data-toggle="dropdown"
          >
            {/* {this.props.userData.loginData.userFirstName.toUpperCase()}<span aria-hidden="true" className="caret"></span> */}
            {capitalizeFirstLetter(
              extractNameFromEmail(
                jwtDecode(localStorage.getItem("recruiterToken")).email
              )
            )}
            &nbsp;<span aria-hidden="true" className="caret" />
          </button>
          <div className="dropdown-menu" aria-labelledby="site-header__login">
            <ul style={{ padding: "0px" }}>
              <li class="dropdown-item">
                <Link to="/messagesRecruiter">
                  <span className="glyphicon glyphicon-envelope" />
                  &nbsp;&nbsp;&nbsp;Inbox{" "}
                </Link>
              </li>
              <li class="dropdown-item">
                <Link to="/recruiterDashboard">
                  <span className="glyphicon glyphicon-briefcase" />
                  &nbsp;&nbsp;&nbsp;My Dashboard
                </Link>
              </li>
              <li class="dropdown-item">
                <Link to="/recruiterprofileview">
                  <span className="glyphicon glyphicon-user" />
                  &nbsp;&nbsp;&nbsp;My profile
                </Link>
              </li>
              <li class="dropdown-item">
                <Link to="/recruiterSignup" onClick={this.handleLogout}>
                  <span className="glyphicon glyphicon-log-out" />
                  &nbsp;&nbsp;&nbsp;Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      );
    } else {
      console.log("unable to read session");
      userLogin = (
        <div id="login" className="dropdown" tabindex="-1" role="presentation">
          <button
            style={{
              background: "#006097",
              fontSize: "1.6rem",
              color: "#fff",
              border: "none",
              paddingBottom: "18px",
              fontWeight: "600"
            }}
            aria-haspopup="true"
            aria-expanded="false"
            className="site-header-nav__toggle Dropdown__toggle"
            id="dropdownMenuButton"
            label="Login"
            data-toggle="dropdown"
          >
            Login&nbsp;<span aria-hidden="true" className="caret" />
          </button>
          <div class="dropdown-menu" aria-labelledby="site-header__login">
            <ul style={{ padding: "0px" }}>
              <li class="dropdown-item">
                <Link to="/RecruiterSignup">
                  <span className="glyphicon glyphicon-log-in" />
                  &nbsp;&nbsp;&nbsp;Recruiter Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      );
    }
    return (
      <div>
        <div className="header-job global-nav">
          <h1>
            <img className="" alt="LinkedIn" src="/LinkedInJobs.png" />
            <div className="wrapper-job">
              <nav data-test-product-dropdowns-nav>
                <div className="centerList">
                  <ul class="ts-global-nav__product-dropdowns">
                    <li id="ember764">
                      <div className="ts-nav-dropdown">
                        <div className="ts-nav-dropdown__trigger">
                          <h4
                            id="ember779"
                            aria-expanded="false"
                            className="ts-nav-dropdown__header"
                          >
                            <a
                              href={CONSTANTS.ROOTURL + "/job"}
                              id="ember780"
                              className="ts-nav-dropdown__primary-link ts-nav-dropdown__sublink--internal ember-view"
                            >
                              Home
                            </a>
                          </h4>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="ts-nav-dropdown">
                        <div className="ts-nav-dropdown__trigger">
                          <h4
                            aria-expanded="false"
                            className="ts-nav-dropdown__header "
                          >
                            <a
                              href={CONSTANTS.ROOTURL + "/job"}
                              data-control-name="jobsMenuPostAJob"
                              data-test-external-link=""
                              data-test-ts-nav-link="jobsMenuPostAJob"
                              className="ts-nav-dropdown__primary-link"
                            >
                              Post a Job
                            </a>
                          </h4>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="ts-nav-dropdown">
                        <div className="ts-nav-dropdown__trigger">
                          <h4
                            aria-expanded="false"
                            className="ts-nav-dropdown__header"
                          >
                            <a
                              href={CONSTANTS.ROOTURL + "/recruiterjoblisting"}
                              data-control-name="linkedinHomeMenu"
                              data-test-external-link=""
                              data-test-ts-nav-link="linkedinHomeMenu"
                              className="ts-nav-dropdown__primary-link"
                            >
                              My Jobs
                            </a>
                          </h4>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
            {userLogin}
          </h1>
        </div>
      </div>
    );
  }
}

export default JobNavbar;
