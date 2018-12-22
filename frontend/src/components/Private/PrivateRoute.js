import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const PrivateRoute = ({ component: Component, applicantProfile, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      applicantProfile.isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

PrivateRoute.propTypes = {
  applicantProfile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  applicantProfile: state.applicantProfile
});

export default connect(mapStateToProps)(PrivateRoute);
