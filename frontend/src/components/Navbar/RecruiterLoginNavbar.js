import React, { Component } from "react";
import $ from "jquery";
import connect from "react-redux/es/connect/connect";
import { CONSTANTS } from "../../Constants";
import { recruiterLogin } from "../../actions/recruiterActions";
import * as Validation from "../../validation/ValidationUtil";
import Redirect from "react-router/es/Redirect";
import { isEmpty } from "lodash";

class RecruiterLoginNavbar extends Component {
  constructor(props) {
    super();
    this.state = {
      email: "",
      password: "",
      isRecruiter: true,
      userExists: false,
      isLoggedIn: false,
      isEmpty: false,
      messageDiv: "",
      success: false
    };
    // Bind the handlers to this class
    this.doLogin = this.doLogin.bind(this);
  }

  componentDidMount = () => {
    $(document).ready(function() {
      $("#cl").on("click", function() {
        $("#login-callout").addClass("hidden");
      });
    });
  };

  componentWillReceiveProps(nextProps) {
    if (!isEmpty(nextProps.applicantProfile.applicantUser)) {
      this.setState({
        ...this.state,
        success: true
      });
    } else if (nextProps.recruiterErrorReducer.error !== "") {
      if (
        nextProps.recruiterErrorReducer.error !== "Incorrect password" &&
        nextProps.recruiterErrorReducer.error !== "User already exists" &&
        nextProps.recruiterErrorReducer.error !== "Incorrect username"
      ) {
        alert(nextProps.recruiterErrorReducer.error);
      }
    }
  }

  doLogin = event => {
    event.preventDefault();
    let valid = Validation.loginValidations(this.state);
    if (this.state.email === "" || this.state.password === "") {
      this.setState({
        ...this.state,
        isEmpty: true
      });
    } else if (valid === "") {
      const data = {
        password: this.state.password,
        email: this.state.email
      };
      this.props.recruiterLogin(data, this.props.history);
    } else {
      this.setState({
        ...this.state,
        messageDiv: valid
      });
    }
  };

  render() {
    if (this.state.success) {
      return <Redirect to="/job" />;
      // return <Redirect to="/recruiterprofileview"/>
    }

    let message = null;
    if (this.state.messageDiv !== "") {
      message = (
        <div className="clearfix">
          <div className="alert alert-info text-center" role="alert">
            {this.state.messageDiv}
          </div>
        </div>
      );
    } else {
      message = <div />;
    }
    return (
      <div>
        <div className="header">
          <div className="wrapper">
            <h1>
              <img
                className="lazy-loaded"
                alt="LinkedIn"
                src="https://static.licdn.com/sc/h/95o6rrc5ws6mlw6wqzy0xgj7y"
              />
            </h1>
            <form
              className="login-form"
              action="https://www.linkedin.com/uas/login-submit?loginSubmitSource=GUEST_HOME"
              method="POST"
            >
              <label for="login-email">Email</label>
              <input
                type="text"
                name="email"
                className="login-email"
                autocapitalize="off"
                tabindex="1"
                id="login-email"
                placeholder="Email"
                autofocus="autofocus"
                dir="ltr"
                onChange={e => {
                  this.setState({ [e.target.name]: e.target.value });
                }}
              />
              <label for="login-password">Password</label>
              <input
                type="password"
                name="password"
                className="login-password"
                id="login-password"
                aria-required="true"
                tabindex="1"
                placeholder="Password"
                dir="ltr"
                onChange={e => {
                  this.setState({ [e.target.name]: e.target.value });
                }}
              />
              <input
                tabindex="1"
                id="login-submit"
                className="login submit-button"
                type="submit"
                value="Sign in"
                onClick={this.doLogin.bind(this)}
              />
              {!this.state.isRecruiter ? (
                <a
                  className="link-forgot-password"
                  tabindex="1"
                  href={CONSTANTS.ROOTURL + "/RecruiterSignup"}
                >
                  Recruiter?
                </a>
              ) : (
                <a
                  className="link-forgot-password"
                  tabindex="1"
                  href={CONSTANTS.ROOTURL + "/ApplicantSignup"}
                >
                  Applicant?
                </a>
              )}
              {this.state.isEmpty ? (
                <div
                  id="login-callout"
                  className="hopscotch-bubble animated hopscotch-callout no-number"
                  tabindex="-1"
                  role="alert"
                  aria-live="polite"
                >
                  <div className="hopscotch-bubble-container">
                    <div className="hopscotch-bubble-content">
                      <h3 className="hopscotch-title">Trying to sign in?</h3>
                      <div className="hopscotch-content">
                        Please enter complete details.
                      </div>
                    </div>
                    <a
                      id="cl"
                      title="Close"
                      href="#"
                      className="hopscotch-bubble-close hopscotch-close"
                    >
                      Close
                    </a>
                  </div>
                  <div className="hopscotch-bubble-arrow-container hopscotch-arrow up" />
                </div>
              ) : (
                <div />
              )}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  recruiterErrorReducer: state.recruiterErrorReducer,
  applicantProfile: state.applicantProfile
});
export default connect(
  mapStateToProps,
  { recruiterLogin }
)(RecruiterLoginNavbar);
