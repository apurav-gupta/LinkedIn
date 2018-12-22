import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getSearchedProfilesRecruiter } from "../../actions/searchProfileActions";
import ProfileSearchItemRecruiter from "./ProfileSearchItemRecruiter";
import RecruiterNavbar from "../Navbar/recruiterNavbar";
import { withRouter } from "react-router-dom";
// import { Redirect } from "react-router";
import { paginate } from "../../utils/paginate";
import { getPhoto } from "../../actions/jobPhotosAction";

import Pagination from "../common/pagination";

class ProfileSearchRecruiter extends Component {
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
    this.props.getSearchedProfilesRecruiter(data);
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

    return (
      <div>
        <RecruiterNavbar />
        {profileResults.map(profile => (
          <div className="ml-5 mt-2">
            <ProfileSearchItemRecruiter
              key={profile._id}
              profile={profile}
              toEmail={profile.email}
              toFirstName={profile.firstName}
              isRecruiter={profile.isRecruiter}
              isRec= {profile.isRecruiter}
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

ProfileSearchRecruiter.propTypes = {
  getSearchedProfilesRecruiter: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  searchProfile: state.searchProfile
});

export default connect(
  mapStateToProps,
  { getSearchedProfilesRecruiter, getPhoto }
)(withRouter(ProfileSearchRecruiter));
