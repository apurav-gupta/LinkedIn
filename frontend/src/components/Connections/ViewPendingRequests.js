import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import jwt_decode from "jwt-decode";
import ViewPendingRequestsItem from './ViewPendingRequestsItem';
import { getPendingRequets } from '../../actions/connectionActions';
import ApplicantNavbar from '../Navbar/applicantNavbar';
import axios from "axios";
import { CONSTANTS } from "../../Constants";
class ViewPendingRequests extends Component {
  arr=[];
    isApplicantLoggedIn = false;

      componentWillReceiveProps(nextProps){
        if(nextProps.connection.pendingrequests !== undefined){
       this.arr  = nextProps.connection.pendingrequests[0].connectionsRequests;
          
       console.log("Array is " + this.arr);
        }
       
      }

      componentDidMount() {
        if (localStorage.getItem("applicantToken")) {
          let token = localStorage.getItem("applicantToken");
          this.decodedApplicant = jwt_decode(token);
          this.isApplicantLoggedIn = true;
          this.email = this.decodedApplicant.email;
          console.log("Emmail", this.email)

      }
      axios.defaults.withCredentials = true;
      //setAuthToken(localStorage.getItem("recruiterToken"));
      let trackerdata = { "page": "42" };
      axios
          .put(`${CONSTANTS.BACKEND_URL}/recruiters/track/` + this.email, trackerdata)
          .then(response => {
              console.log("Applicant Pending connections  View Tracked ", response.data);
    
          })
          .catch(function (error) {
              console.log("Tracker errored");
              console.log(error);
          });
    
  
        console.log("Emmail in CDM", this.email)
        this.props.getPendingRequets(this.email);
        
        }
    
       render() {
        let homeItems;
        

     
        if(this.arr.length>0){
        
        console.log("print all", this.arr);
        homeItems = this.arr.map(ownerhome => (
               
          <div style={{borderRadius:"5px"}}>
              
              <ViewPendingRequestsItem key={ownerhome._id} ownerhome={ownerhome} toEmail={ownerhome.requestFrom} sendTo={ownerhome.isRecr}/>
        </div>
      ));
        
        }
            
        return (
          <div>
            <ApplicantNavbar/>
          
            <div className="container" >
            <div className="row">
           
            <div>
                    <br/>
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
    
    ViewPendingRequests.propTypes = {
      getPendingRequets: PropTypes.func.isRequired,
      connection: PropTypes.object.isRequired
    };
    
    const mapStateToProps = state => ({
      connection: state.connection
    });
    
    export default connect(mapStateToProps, { getPendingRequets })(ViewPendingRequests);


