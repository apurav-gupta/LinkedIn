import React, { Component } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { CONSTANTS } from "../../Constants";
import setAuthToken from "../../utils/setAuthToken";

export default class Recommendations extends Component {
  constructor(props) {
    super(props);

    this.state = {
      applicant: localStorage.getItem("applicantToken")
        ? jwtDecode(localStorage.getItem("applicantToken")).email
        : "",
      // applicant: "applicant13@gmail.com",
      applicantData: ""
    };
  }

  componentDidMount() {
    axios.defaults.withCredentials = true;
    setAuthToken(localStorage.getItem("applicantToken"));
    axios
      .get(
        `${CONSTANTS.BACKEND_URL}/graphs/getRecommendation/` +this.state.applicant)
      .then(response => {
        console.log("Recommendation details in right rail ", response.data);

        this.setState({
          applicantData: response.data
        });
      })
      .catch(function(error) {
        console.log("errored");
        console.log(error);
      });
  }
  render() {
    var allImgs = Array.prototype.slice.call(this.state.applicantData);
    return (
      <div className="container-fluid">
        <div
          className="card"
          style={{
            borderRadius: "7px",
            margin: "10px",
            padding: "10px",
            boxShadow:
              "0 1px 5px 1px rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
          }}
        >
          <b>
            <span
              style={{
                fontSize: "120%",
                color: "#006097",
                paddingBottom: "5px",
                marginLeft: "10px"
              }}
            >
              <u>People you may know</u>
            </span>
          </b>
          {allImgs.map((recommended, i) => (
            <div
              className="card"
              style={{
                marginLeft: "3rem",
                marginRight : "3rem",

                marginBottom: "1rem",

                borderRadius: "4px",
                boxShadow:
                  "0 1px 2px 0 rgba(0, 0, 0, 0.1), 0 2px 4px 0 rgba(0, 0, 0, 0.10)"
              }}
            >
              {/* <ul
                className="list-group list-group-flush"
                style={{ margin: "5px" }}
              > */}
              <li className="list-group-item" key={i}>
                <dl className="form-row">{recommended}</dl>
              </li>
              {/* </ul> */}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
