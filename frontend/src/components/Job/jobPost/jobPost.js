import React, { Component } from 'react';
// import {Redirect} from 'react-router';
import axios from 'axios';
import '../jopost.css';
import $ from 'jquery';
import Welcome from './Welocome';
import Details from './Details';
import Photos from './Photos';
import JobNavbar from '../../Navbar/JobNavbar';
import * as Validate from '../../../validation/ValidationUtil';
import jwtDecode from 'jwt-decode';
// import {postPropertyData} from '../../actions/index';
// import {connect} from 'react-redux';
// import { withRouter } from 'react-router-dom';
import {CONSTANTS} from '../../../Constants';

class PostJob extends Component {
    constructor(props) {
        super(props);
        this.state = {
                email: jwtDecode(localStorage.getItem('recruiterToken')).email,
                // email: "testrecruiter2@gmail.com",
                jobCompany: "",
                jobTitle: "",
                jobLocation: "",
                jobFunction: "",
                jobEmploymentType: "",
                jobIndustry: "",
                jobDescription: "",
                jobEasyApply: false,
                jobCompanyLogo : [],
                jobsavedBy: [],
                messagediv:"",
                jobIsPosted: false

        }
        // Bind the handlers to this class
        this.jobCompanyChangeHandler = this.jobCompanyChangeHandler.bind(this);
        this.jobTitleChangeHandler = this.jobTitleChangeHandler.bind(this);
        this.jobLocationChangeHandler = this.jobLocationChangeHandler.bind(this);
        this.jobFunctionChangeHandler = this.jobFunctionChangeHandler.bind(this);
        this.jobEmploymentTypeChangeHandler = this.jobEmploymentTypeChangeHandler.bind(this);
        this.jobIndustryChangeHandler = this.jobIndustryChangeHandler.bind(this);
        this.jobDescriptionChangeHandler = this.jobDescriptionChangeHandler.bind(this);
        this.jobEasyApplyChangeHandler = this.jobEasyApplyChangeHandler.bind(this);
        this.jobsavedByChangeHandler = this.jobsavedByChangeHandler.bind(this);
        this.jobCompanyLogoDrop = this.jobCompanyLogoDrop.bind(this);
        this.postJob = this.postJob.bind(this);
    }
    
    componentDidMount() {
        axios.defaults.withCredentials = true;
        //setAuthToken(localStorage.getItem("recruiterToken"));
        let trackerdata = { "page": "20" };
        axios
            .put(`${CONSTANTS.BACKEND_URL}/recruiters/track/` + this.state.email, trackerdata)
            .then(response => {
                console.log("Recruiter Job Posting  View Tracked ", response.data);

            })
            .catch(function (error) {
                console.log("Tracker errored");
                console.log(error);
            });
    }
    //Company change handler to update state variable with the text entered by the user
    jobCompanyChangeHandler = (e) => {
        const jobCompany = e.target.value;
        this.setState({
                ...this.state,
                jobCompany : jobCompany
        })
    }
    //Job Title change handler to update state variable with the text entered by the user
    jobTitleChangeHandler = (e) => {
        const jobTitle= e.target.value;
        this.setState({
                ...this.state,
                jobTitle : jobTitle
        })
    }
    //Job Location change handler to update state variable with the text entered by the user
    jobLocationChangeHandler = (e) => {
        const jobLocation = e.target.value;
        this.setState({
                ...this.state,
                jobLocation : jobLocation
        })
    }
    //Job Function change handler to update state variable with the text entered by the user
    jobFunctionChangeHandler = (e) => {
        const jobFunction = e.target.value;
        this.setState({
                ...this.state,
                jobFunction : jobFunction
        })
    }
    //Employment Type change handler to update state variable with the text entered by the user
    jobEmploymentTypeChangeHandler = (e) => {
        const jobEmploymentType = e.target.value;
        this.setState({
                ...this.state,
                jobEmploymentType : jobEmploymentType
        })
    }
    //Job Industry change handler to update state variable with the text entered by the user
    jobIndustryChangeHandler = (e) => {
        const jobIndustry = e.target.value;
        this.setState({
                ...this.state,
                jobIndustry : jobIndustry
        })
    }

    //Job Description change handler to update state variable with the text entered by the user
    jobDescriptionChangeHandler = (e) => {
        const jobDescription = e.target.value;
        this.setState({
                ...this.state,
                jobDescription : jobDescription
        })
    }
    //Job Easy Apply change handler to update state variable with the text entered by the user
    jobEasyApplyChangeHandler = (e) => {
        const jobEasyApply = e.target.checked;
        this.setState({
            ...this.state,
            jobEasyApply : jobEasyApply
        })
    }
    //Job Saved By change handler to update state variable with the text entered by the user
    jobsavedByChangeHandler = (e) => {
        const jobsavedBy = e.target.value;
        this.setState({
                ...this.state,
                jobsavedBy : jobsavedBy
        })
    }

    //Property Photo change handler to update state variable with the text entered by the user
    jobCompanyLogoDrop = files => {
        // Push all the axios request promise into a single array
            const uploaders = files.map(file => {
            // Initial FormData
            const formData = new FormData();
            formData.append("file", file);
            this.uid = new Date().valueOf();
            formData.append("imagename", file.name);
            this.state.jobCompanyLogo.push(file.name);
            console.log(file.name);
            formData.append("timestamp", (Date.now() / 1000) | 0);

            return axios.post(`${CONSTANTS.BACKEND_URL}/api/photos/uploadPhotos`, formData, {
                params: {
                    imagename: file.name
                }
            })
                .then(response => {
                    const data = response.data;
                    // const fileURL = data.secure_url // You should store this URL for future references in your app
                    console.log(data);
                    if (response.status === 200) {
                        console.log("Photo uploaded successfully.")
                    }
                })
        });

        // Once all the files are uploaded
        axios.all(uploaders).then(() => {
            // ... perform after upload is successful operation
        });
    }

    //Post Job handler to send a request to the node back-end
    postJob = (event) => {
        //prevent page from refresh
        event.preventDefault();
        // let valid = '';
        let valid = Validate.postJob(this.state);
        if(valid === '') {
            const jobData = {
                        ...this.state
                }
            // this.props.postJobData( jobData,false);
            //Post Call to post Property Details in DB
            //set the with credentials to true
            axios.defaults.withCredentials = true;
            //make a post request with the user data
            axios.post(`${CONSTANTS.BACKEND_URL}/jobs`,
            jobData,{
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // 'Authorization': localStorage.getItem('recruiterToken')
            },
            })
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.status === 201){
                    this.setState({
                        ...this.state,
                        jobIsPosted : true
                    })
                    // this.props.postJobData(jobData,true);
                    console.log("message:", response.data.message);
                    alert("Your job was successfully posted.");
                }else{
                    this.setState({
                        ...this.state,
                        jobIsPosted : false
                    })
                    // this.props.postJobData(jobData,false);
                    alert("Your job was not successfully posted.");
                }
            })
            .catch( error =>{
                console.log("error:", error);
            });
        } else {
            this.setState({
                ...this.state,
                messagediv: valid
            });
            event.preventDefault();
        }
    }

    render() {
        let message = null;
        if(this.state.messagediv !== ''){
            message = (
                <div className="clearfix">
                    <div className="alert alert-info text-center" role="alert">{this.state.messagediv}</div>
                </div>
            );
        } else {
            message = (
                <div></div>
            );
        }
        // redirect based on successful login
        let redirectVar = null;
        // if (!localStorage.getItem('token')) {
        //     redirectVar = <Redirect to="/job"/>
        //     return (redirectVar);
        // } else if(this.state.propIsPosted) {
        //     redirectVar = <Redirect to ="/job"/>
        //     return(redirectVar);
        // } else {
            return (
                <div>
                    <JobNavbar/>
                    <div className = "">
                        {message}
                    </div>
                    <div className="wrapper">
                        <nav id="sidebar">
                            <div id = "sidebarCollapse" className="sidebar-header" style={{paddingTop:"50px", paddingBottom: "0px"}}>
                                <h3 style= {{fontSize: "30px", fontWeight: '550'}}>Job Details</h3>
                                <strong>JD</strong>
                            </div>
                            <ul className="list-unstyled components flex-column">
                                <li className = "active" id = "wc">
                                    <a className = "nav-link" href="#welcome" data-toggle="tab" aria-expanded = "false">
                                        <i className="fa fas fa-home"></i>
                                        Welcome
                                    </a>
                                </li>
                                <li id = "de" className = "nav-item">    
                                    <a className = "nav-link" href="#details" data-toggle="tab" aria-expanded = "false">
                                        <i className="fa fas fa-copy"></i>
                                        Details
                                    </a>
                                </li>
                                <li id = "ph" className = "nav-item">
                                    <a className = "nav-link" href="#photos" data-toggle="tab" aria-expanded = "false">
                                        <i className="fa fas fa-image"></i>
                                        Company Logo
                                    </a>
                                </li>
                            </ul>
                        </nav>
                        <div className="col-sm-10">
                            <div id = "side" className="tab-content">
                                <div id="welcome" className="tab-pane fade in active">
                                    <Welcome />
                                </div>
                                <div id="details" className="tab-pane fade">
                                    <Details 
                                    companyChange = {this.jobCompanyChangeHandler}
                                    TitleChange = {this.jobTitleChangeHandler}
                                    locationChange = {this.jobLocationChangeHandler}
                                    functionChange = {this.jobFunctionChangeHandler}
                                    employmentTypeChange = {this.jobEmploymentTypeChangeHandler}
                                    industryChange = {this.jobIndustryChangeHandler}
                                    DescriptionChange = {this.jobDescriptionChangeHandler}
                                    />
                                </div>
                                <div id="photos" className="tab-pane fade" >
                                    <Photos 
                                    companyLogoChange = {this.jobCompanyLogoDrop}
                                    easyApplyChange = {this.jobEasyApplyChangeHandler}
                                    submitClick = {this.postJob}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        // }
    }
}

// function mapDispatchToProps(dispatch) {
//     return {
//         postPropertyData: (propertyData, isPosted) => dispatch(postPropertyData(propertyData, isPosted)),
//     };
// }

// function mapStateToProps(state) {
//     return{
//         propertyData : state.propertyData,
//     };
// }
// const postproperty = withRouter(connect(mapStateToProps, mapDispatchToProps)(PostProperty));
// export default postproperty;
export default PostJob;