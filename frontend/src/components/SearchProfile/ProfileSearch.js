import React, { Component } from "react";
import { Redirect } from "react-router";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getSearchedProfiles } from "../../actions/searchProfileActions";
import ProfileSearchItem from "./ProfileSearchItem";
import ApplicantNavBar from "../Navbar/applicantNavbar";
import { withRouter } from "react-router-dom";
// import { Redirect } from "react-router";
import { paginate } from "../../utils/paginate";
import { getPhoto } from "../../actions/jobPhotosAction";
import { CONSTANTS } from "../../Constants";
import axios from "axios";
import Pagination from "../common/pagination";

class ProfileSearch extends Component {
  lookprop = [];
  imageBase = [];
  searchResult = [];

  constructor(props) {
    super(props);
    this.state = {
      photo: [],
      currentPage: 1,
      pageSize: 10,
      authflag: false,
      isClicked: false,
      isRes: false
    };
    this.getPhoto = false;
  }

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  componentWillReceiveProps(nextProps) {
    // if (
    //   nextProps.searchProfile.searchedprofiles.SearchedProfile != null &&
    //   this.getPhoto === true
    // ) {
    //   let imagePreview = "data:image/jpg;base64, " + nextProps.photos.photo;
    //   this.imageBase.push(imagePreview);
    //   this.setState({
    //     imagePushed: true
    //   });
    // } else
    if (nextProps.searchProfile.searchedprofiles.SearchedProfile != null) {
      // &&
      //   this.getPhoto === false
      this.searchResult =
        nextProps.searchProfile.searchedprofiles.SearchedProfile;
      if (this.searchResult.length > 0) {
        // for (let i = 0; i < this.searchResult.length; i++) {
        //   var photoData = this.searchResult[i].photos;
        //   var photoArr = JSON.parse(photoData);
        //   this.handleGetPhoto(photoArr[0]);
        // }

        this.setState({
          ...this.state,
          isRes: true
        });
      }
    }
  }

  componentDidMount() {
    var data = {
      firstName: this.props.searchProfile.searchName.firstName
    };
    console.log(data);
    this.props.getSearchedProfiles(data);

    axios.defaults.withCredentials = true;
    //setAuthToken(localStorage.getItem("recruiterToken"));
    let trackerdata = { "page": "44" };
    // axios
    //     .put(`${CONSTANTS.BACKEND_URL}/recruiters/track/` + this.email, trackerdata)
    //     .then(response => {
    //         console.log("Applicant Pending connections  View Tracked ", response.data);
  
    //     })
    //     .catch(function (error) {
    //         console.log("Tracker errored");
    //         console.log(error);
    //     });
  



  }

  //   handleGetPhoto = imgName => {
  //     this.props.getPhoto(imgName);
  //     this.getPhoto = true;
  //   };

  render() {
    var { length: count } = this.searchResult;
    console.log(count);
    const { pageSize, currentPage } = this.state;
    const profileResults = paginate(this.searchResult, currentPage, pageSize);
    let redirectVar = null;
    if (!localStorage.getItem("applicantToken")) {
      return redirectVar = <Redirect to="/applicantsignup" />;

    }
    return (
      <div>
        {redirectVar}
        <ApplicantNavBar />
        {profileResults.map(profile => (
          <div className="ml-5 mt-2">
            <ProfileSearchItem
              key={profile._id}
              profile={profile}
              toEmail={profile.email}
              toFirstName={profile.firstName}
              isRecruiter={profile.isRecruiter}
              isRec = {profile.isRecruiter}
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

ProfileSearch.propTypes = {
  getSearchedProfiles: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  searchProfile: state.searchProfile
});

export default connect(
  mapStateToProps,
  { getSearchedProfiles, getPhoto }
)(withRouter(ProfileSearch));
