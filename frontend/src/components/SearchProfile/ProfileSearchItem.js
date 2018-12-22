import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {withRouter} from "react-router"; 

import jwt_decode from "jwt-decode";
import { connect } from "react-redux";
import {extractNameFromEmail,capitalizeFirstLetter} from '../../utility';
import { CONSTANTS } from "../../Constants";

class ProfileSearchItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
          messageContent: ""
        }
        this.changeMessage = this.changeMessage.bind(this);

      }

      changeMessage = e => {
        this.setState({
            messageContent: e.target.value
        });
      };
    

    onConnectClick() {
      //  console.log('email on click',email)
        if (localStorage.getItem("applicantToken")) {
            let token = localStorage.getItem("applicantToken");
            this.decodedApplicant = jwt_decode(token);
            this.isApplicantLoggedIn = true;
            this.email = this.decodedApplicant.email;
            this.firstName = this.decodedApplicant.firstName;
            this.isRecruiter=this.decodedApplicant.isRecruiter;
            
            console.log("Emmail", this.email)
        }
        const requestEmail={
            requestFrom:this.props.toEmail,
            isRecruiter:this.isRecruiter,
            isRecieverAORR:this.props.isRec
        }
        axios
          .post(`${CONSTANTS.BACKEND_URL}/applicants/connections/${this.email}`, requestEmail)
          .then(function(res) { 
              if (res.data) {
                alert("Connection Sent Successfully")
                
              } 
    })
          
    }

    onViewProfile() {
        console.log("propssss"+this.props);
          if(this.props.isRec){
              //call recruiter profile view count
              console.log("in applicant profile view")
              this.props.history.push({
                  pathname: "/recruiterprofileviewonly",
                  state: {"clicked":this.props.toEmail, "loggedin": jwt_decode(localStorage.getItem("applicantToken")).email}
              });
          }else{ 
            console.log("in recruiter profile view ") 
              //call applicant profile view count
              this.props.history.push({
                  pathname: "/applicantprofileviewonly",
                  state: {"clicked":this.props.toEmail, "loggedin": jwt_decode(localStorage.getItem("applicantToken")).email}
              });
          }
          
            
      }
  

    onMessageSendClick() {
        //  console.log('email on click',email)
          if (localStorage.getItem("applicantToken")) {
              let token = localStorage.getItem("applicantToken");
              this.decodedApplicant = jwt_decode(token);
              this.isApplicantLoggedIn = true;
              this.email = this.decodedApplicant.email;
              this.firstName = this.decodedApplicant.firstName;
              console.log("Emmail", this.email)
          }
    
          const messageDetails={
              from_email:this.email,
              to_email:this.props.toEmail,
              messageSent:this.state.messageContent,
              senderFirstName: capitalizeFirstLetter(extractNameFromEmail(jwt_decode(localStorage.getItem('applicantToken')).email)),
              receiverFirstName:this.props.toFirstName
          }
          console.log("mD",messageDetails);
          axios
            .post(`${CONSTANTS.BACKEND_URL}/applicants/sendMessage`, messageDetails)
            .then(function(res) { 
                if (res.data) {
                  alert("Message Sent Successfully")
                  
                } 
      })
            
      }
    

  render() {
    const { profile } = this.props;


    return (
      
      <div className="card card-body bg-light mb-3">
      <div className="row">

        <div className="col-1">
        
        </div>

        <div className="col-3">
        <h3>{profile.firstName} {profile.lastName}</h3>
        <h5>{profile.city} {profile.state}</h5>
        <h5>{profile.email}</h5>
        </div>
        <div className="col-4">
        <button 
                type="submit" 
                className="btn btn-primary"
             //  onClick={this.onConnectClick(profile.email).bind(this)} 
               onClick={this.onViewProfile.bind(this)} 
                >
                    View Profile
                </button>
        </div>
        <div className="col-3">
            <div className="text-right">
                <button 
                type="submit" 
                className="btn btn-primary"
             //  onClick={this.onConnectClick(profile.email).bind(this)} 
               onClick={this.onConnectClick.bind(this)} 
                >
                    Connect
                </button>
            </div>
            <br/>
            <div className="text-right">
                <button type="submit" className="btn btn-primary" data-toggle="modal" data-target="#messagingWindow">
                    Message
                </button>
            </div>
            <div className="modal fade" id="messagingWindow" tabindex="-1" role="dialog" aria-labelledby="modalLongTitle" aria-hidden="true">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Send Message From: {capitalizeFirstLetter(extractNameFromEmail(jwt_decode(localStorage.getItem('applicantToken')).email))}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            Message To : {profile.firstName}
                        </div>
                        <div className="modal-footer">
                            
                            <textarea 
                            className="form-control" 
                            rows="5" 
                            id="message" 
                            placeholder="Enter your message"
                            name="messageContent"
                            onChange={this.changeMessage}></textarea>
                            <button type="button" className="btn btn-primary" onClick={this.onMessageSendClick.bind(this)}  >Send</button>
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        </div>
                    </div>
                </div>    
            </div>
        </div>
        <div className="col-1">
        
        </div>
        
      </div>
    </div>
      
    );
  }
}

ProfileSearchItem.propTypes = {
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    
    applicantProfile: state.applicantProfile
  });

export default withRouter(connect(mapStateToProps)(ProfileSearchItem));
