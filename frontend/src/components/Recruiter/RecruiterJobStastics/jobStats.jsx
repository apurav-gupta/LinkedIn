import React, {Component} from "react";
import axios from "axios";
import './stats.css';
import jwtDecode from "jwt-decode";
import {usaDateFormat} from '../../../utility';
import {CONSTANTS} from "../../../Constants";


export default class JobListingComponent extends Component {
    imageArr = "";
    resumeClicked = false ;

    // imageArr = ['data:image/png;base64,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']
    constructor(props) {
        super(props);

        this.state = {
             recruiter: localStorage.getItem('recruiterToken')?jwtDecode(localStorage.getItem('recruiterToken')).email : "",
            
            jobId: this.props.jobid,
            jobData: "",
            getPDF: false
        };
    }

    componentDidMount() {
        console.log("Recruiter is ", this.state.recruiter);
        axios
            .get(`${CONSTANTS.BACKEND_URL}/jobs/` + this.props.jobId)
            .then(response => {
                console.log("Inside JobStats response data in component didmount:", response.data.data[0].jobApplications[0]);
                this.setState({
                    jobData: response.data.data[0].jobApplications
                });
            })
            .catch(function (error) {
                console.log("errored in component did mount jobStats");
                console.log(error);
            });
    }

    //Get the PDF in base64 Format
    handleGetPhoto = (fileName) => {
        console.log("Inside Handle Get Photo Handler");
        axios.post(`${CONSTANTS.BACKEND_URL}/api/photos/downloadpdf/` + fileName)
            .then(response => {
                console.log("Image Res : ", response);
                let imagePreview = 'data:application/pdf;base64, ' + response.data;
                console.log("Base 64 format of PDF: ", imagePreview);
                this.imageArr = imagePreview ;
                this.resumeClicked = true ;

                this.setState({
                    getPDF: true
                })
                console.log("value of getPDF: ", this.state.getPDF);
            });
    }
    buttonViewResume = e => {
        e.preventDefault();
        var photoD = e.target.value;
        // var photoArray = JSON.parse(photoD);
        this.handleGetPhoto(photoD);

    };


    crossClicked(){
        this.resumeClicked = false ;
        this.setState({
            ...this.setState
        })
    }

    render() {
        console.log("Inside JobStats, jOb Id: ", this.props.jobId)
        var allImgs = Array.prototype.slice.call(this.state.jobData);


        if (this.resumeClicked) {

            return (

                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">Resume</h5>
                                <button type="button" className="close" onClick={this.crossClicked.bind(this)}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <embed src={this.imageArr} width="650" height="700"
                                       type='application/pdf'/>
                            </div>
                            <div className="modal-footer">
                                <p>PDF content...</p>
                            </div>
                        </div>
                    </div>
               )
        }


        return (
            <div>
                <div
                    className="card"
                    style={{
                        // margin: "50px",
                        // marginRight: "10px",
                        // padding: "40px",
                        // paddingBottom: "100px",
                        marginTop: "2rem",
                        backgroundColor: "#FAFAFA",
                        borderRadius: "10px"
                    }}
                >

                    <h1 data-test-post-page-title="" className="jobs__main-title"
                        style={{marginLeft: "5rem", marginTop: "3rem", marginBottom: "2rem"}}>
                        <b><span
                            style={{fontSize: "130%", color: "#006097"}}>{this.state.jobData.length}</span> Applicant
                            applied for the this Job</b>
                    </h1>
                    {allImgs.map((job, i) => (
                        <div
                            className="card"
                            style={{
                                marginLeft: "3rem",
                                marginRight: "3rem",
                                marginBottom: "1rem",
                                //  marginLeft: "3rem",
                                borderRadius: "10px",
                                boxShadow:
                                    "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
                            }}
                        >
                            <ul
                                className="list-group list-group-flush"
                                style={{margin: "5px"}}
                            >
                                <li
                                    className="list-group-item"
                                    key={i}
                                    style={{margin: "10px"}}
                                >
                                    <div className="card-body">
                                        <h4 style={{fontSize: "120%", color: "#006097"}}>{job.applicant_id}</h4>

                                        <dl className="form-row">
                                            <dl className="col-sm-7">
                                                <dt className="col-sm-4">First Name :</dt>
                                                <dd className="col-sm-8"> {job.firstName}</dd>
                                                <dt className="col-sm-4">Last Name :</dt>
                                                <dd className="col-sm-8"> {job.lastName}</dd>
                                                <dt className="col-sm-4">Applied On :</dt>
                                                <dd className="col-sm-8"> {usaDateFormat(job.appliedOn)}</dd>
                                            </dl>
                                            <dl className="col-sm-3">
                                                <dl className="row">
                                                    <button data-role="popup"
                                                            data-toggle="modal"
                                                            data-target="#resumeModal"
                                                            className="btn btn-primary"
                                                            style={{margin: "1px", width: "13rem", fontWeight: "600"}}
                                                            value={job.resume}
                                                            onClick={this.buttonViewResume}
                                                            type="button"
                                                    >
                                                        View Resume
                                                    </button>
                                                </dl>
                                            </dl>
                                        </dl>
                                    </div>
                                </li>
                            </ul>

                        </div>
                    ))}
                </div>
            </div>
        );
    }
}
