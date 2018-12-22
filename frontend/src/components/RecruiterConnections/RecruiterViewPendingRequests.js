import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import jwt_decode from "jwt-decode";
import RecruiterViewPendingRequestsItem from './RecruiterViewPendingRequestsItem';
import { getRecruiterPendingRequets } from '../../actions/recruiterconnectionActions';
import RecruiterNavbar from '../Navbar/recruiterNavbar';
import axios from "axios";
import { CONSTANTS } from "../../Constants";

class RecruiterViewPendingRequests extends Component {
  arr=[];
    isApplicantLoggedIn = false;

      componentWillReceiveProps(nextProps){
        if(nextProps.recruiterConnection.pendingrequests !== undefined){
       this.arr  = nextProps.recruiterConnection.pendingrequests[0].connectionsRequests;
          
       console.log("Array is " + this.arr);
        }
       
      }

      componentDidMount() {
        if (localStorage.getItem("recruiterToken")) {
          let token = localStorage.getItem("recruiterToken");
          this.decodedRecruiter = jwt_decode(token);
          //this.isApplicantLoggedIn = true;
          this.email = this.decodedRecruiter.email;
          console.log("Emmail", this.email)

      }

      axios.defaults.withCredentials = true;
      //setAuthToken(localStorage.getItem("recruiterToken"));
      let trackerdata = { "page": "40" };
      axios
          .put(`${CONSTANTS.BACKEND_URL}/recruiters/track/` + this.email, trackerdata)
          .then(response => {
              console.log("Recruiter Pending connections  View Tracked ", response.data);
    
          })
          .catch(function (error) {
              console.log("Tracker errored");
              console.log(error);
          });
    
  
        console.log("Emmail in CDM", this.email)
        this.props.getRecruiterPendingRequets(this.email);
        
        }
    
       render() {
        let homeItems;
        

     
        if(this.arr.length>0){
        
        console.log("print all", this.arr);
        homeItems = this.arr.map(ownerhome => (
               
          <div>
              
              <RecruiterViewPendingRequestsItem key={ownerhome._id} ownerhome={ownerhome} toEmail={ownerhome.requestFrom} sendTo={ownerhome.isRecr} />
        </div>
      ));
        
        }
            
        return (
          <div>
          <RecruiterNavbar/>
        
          <div className="container" >
          <div className="row">
         
          <div>   <br/>
                  <h3 className="display-8 text-left"> Your Pending Requests</h3>
                  <br/>
          </div>
          </div>
            <div className="row">
              {homeItems}
            </div>
          </div>

        </div>
        );
    
       }
    }
    
    RecruiterViewPendingRequests.propTypes = {
      getPendingRequets: PropTypes.func.isRequired,
      recruiterConnection: PropTypes.object.isRequired
    };
    
    const mapStateToProps = state => ({
      recruiterConnection: state.recruiterConnection
    });
    
    export default connect(mapStateToProps, { getRecruiterPendingRequets })(RecruiterViewPendingRequests);


