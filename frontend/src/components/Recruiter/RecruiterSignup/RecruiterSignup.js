import React, { Component } from 'react';
import { Redirect } from "react-router";

import RecruiterLoginNavbar from '../../Navbar/RecruiterLoginNavbar';
import axios from "axios";
import connect from "react-redux/es/connect/connect";
import {recruiterSignup} from "../../../actions/recruiterActions";
import Loginfooter from '../../Applicant/ApplicantSignup/FooterSignup';
import * as Validation from "../../../validation/ValidationUtil";

class RecruiterSignup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            userAdded: false,
            messageDiv: "",
            signupFlag: false,
            signupMsg: ""
        };
        // Bind the handlers to this class
        this.doSignUp = this.doSignUp.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.recruiterErrorReducer.error !== "") {
            // alert(`Error:${nextProps.recruiterErrorReducer.error}`);
            this.setState({
                ...this.state,
                signupFlag: true,
                signupMsg:nextProps.recruiterErrorReducer.error
            })
        }
    }

    doSignUp = (event) => {
        event.preventDefault();
        let valid = Validation.signupValidations(this.state);
        if (valid === '') {
            const data = {
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
            };
            axios.defaults.withCredentials = true;
            //make a post request with the user data
            this.props.recruiterSignup(data, this.props.history);
        } else {
            this.setState({
                ...this.state,
                messageDiv: valid
            })
        }
    };

    render() {
        let redirectVar = null;
        if (localStorage.getItem("recruiterToken")) {
          return redirectVar = <Redirect to="/job" />;
        }
        let message = null;
        if (this.state.messageDiv !== '') {
            message = (
                <div className="reg-alert" role="alert" tabindex="-1">
                    <div className="wrapper">
                        <p className="message">
                            <span className="alert-content">{this.state.messageDiv}</span>
                        </p>
                        <button className="dismiss dismiss-alert">
                            <i className="fas fa-window-close"></i>
                        </button>
                    </div>
                </div>
                // <div className="clearfix">
                //     <div className="alert alert-info text-center" role="alert">{this.state.messageDiv}</div>
                // </div>
            );
        } else {
            message = (
                <div></div>
            );
        }
        return(
            <div>
                <RecruiterLoginNavbar/>
                {/* <div className="text-center">
                    {message}
                </div> */}
                {redirectVar}
                <div id="main-container" className="main background lazy-loaded show-login   " 
                style={{backgroundImage: "url('https://static.licdn.com/sc/h/64xk850n3a8uzse6fi11l3vmz')"}}>
                    <form id="regForm" className="reg-form" action="" data-jsenabled="check">
                        <h2 className="title">Be great at what you do</h2>
                        <h3 className="subtitle">Get started - it's free.</h3>
                        {message}
                        {(this.state.signupFlag) ? 
                        <div className="reg-alert" role="alert" tabindex="-1">
                            <div className="wrapper">
                                <p className="message">
                                    <span className="alert-content">{this.state.signupMsg}</span>
                                </p>
                                <button className="dismiss dismiss-alert">
                                    <li type="cancel-icon" size="small" a11y-text="Dismiss"></li>
                                </button>
                            </div>
                        </div> : <di></di>
                        }
                        <div className="reg-alert hidden" role="alert" tabindex="-1">
                            <div className="wrapper">
                                <p className="message"><span className="alert-content"></span></p>
                                <button className="dismiss dismiss-alert">
                                    <li-icon type="cancel-icon" size="small" a11y-text="Dismiss"></li-icon>
                                </button>
                            </div>
                        </div>
                        <section className="form-body">
                            <label for="reg-firstname">First name</label>
                            <input type="text" name="firstName" id="reg-firstname" className="reg-firstname"
                                aria-required="true" tabindex="1" placeholder="" onChange={(e) => {
                                    this.setState({[e.target.name]: e.target.value})
                                }}/>
                            <label for="reg-lastname">Last name</label>
                            <input type="text"
                                name="lastName" id="reg-lastname" className="reg-lastname" 
                                aria-required="true" tabindex="1" placeholder="" onChange={(e) => {
                                    this.setState({[e.target.name]: e.target.value})
                                }}/>
                            <label for="reg-email">Email</label>
                            <input type="text" name="email" className="reg-email" autocapitalize="off"
                                        tabindex="4" id="reg-email" autofocus="autofocus" onChange={(e) => {
                                    this.setState({[e.target.name]: e.target.value})
                                }}/>
                            <label for="reg-password">Password (4 to 15 characters)</label>
                            <input
                                type="password" name="password" className="reg-password" id="reg-password" aria-required="true" tabindex="4"
                                autocomplete="new-password" onChange={(e) => {
                                    this.setState({[e.target.name]: e.target.value})
                                }}/>
                                <span className="agreement">By clicking Join now, you agree to the LinkedIn
                                <a tabindex="4" href="https://www.linkedin.com/legal/user-agreement">User Agreement</a>,
                                <a tabindex="4" href="https://www.linkedin.com/legal/privacy-policy">Privacy Policy</a>, and
                                <a tabindex="4" href="https://www.linkedin.com/legal/cookie-policy">Cookie Policy</a>.</span>
                                <input tabindex="4"
                                id="registration-submit" className="registration submit-button" type="submit" 
                                value="Join now" onClick={this.doSignUp.bind(this)}/>
                        </section>
                    </form>
                </div>
                <Loginfooter/>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    recruiterErrorReducer: state.recruiterErrorReducer
});

export default connect(mapStateToProps, {recruiterSignup})(RecruiterSignup);