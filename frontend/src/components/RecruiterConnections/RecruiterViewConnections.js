import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import jwt_decode from "jwt-decode";
import RecruiterViewConnectionsItem from './RecruiterViewConnectionsItem';
import { getRecruiterConnections } from '../../actions/recruiterconnectionActions';


class RecruiterViewConnections extends Component {
  arr=[];
  isApplicantLoggedIn = false;
    

      componentWillReceiveProps(nextProps){
        if(nextProps.recruiterConnection.allconnections !== undefined){
       this.arr  = nextProps.recruiterConnection.allconnections[0].connections;
          
       console.log("Array is" + this.arr);
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
        console.log("Emmail in CDM", this.email)
        this.props.getRecruiterConnections(this.email);
        
        }
    
       render() {
        let homeItems;
        

     
        if(this.arr.length>0){
        
        console.log("print all", this.arr);
        homeItems = this.arr.map(ownerhome => (
               
          <div>
              
              <RecruiterViewConnectionsItem key={ownerhome._id} ownerhome={ownerhome} />
        </div>
      ));
        
        }
        
        return (
          <div className="homes">
            <div className="container">
            <br/>
              <div className="row">
                <div className="col-md-12">
                  
                  


                  <div className="row">
                  <div className="col-8">
                    <h3 className="display-8 text-left">Your Connections</h3>
                  </div>
                  <div className="col-2">
                    
                  </div>
                  <div className="col-2">
                    
                  </div>
                </div>
                <br/>

                {homeItems}

                  <br/>
                  <br/> 
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                  
                  
                </div>
              </div>
            </div>
          </div>
        );
    
       }
    }
    
    RecruiterViewConnections.propTypes = {
      getRecruiterConnections: PropTypes.func.isRequired,
      recruiterConnection: PropTypes.object.isRequired
    };
    
    const mapStateToProps = state => ({
      recruiterConnection: state.recruiterConnection
    });
    
    export default connect(mapStateToProps, { getRecruiterConnections })(RecruiterViewConnections);


