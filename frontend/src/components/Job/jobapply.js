import React, { Component } from 'react';
import Card from "@material-ui/core/Card/Card";
import ProfileNavbar from "../Navbar/applicantNavbar";
import axios from "axios";
import {CONSTANTS} from '../../Constants';
import jwt_decode from "jwt-decode";
import { connect } from "react-redux";
import { jobDetalsByID } from "../../actions/jobSearchActions"; 
import { withRouter } from "react-router-dom";
import * as Validate from '../../validation/ValidationUtil';
class JobApply extends Component {
    constructor(props){
        super(props);
        this.state = {
            firstname:"",
            lastname:"",
            email:"",
            address: "",
            hearaboutus:"",
            sponsorship:"",
            diversity:"",
            disability:"",
            resume:"",
            coverletter:"",
            validationMessage:""
        }
        if (localStorage.getItem("applicantToken")) {
            let token = localStorage.getItem("applicantToken");
            this.decodedApplicant = jwt_decode(token);
            this.isApplicantLoggedIn = true;
            this.email = this.decodedApplicant.email;
        }
        this.applyJobHandler = this.applyJobHandler.bind(this);
        this.valueChangeHandler = this.valueChangeHandler.bind(this);
        this.backHandler = this.backHandler.bind(this);


        
        if(sessionStorage.getItem("jobId")){
            this.jobID = sessionStorage.getItem("jobId");
        }
    }


    componentDidMount(){
        axios.defaults.withCredentials = true;
        //setAuthToken(localStorage.getItem("recruiterToken"));
        let trackerdata = { "page": "30" };
        axios
            .put(`${CONSTANTS.BACKEND_URL}/recruiters/track/` + this.email, trackerdata)
            .then(response => {
                console.log("Applicant Job Apply  View Tracked ", response.data);
    
            })
            .catch(function (error) {
                console.log("Tracker errored");
                console.log(error);
            });
    }
    valueChangeHandler = (e) => {
        if(e.target.name == 'resume'){
            console.log("Target files",e.target.files);
            this.setState({
                resume:  e.target.files[0]
            });
        }else if(e.target.name == 'coverletter'){
            console.log("Target files",e.target.files);
            this.setState({
                coverletter:  e.target.files[0]
            });
        }
        else{
            this.setState({ [e.target.name]: e.target.value });
            console.log(this.state);
        }
    }
    applyJobHandler = (e) => {
        e.preventDefault();
        const data = {
            firstName: this.state.firstname,
            lastName: this.state.lastname,
            email: this.state.email,
            address: this.state.address,
            hearAboutUs: this.state.hearaboutus,
            sponsorship: this.state.sponsorship,
            diversity: this.state.diversity,
            disability: this.state.disability,
            resume: this.state.resume.name,
            coverLetter: this.state.coverletter.name
        }
        console.log("submit data",data);
        let valid = Validate.applyJob(data);
        if(valid === ''){
            axios.defaults.withCredentials = true;
            const { resume } = this.state;
            const { coverletter } = this.state;
            const formData = new FormData();
            formData.append('resume', resume);
            formData.append('coverletter', coverletter);
            axios.post(CONSTANTS.BACKEND_URL+"/api/documentsUpload/uploadResume", formData)
            .then((result=>{
                console.log("upload successful");
                
                console.log("apply job axios post", CONSTANTS.BACKEND_URL+"/applicants/"+this.email+"/jobs/"+this.jobID);
                axios.post(CONSTANTS.BACKEND_URL+"/applicants/"+this.email+"/jobs/"+this.jobID, data)
                    .then(response => {
                        console.log("job applied through regular apply");

                        axios.defaults.withCredentials = true;
                        axios
                            .put(`${CONSTANTS.BACKEND_URL}/recruiters/jobs/logs/completed-count`, { "jobid": sessionStorage.getItem("jobId") })
                            .then(response => {
                                console.log("Job complete count incremented ", response.data);

                            })
                            .catch(function (error) {
                                console.log("start complete errored");
                                console.log(error);
                            });
                    window.close();
                    alert("Job applied successfully");
                })
                .catch(function(error){
                    console.log(error);
                });
            }))
            .catch((error)=>{
                console.log("unable to upload");
            });  
        }
        else {
            this.setState({
                validationMessage: valid
            });
        } 
    };

    backHandler = (e) => {
        window.close();
    }
    render() { 
        let message;
        if(this.state.messagediv !== ''){
            message = this.state.validationMessage;
        } else {
            message = "";
        }
        return ( 
            <div>
                <ProfileNavbar />
                <Card className="w-80 p-3 ml-5">
                    <form className="form-group">
                        <label className = "form-group" style={{color:"red"}}>
                            {message}
                        </label>
                        <div className="row">
                            <div className="col">
                                <label>First name</label>
                                <input type="text" className="form-control" placeholder="First name" name="firstname" onChange={this.valueChangeHandler}/>
                            </div>
                            <div className="col">
                                <label>Last name</label>
                                <input type="text" className="form-control" placeholder="Last name" name="lastname" onChange={this.valueChangeHandler}/>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="inputAddress">email</label>
                            <input type="text" className="form-control" id="inputAddress" placeholder="email" name="email" onChange={this.valueChangeHandler}/>
                        </div>
                        <br />
                        <br />
                        <div class="form-group">
                            <label for="inputAddress">Address</label>
                            <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St, city state zip" name="address" onChange={this.valueChangeHandler}/>
                        </div>
                        <br />
                        <div>
                            <label >How did you hear about us?</label>
                            <input type="text" className="form-control" placeholder="Type your response here" name="hearaboutus" onChange={this.valueChangeHandler}/>
                        </div>
                        <br />
                        <div>
                            <label>Would you be requiring visa sponsorship to work in our company?</label>
                            <div class="form-check-inline">
                            <input className="form-check-input" type="radio" name="sponsorship" id="sponsorship" value="yes" onChange={this.valueChangeHandler}/>
                            <label className="form-check-label" for="sponsorship" value="yes">Yes</label>
                                                            
                            <input className="form-check-input" type="radio" name="sponsorship" id="sponsorship" value="no" onChange={this.valueChangeHandler}/>
                            <label className="form-check-label" for="sponsorship" value="no">No</label>
                        </div>
                        </div>
                        <br />
                        <div className="form-group">
                            <label for="inputState">Ethnicity</label>
                            <select id="inputState" className="form-control" name="diversity" onChange={this.valueChangeHandler}>
                                <option selected>Choose...</option>
                                <option value="Asian">Asian</option>
                                <option value="Latino">Latino</option>
                                <option value="American">American</option>
                                <option value="Hispanic">Hispanic</option>
                            </select>
                        </div>
                        <br />
                        <div className="form-group">
                            <label for="inputState">Do you have any disability?</label>
                            <select id="inputState" className="form-control" name="disability" onChange={this.valueChangeHandler}>
                                <option selected>Choose...</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                        </div>
                        <br />
                        <div class="form-group">
                            <label>Upload your resume</label>
                            <input type="file" className="form-control-file" id="exampleFormControlFile1" name="resume" onChange={this.valueChangeHandler}/>
                        </div>
                        <br />
                        <div class="form-group">
                            <label>Upload your cover letter</label>
                            <input type="file" className="form-control-file" id="exampleFormControlFile1" name="coverletter" onChange={this.valueChangeHandler}/>
                        </div>
                        <div class= "form-group btn-toolbar">
                            <button type="button" className="btn btn-default" onClick={this.backHandler}>Back</button>
                            <button type="button" className="btn btn-primary" onClick={this.applyJobHandler}>Submit Application</button>
                        </div>
                    </form>
                </Card>
            </div>
         );
    }
}
 
const mapStateToProps = state => ({
    jobSearchReducer: state.jobSearchReducer,
    applicantProfile: state.applicantProfile
  });
  
  export default connect(
    mapStateToProps,
    { jobDetalsByID }
  )(withRouter(JobApply));