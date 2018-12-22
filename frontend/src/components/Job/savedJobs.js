import React, { Component } from 'react';
import { CONSTANTS } from '../../Constants';
import axios from "axios";
import Card from "@material-ui/core/Card/Card";
import ProfileNavbar from "../Navbar/applicantNavbar";
import jwt_decode from "jwt-decode";

class SavedJobsList extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            savedJobsList: ""
        };
        if (localStorage.getItem("applicantToken")) {
            let token = localStorage.getItem("applicantToken");
            this.decodedApplicant = jwt_decode(token);
            this.isApplicantLoggedIn = true;
            this.email = this.decodedApplicant.email;
        }
        this.viewJobHandler = this.viewJobHandler.bind(this);
    }

    viewJobHandler = (e) => {
        console.log(e.target.value);
        localStorage.setItem('jobId', e.target.value);
        this.props.history.push("/jobDetails");
    }

    componentDidMount(){
        axios.defaults.withCredentials = true;
        axios.get(CONSTANTS.BACKEND_URL+"/jobs/savedjobs?email="+this.email)
        .then(response => {
            this.setState({
                savedJobsList: response.data.data
            })
        })
        .catch(function (error) {
            console.log("saved jobs fetching error");
            console.log(error);
        });
    }

    render() { 
        let renderthis = null;
        if(this.state.savedJobsList.length === 0) {
            renderthis =(
                <div>
                    <label>You have no Saved jobs</label>
                </div>
            )
        }
        var allSavedJobs = Array.prototype.slice.call(this.state.savedJobsList)
        return (     
            <div>
                <ProfileNavbar />
                <br />
                {renderthis}
                {allSavedJobs.map((job, i) => (
                            <div>
                                <Card className="w-75 p-3 ml-5">
                                    <div className="card-body row" display="">
                                        <div className="container col-8" display="inline">
                                            <div className="container">
                                                <div className="card-title">{job.title}</div>
                                            </div>
                                            <div className="container">
                                                <span className="card-subtitle md-2 text-muted">{job.companyName} . {job.location}</span>
                                            </div>
                                        </div>
                                        <div className="container col-4" display="inline">
                                            <div className="btn-toolbar">
                                                <button className="btn btn-primary" value = {job._id} onClick={this.viewJobHandler}>View Job</button>
                                            </div>
                                        </div>
                                    </div>
                                    <br />
                                </Card>
                                <br />
                            </div>    
                ))}
            </div> 
        );
    }
}
 
export default SavedJobsList;