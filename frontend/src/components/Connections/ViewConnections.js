import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import jwt_decode from "jwt-decode";
import ViewConnectionsItem from './ViewConnectionsItem';
import { getConnections } from '../../actions/connectionActions';



class ViewConnections extends Component {
  arr=[];
  isApplicantLoggedIn = false;
    

      componentWillReceiveProps(nextProps){
        if(nextProps.connection.allconnections !== undefined){
       this.arr  = nextProps.connection.allconnections[0].connections;
          
       console.log("Array is" + this.arr);
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
        console.log("Email in CDM", this.email)
        this.props.getConnections(this.email);
        
        }
    
       render() {
        let homeItems;
        

     
        if(this.arr.length>0){
        
        console.log("print all", this.arr);
        homeItems = this.arr.map(ownerhome => (
               
          <div>
              <ViewConnectionsItem key={ownerhome._id} ownerhome={ownerhome} />
        </div>
      ));
        
        }
        
        return (
          <div>
            
          
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
          </div>
        );
    
       }
    }
    
    ViewConnections.propTypes = {
      getConnections: PropTypes.func.isRequired,
      connection: PropTypes.object.isRequired
    };
    
    const mapStateToProps = state => ({
      connection: state.connection
    });
    
    export default connect(mapStateToProps, { getConnections })(ViewConnections);


