import React, { Component } from "react";
import axios from "axios";
import ProfileNavbar from "../../Navbar/applicantNavbar";

// REDUX functionality
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

// import Pagination from "../common/pagination";
// import { paginate } from "../../utils/paginate";
import {
  messageViewFuncRecruiter,
  sendMessageFuncRecruiter
} from "../../../actions/messageActions";

class messageView extends Component {
  lookprop = [];
  constructor(props) {
    super(props);
    this.state = {
      messageSent: "",
      authflag: false
    };
    this.changeMessage = this.changeMessage.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.messageReducer.message_byID !== []) {
  //     var data = {
  //       from_email: this.props.messageReducer.message_byID[0],
  //       to_email: this.props.messageReducer.message_byID[1]
  //     };
  //     this.props.messageViewFunc(data);
  //   }
  // }

  // componentDidMount() {
  //   var data = {
  //     from_email: this.props.messageReducer.message_byID[0],
  //     to_email: this.props.messageReducer.message_byID[1]
  //   };
  //   this.props.messageViewFunc(data);
  // }

  handleMessage = e => {
    e.preventDefault();
    var data = {
      from_email: this.props.messageReducer.message_byID[0],
      to_email: this.props.messageReducer.message_byID[1],
      author: sessionStorage.getItem("author"),
      messageSent: this.state.messageSent
    };
    this.props.sendMessageFuncRecruiter(data);
    this.setState({
      ...this.state,
      messageSent: ""
    });
    this.props.history.push("/messagesRecruiter");
  };

  changeMessage = e => {
    this.setState({
      messageSent: e.target.value
    });
  };

  render() {
    return (
      <div>
        <br />
        <ul>
          <div class="panel panel-default">
            <div class="panel-heading">
              <div class="checklist-header-container ">
                <h1>
                  <span>
                    <b>Messages</b>
                  </span>
                </h1>
              </div>
            </div>
            <div class="panel-body">
              <div
                style={{
                  height: "400px",
                  width: "960px",
                  border: "1px",
                  overflow: "auto"
                }}
              >
                {this.props.messageReducer.messageView.map((propval, place) => (
                  <div className="ml-5 mt-2">
                    {/* {propval.messageMembers[1]} */}
                    <b>{propval.author}:</b>
                    <br />
                    {propval.message}
                    <br />
                    <hr />
                  </div>
                ))}
              </div>
            </div>
            <br />
            <div>
              <h6>
                <textarea
                  placeholder="Write Something ... !!"
                  style={{
                    width: "960px",
                    height: "100px",
                    marginLeft: "10px"
                  }}
                  onChange={this.changeMessage}
                />
              </h6>
              <br />
              <button
                class="btn btn-lg btn-primary "
                type="submit"
                value="Save"
                onClick={this.handleMessage}
                style={{
                  marginLeft: "10px"
                }}
              >
                {" "}
                Send Message
              </button>

              <br />
            </div>
          </div>
        </ul>
      </div>
    );
  }
}

messageView.propTypes = {
  messageViewFunc: PropTypes.func.isRequired,
  sendMessageFunc: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  messageReducer: state.messageReducer
});

export default connect(
  mapStateToProps,
  { messageViewFuncRecruiter, sendMessageFuncRecruiter }
)(withRouter(messageView));
