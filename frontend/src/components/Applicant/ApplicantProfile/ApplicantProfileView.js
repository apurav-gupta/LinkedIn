import React, {Component} from "react";
import connect from "react-redux/es/connect/connect";
import Experience from "./experience";
import Education from "./education";
import Summary from "./summary";
import Skills from "./skills";
import jwt_decode from "jwt-decode";
import {applicantDetails, deleteApplicant, deleteUser} from "../../../actions/applicantActions";
import Redirect from "react-router/es/Redirect";
import ProfileNavbar from "../../Navbar/applicantNavbar"
import axios from "axios";
import {CONSTANTS} from '../../../Constants'

class ApplicantProfileView extends Component {

    applicantProfile = {};
    isApplicantLoggedIn = false;
    isDelete = false;

    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            city: "",
            state: "",
            profileSummary: "",
            profileImage: "",
            experience: [],
            education: [],
            skills: [],
            zipcode: "",
            gender: "",
            resume: ""
        };

        if (localStorage.getItem("applicantToken")) {
            let token = localStorage.getItem("applicantToken");
            this.decodedApplicant = jwt_decode(token);
            this.isApplicantLoggedIn = true;
            this.email = this.decodedApplicant.email;

        }



    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.applicantProfile.applicantProfile !== "") {

            this.applicantProfile = nextProps.applicantProfile.applicantProfile;
            if (nextProps.applicantProfile.delete !== "") {
                this.isDelete = true;
                alert("User deleted successfully");
                this.isApplicantLoggedIn = false;
                localStorage.removeItem('applicantToken');
                this.props.deleteUser();
            }
            this.setState({
                ...this.state,
                firstName: this.applicantProfile.firstName,
                lastName: this.applicantProfile.lastName,
                city: this.applicantProfile.city,
                state: this.applicantProfile.state,
                profileSummary: this.applicantProfile.profileSummary,
                experience: this.applicantProfile.experience,
                education: this.applicantProfile.education,
                skills: this.applicantProfile.skills,
                profileImage: this.applicantProfile.profileImage,
                zipcode: this.applicantProfile.zipcode,
                gender: this.applicantProfile.gender,
                resume: this.applicantProfile.resume
            })
        }
    }

    deleteClicked() {

        this.props.deleteApplicant(this.email);

    }


    componentDidMount() {
        this.props.applicantDetails(this.email);

        
        axios.defaults.withCredentials = true;
        //setAuthToken(localStorage.getItem("recruiterToken"));
        let trackerdata = { "page": "4" };
        axios
            .put(`${CONSTANTS.BACKEND_URL}/recruiters/track/` + this.email, trackerdata)
            .then(response => {
                console.log("Applicant Profile View Tracked ", response.data);

            })
            .catch(function (error) {
                console.log("errored");
                console.log(error);
            });
            // axios.defaults.withCredentials = true;
            // //setAuthToken(localStorage.getItem("recruiterToken"));
            
            // axios
            //     .put(`${CONSTANTS.BACKEND_URL}/applicants/${this.email}/logs/profile-view-count`)
            //     .then(response => {
            //         console.log("Applicant Profile View Count incremented ", response.data);
    
            //     })
            //     .catch(function (error) {
            //         console.log("errored");
            //         console.log(error);
            //     });
    }


    render() {
        if (!this.isApplicantLoggedIn) {
            return <Redirect to="/applicantsignup"/>
        }


        return (
            <div>

                <ProfileNavbar/>

                <br/>

                <Summary firstName={this.state.firstName} lastName={this.state.lastName}
                         city={this.state.city} state={this.state.state}
                         profileSummary={this.state.profileSummary} applicantEmail={this.email}
                         profileImage={this.state.profileImage} zipcode={this.state.zipcode} gender={this.state.gender}
                         resume={this.state.resume}/>

                <br/>

                <Experience experience={this.state.experience} applicantEmail={this.email}/>


                <Education education={this.state.education} applicantEmail={this.email}/>

                <br/>

                <Skills skills={this.state.skills} applicantEmail={this.email}/>

                <br/>

                <div className="text-center">

                    <button type="submit" onClick={this.deleteClicked.bind(this)}>Delete Profile</button>

                </div>

                <br/>
                <br/>

                <hr/>


            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    applicantErrorReducer: state.applicantErrorReducer,
    applicantProfile: state.applicantProfile
});

export default connect(mapStateToProps, {applicantDetails, deleteApplicant, deleteUser})(ApplicantProfileView);


