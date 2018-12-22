import React, {Component} from "react";
import ProfileNavbar from "../../Navbar/recruiterNavbar"
import Summary from "../../Recruiter/RecruiterProfileViewOnly/summaryonly";
import connect from "react-redux/es/connect/connect";
import {recruiterDetails} from "../../../actions/recruiterActions";
import jwt_decode from "jwt-decode";
import Redirect from "react-router/es/Redirect";
import axios from "axios";
import { CONSTANTS } from "../../../Constants";
class RecruiterProfileView extends Component {

    isApplicantLoggedIn = false;

    constructor(props){
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            city: "",
            state: "",
            companyName: "",
            profileImage:"",
            zipcode: "",
            gender: ""

        };


    }

    componentDidMount() {
        axios.defaults.withCredentials = true;
        //setAuthToken(localStorage.getItem("recruiterToken"));
        let trackerdata = { "page": "6" };
        axios
            .put(`${CONSTANTS.BACKEND_URL}/recruiters/track/` + this.props.location.state.loggedin, trackerdata)
            .then(response => {
                console.log("Recruiter Profile  View Tracked ", response.data);
      
            })
            .catch(function (error) {
                console.log("Tracker errored");
                console.log(error);
            });
      

            console.log("Component did mount in Recruiter profile view count only ", this.props.location.state);

        this.props.recruiterDetails(this.props.location.state.clicked);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.recruiterProfile.recruiterProfile !== "") {
            this.recruiterProfile = nextProps.recruiterProfile.recruiterProfile;
            this.setState({
                ...this.state,
                firstName: this.recruiterProfile.firstName,
                lastName: this.recruiterProfile.lastName,
                city: this.recruiterProfile.city,
                state: this.recruiterProfile.state,
                companyName: this.recruiterProfile.companyName,
                experience: this.recruiterProfile.experience,
                education: this.recruiterProfile.education,
                skills: this.recruiterProfile.skills,
                profileImage:this.recruiterProfile.profileImage,
                zipcode: this.recruiterProfile.zipcode,
                gender: this.recruiterProfile.gender
            })
        }
    }

    render() {

        return (
            <div>

                <br/>

                <Summary firstName={this.state.firstName} lastName={this.state.lastName}
                         city={this.state.city} state={this.state.state}
                         companyName={this.state.companyName} applicantEmail={this.email}
                         profileImage={this.state.profileImage} zipcode={this.state.zipcode} gender={this.state.gender}/>

            </div>
        )
    }

}

const mapStateToProps = (state) => ({
    recruiterErrorReducer: state.recruiterErrorReducer,
    recruiterProfile: state.recruiterProfile

});

export default connect(mapStateToProps, {recruiterDetails})(RecruiterProfileView);