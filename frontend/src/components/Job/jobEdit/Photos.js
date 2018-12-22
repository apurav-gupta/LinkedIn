import React from 'react';
import '../jopost.css';
import Dropzone from 'react-dropzone';
import { PropTypes } from 'prop-types';

const photos =(props)=> {
    return (
        <div className="container ">
            <div className="panel panel-default container" style = {{backgroundColor: '#f8f9fa', paddingTop: '55px'}}>
            <h1 data-test-post-page-title="" className="jobs__main-title">
                <b>Step 2:</b> Add Company Logo and Job feature
            </h1>
                <div className="panel-body">
                    <div className="checklist-header-container">
                        <div className="le-nav-header">
                            <div style={{ paddingTop: '25px', textAlign: 'center' }} className="le-nav-header">
                                <h2 className="nav-header-text">Add your company logo</h2>
                            </div>
                            <hr></hr>
                        </div>
                        <div style={{ border: '1px, solid red' }} className="pyl-photos-container">
                            <div className="pyl-photos-content">
                                <div className="pyl-photos-photo-drop">
                                    <div id="inside-upload-area">
                                        <div  className="pyl-photos-photo-drop-inside">
                                            {/* <div style={{ border: "2px dashed #C0C0C0", margin: "15px" }}>
                                                <h2 className="photo-drop-title text-muted">Drop photos here</h2>
                                                <h2 className="photo-drop-OR text-muted">or</h2>
                                                <h2 className="photo-drop-error text-muted">Only JPEG images are supported</h2> */}
                                                <div style = {{}}>
                                                <Dropzone onDrop={props.companyLogoChange}
                                                        multiple = {false}
                                                        accept="image/*, .pdf"
                                                        type="file"
                                                        style={{"width" : "150px", "height" : "150px", "border" : "2px dashed black", "marginLeft": "465px", }}>
                                                    <div style = {{ textAlign: 'center' , paddingTop : '50px'}}>Drop company logo to upload.</div>
                                                </Dropzone>
                                                </div>
                                            {/* </div> */}
                                            <br />
                                            <div>
                                                <label style={{ textAlign: 'center', marginLeft: "480px"}} for="uploadPhotoInput" className="photo-drop-button btn btn-primary btn-rounded btn-sm">SELECT PHOTOS</label>
                                                <input style={{ display: 'none', marginLeft: "480px" }}   onChange={props.companyLogoChange} type="file" id="uploadPhotoInput" multiple="" />
                                            </div>
                                            <div className="form-check">
                                                <input onChange ={props.easyApplyChange} className="form-check-input" type="checkbox" value="" id="defaultCheck1" defaultChecked={props.state.jobEasyApply}/>
                                                <label className="form-check-label label-job-checkbox" for="defaultCheck1">
                                                    Enable the Easy apply job feature for this job.
                                                </label>
                                            </div>
                                            <hr />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="checklist-buttons" style = {{float: 'right'}}>
                                        {/* <div><a href="#details" data-toggle="tab" ref={nextTab => this.nextTab = nextTab}></a> */}
                                            <div><button onClick ={props.submitClick} className="btn btn-primary continue-button" type="submit"><span>Update Job</span></button></div>
                                    </div>
                                </div>
                                {/* <div style={{ paddingTop: '10px', paddingBottom: '25px', textAlign: 'center' }} className="panel-control step-footer-wrapper">
                                    <div className="row">
                                        <div id="back-ph" className="col-xs-6">
                                        <a className="btn btn-default btn-rounded btn-sm" label="Back" data-toggle="tab" href="#details"
                                            type="button"><span className="btn__label">Back</span></a>
                                        </div>
                                        <div id="next-ph" className="col-xs-6">
                                        <a className="btn btn-primary btn-rounded btn-sm" label="Next" data-toggle="tab" href="#availability"
                                            type="button"><span className="btn__label">Next</span></a>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default photos;