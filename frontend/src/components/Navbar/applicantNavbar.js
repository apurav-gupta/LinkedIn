import React, { Component } from "react";
import "../../App.css";
import { Link } from "react-router-dom";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { extractNameFromEmail, capitalizeFirstLetter } from "../../utility";
import jwtDecode from "jwt-decode";
import connect from "react-redux/es/connect/connect";
import { searchProfileFunc } from "../../actions/searchProfileActions";
import PropTypes from "prop-types";
import Redirect from "react-router/es/Redirect";
import { logoutCustomer } from "../../actions/applicantActions";

class applicantNavbar extends Component {
  arr = [];

  constructor(props) {
    super();
    this.state = {
      firstName: "",
      isRecruiter: false,
      isPushed: false,
      isLogged: true
      // isTraveler: jwtDecode(localStorage.getItem('token')).isTraveler
    };
    // this.notOwnerHandler = this.notOwnerHandler.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.onChange = this.onChange.bind(this);
    this.changeFirstName = this.changeFirstName.bind(this);
    this.searchProfile = this.searchProfile.bind(this);
  }

  //handle logout to destroy the cookie
  handleLogout = e => {
    let loggedInUser = capitalizeFirstLetter(
      extractNameFromEmail(
        jwtDecode(localStorage.getItem("applicantToken")).email
      )
    );
    e.preventDefault();
    this.props.logoutCustomer();
    alert(`${loggedInUser} logged out successfully.`);
    console.log("User logged out Successfully.");
  };
  //  options = [
  //     'one', 'two', 'three'
  // ]

  changeFirstName = e => {
    this.setState({
      firstName: e.target.value
    });
  };

  //   componentWillReceiveProps(nextProps) {
  //     if (
  //       nextProps.searchProfile.searchedprofiles.SearchedProfile !== undefined
  //     ) {
  //       this.arr = nextProps.searchProfile.searchedprofiles.SearchedProfile;

  //       console.log("Array is" + this.arr);
  //       this.setState({
  //         ...this.state
  //       });
  //     }
  //   }

  searchProfile = e => {
    var data = {
      firstName: this.state.firstName
    };
    this.props.searchProfileFunc(data);
    this.setState({
      isPushed: true
    });
    // this.props.history.push("/searchProfile");
  };

  //   searchProfile = () => {
  //     const searchdata = {
  //       firstName: this.state.firstName
  //     };

  //     this.props.getSearchedProfiles(searchdata);
  //   };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    if (this.state.isPushed) {
      return <Redirect to="/searchProfile" />;
    }

    var loginOrOut;
    var profile;
    var signUp;
    var accountSettings;
    var requests;
    var connections;
    var home;
    var search;
    var jobs;
    var navClassName;
    var messaging;

    var div;
    let userLogin = null;
    if (!this.state.isRecruiter && this.state.isLogged) {
      console.log("Able to read session.");
      userLogin = (
        <div className="dropdown" tabindex="-1" role="presentation">
          <button
            style={{
              fontSize: "100%",
              color: "#fff",
              border: "none",
              paddingTop: "0px",
              fontWeight: "600"
            }}
            aria-haspopup="true"
            aria-expanded="false"
            className=" Dropdown__toggle navbar navbar-expand-lg navbar-light bg-light"
            id="dropdownMenuButton"
            label="Login"
            data-toggle="dropdown"
          >
            {/* {this.props.userData.loginData.userFirstName.toUpperCase()}<span aria-hidden="true" className="caret"></span> */}
            <span className="glyphicon glyphicon-user" />
            <div className="text-white">
              {capitalizeFirstLetter(
                extractNameFromEmail(
                  jwtDecode(localStorage.getItem("applicantToken")).email
                )
              )}
              &nbsp;
              <span aria-hidden="true" className="caret" />
            </div>
          </button>
          <div className="dropdown-menu" aria-labelledby="site-header__login">
            <ul style={{ padding: "0px" }}>
              <li class="dropdown-item">
                <Link to="/applicantDashboard">
                  <span className="glyphicon glyphicon-briefcase" />
                  &nbsp;&nbsp;&nbsp;My Dashboard
                </Link>
              </li>
              <li class="dropdown-item">
                <Link to="/viewPendingRequests">
                  <span className="glyphicon glyphicon-link" />
                  &nbsp;&nbsp;&nbsp;My Requests
                </Link>
              </li>
              <li class="dropdown-item">
                <Link to="/savedJobs">
                  <span className="glyphicon glyphicon-floppy-saved" />
                  &nbsp;&nbsp;&nbsp;My Saved Jobs
                </Link>
              </li>
              <li class="dropdown-item">
                <Link to="/applicantSignup" onClick={this.handleLogout}>
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
              fontSize: "1.6rem",
              color: "#fff",
              border: "none",
              paddingBottom: "18px",
              fontWeight: "600"
            }}
            aria-haspopup="true"
            aria-expanded="false"
            className="site-header-nav__toggle Dropdown__toggle "
            id="dropdownMenuButton"
            label="Login"
            data-toggle="dropdown"
          >
            Applicant Login&nbsp;
            <span aria-hidden="true" className="caret" />
          </button>
          <div class="dropdown-menu" aria-labelledby="site-header__login">
            <ul style={{ padding: "0px" }}>
              <li class="dropdown-item">
                <Link to="/applicantSignup">
                  <span className="glyphicon glyphicon-log-in" />
                  &nbsp;&nbsp;&nbsp;Applicant Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      );
    }
    //if the user is logged in, show the logout and profile link

    loginOrOut = (
      <li>
        <Link to="/logout" className="navbar-brand">
          <span
            className="glyphicon glyphicon-off navbar-icon"
            title="Logout"
          />
        </Link>
      </li>
    );

    profile = (
      <li>
        <Link to="/" title="Profile" className="navbar-brand">
          <span className="glyphicon glyphicon-user navbar-icon" />
        </Link>
      </li>
    );

    accountSettings = (
      <li className="drpdown">
        <Dropdown
          options={this.options}
          placeholder="Settings"
          className="drpdown"
        />
      </li>
    );

    requests = (
      <li>
        <Link to="/" className="navbar-brand">
          <span
            className="glyphicon glyphicon-bell navbar-icon"
            title="Requests"
          />
        </Link>
      </li>
    );

    connections = (
      <li>
        <Link
          to="/viewConnections"
          className="navbar-brand connections-icon text-center text-white"
        >
          <span className="glyphicon glyphicon-globe " title="Connections" />
          <div className="text-white">My Network</div>
        </Link>
      </li>
    );

    home = (
      <li>
        <Link
          to="/applicantprofileview"
          className="navbar-brand text-center text-white"
        >
          <span className="glyphicon glyphicon-home navbar-icon" />
          <div className="text-white">Home</div>
        </Link>
      </li>
    );

    search = (
      <input
        name="firstName"
        className="form-control mr-sm-1 "
        type="search"
        placeholder="Search"
        aria-label="Search"
        style={{ width: 250, marginTop: 10 }}
        value={this.state.firstName}
        onChange={this.changeFirstName}
      />
    );

    jobs = (
      <Link
        to="/jobSearch"
        className="navbar-brand connections-icon text-center text-white"
      >
        <span className="glyphicon glyphicon-briefcase " />
        <div className="text-white">Jobs</div>
      </Link>
    );

    messaging = (
      <Link
        to="/messages"
        className="navbar-brand connections-icon text-center text-white"
      >
        <span className="glyphicon glyphicon-comment " />
        <div className="text-white">Messaging</div>
      </Link>
    );

    navClassName = "navbar navbar-default navbar-static-top";

    return (
      <div>
        <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="navbar-header row" style={{ marginLeft: 10 }}>
              <Link to="/" className="navbar-brand">
                <img
                  src="https://static.licdn.com/sc/h/95o6rrc5ws6mlw6wqzy0xgj7y"
                  alt="logo"
                />
              </Link>

              {search}
              <input
                style={{
                  fontSize: "100%",
                  weight: 300,
                  marginLeft: 25,
                  marginTop: 8,
                  marginBottom: 5,
                  color: "#fff"
                }}
                tabindex="1"
                id="login-submit"
                className="header wrapper login-form login submit-button"
                type="submit"
                value="Search"
                onClick={this.searchProfile}
              />
            </div>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav pull-right" style={{ marginRight: 67 }}>
                <li className="nav-item active">{home}</li>
                <li className="nav-item">{connections}</li>
                <li className="nav-item">{jobs}</li>
                <li className="nav-item">{messaging}</li>

                <li className="nav-item">{userLogin}</li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

applicantNavbar.propTypes = {
  logoutCustomer: PropTypes.func.isRequired,
  searchProfileFunc: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  searchProfile: state.searchProfile
});

export default connect(
  mapStateToProps,
  { searchProfileFunc, logoutCustomer }
)(applicantNavbar);
