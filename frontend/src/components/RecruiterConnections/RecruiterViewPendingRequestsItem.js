import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Messages from "./Messages";
import { CONSTANTS } from "../../Constants";

class RecruiterViewConnectionsItem extends Component {
  onAcceptClick() {
    if (localStorage.getItem("recruiterToken")) {
      let token = localStorage.getItem("recruiterToken");
      this.decodedRecruiter = jwt_decode(token);
     // this.isApplicantLoggedIn = true;
      this.email = this.decodedRecruiter.email;
      this.isRecruiter=this.decodedRecruiter.isRecruiter;
      console.log("Emmail", this.email);
      console.log("isRecruiter........", this.isRecruiter);
    }
    const requestEmail = {
      requestFrom: this.props.toEmail,
      recruiterLoggedin:this.isRecruiter,
      sendToRecruiter:this.props.sendTo
    };
    axios
      .post(
        `${CONSTANTS.BACKEND_URL}/recruiters/acceptConnection/${this.email}`,
        requestEmail
      )
      .then(resGraph=> {
        if (resGraph.data) {
          //applicant Create Graph
          const connectionBody = { email: requestEmail.requestFrom };
          axios
            .post(
              `${CONSTANTS.BACKEND_URL}/graphs/createConnection/${this.email}`,
              connectionBody
            )
            .then(resGraph => {
              console.log("Graph conencted ", resGraph);
              alert("Connection Accepted Successfully");
              window.location.reload();
            })
            .catch(errGraph => {
              console.log("Accept connection failed ", errGraph);
            //  alert("Accept Connection Failed");
            });
        }
      })
      .catch(err=>{
        console.log("Accept connection recruiter failed" , err);
        alert("accept connection failed");

      });
  }
  render() {
    const { ownerhome } = this.props;

    return (
      <div className="container">
        <div className="row" style={{ height: "50px", marginTop: "5px" }}>
          <div className="col-7">
            <div
              className="card"
              style={{
                backgroundColor: "white",
                padding: "15px",
                borderRadius: "5px"
              }}
            >
              {ownerhome.requestFrom}
            </div>
          </div>

          <div className="col-5">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={this.onAcceptClick.bind(this)}
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    );
  }
}

RecruiterViewConnectionsItem.propTypes = {
  ownerhome: PropTypes.object.isRequired
};

export default RecruiterViewConnectionsItem;
