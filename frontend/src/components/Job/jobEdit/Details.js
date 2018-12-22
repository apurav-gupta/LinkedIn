import React from 'react';
import '../jopost.css';
const details = (props) => {
    return(
        <div>
            <div className = "container">
            <div className = "panel panel-default container" style = {{backgroundColor: '#f8f9fa', paddingTop: '55px'}}>
            <h1 data-test-post-page-title="" className="jobs__main-title">
                <b>Step 1:</b> What job do you want to post?
            </h1>
            <form className = "needs-validation" novalidate>
                <div className="form-row">
                    <div className="col-md-3">
                        <label className = "label-job required" for="validationDefault01">Company</label>
                        <input type="text" onChange= {props.companyChange} className=" form-control input-fields" id="validationDefault01" placeholder="Company"  defaultValue={props.state.jobCompany}
                            required />
                    </div>
                    <div className="col-md-3 ">
                        <label className = "label-job required" for="validationDefault02">Job title</label>
                        <input type="text" onChange= {props.TitleChange} className="form-control input-fields" id="validationDefault02" placeholder="Job title"  defaultValue={props.state.jobTitle}
                            required />
                    </div>
                    <div className="col-md-3 mb-3">
                        <label className = "label-job required" for="validationDefault02">Location</label>
                        <input type="text" onChange= {props.locationChange} className="form-control input-fields" id="validationDefault02" placeholder="Location"  defaultValue={props.state.jobLocation}
                            required />
                    </div>
                </div>
                <div className="form-row">
                    <div className="col-md-6 mb-3">
                        <label className = "label-job required" for="validationDefault03">Job function (Select up to 3) </label><br></br>
                        <input type="text" onChange= {props.functionChange} className="form-control input-fields" id="validationDefault03" placeholder="Enter Job functions" required  defaultValue={props.state.jobFunction} />
                    </div>
                    <div className="col-md-3 mb-3">
                        <label className = "label-job required" for="validationDefault04">Employment type</label><br></br>
                        <select id="select-input-ember1718" onChange ={props.employmentTypeChange} required="" aria-describedby="select-input-error-text-ember1718" data-test-select="" className="form-control select-input__select" defaultValue={props.state.jobEmploymentType}>
                            <option value="" data-test-select-option="">Choose one…</option>
                            <option value="FULL_TIME" data-test-select-option="">
                                Temporary
                            </option>
                            <option value="PART_TIME" data-test-select-option="">
                                Part-time
                            </option>
                            <option value="CONTRACT" data-test-select-option="">
                                Full-time
                            </option>
                            <option value="TEMPORARY" data-test-select-option="">
                                Contract
                            </option>
                            <option value="VOLUNTEER" data-test-select-option="">
                                Volunteer
                            </option>
                            <option value="INTERNSHIP" data-test-select-option="">
                                Internship
                            </option>
                        </select>
                    </div>
                </div>
                <div className="form-row">
                    <div className="col-md-6 mb-3">
                        <label className = "label-job required" for="validationDefault03">Company industry (Select up to 3) </label><br></br>
                        <input type="text" onChange ={props.industryChange} className="form-control input-fields" id="validationDefault03" placeholder="Enter Company industry" required defaultValue={props.state.jobIndustry}/>
                    </div>
                </div>
                <div className="form-row">
                    <div className="col-md-9">
                        <label className = "label-job required" for="validationDefault01">Job Description</label>
                        <textarea type="text" value={props.state.jobDescription} onChange ={props.DescriptionChange} className=" form-control input-fields" id="validationDefault01" placeholder="Company" 
                            required >  </textarea>
                    </div>
                </div>
                <br/>
                <div className="row" >
                    <div id = "back-de" className="col-xs-4">
                        <a style = {{backgroundColor: "0073b1"}} className="btn btn-primary" data-toggle="tab" label="Back" href="#location"
                        type="button"><span >Continue</span></a>
                        {/* <div style ={{paddingLeft: '40px'}}>
                        <a  className="btn btn-default" data-toggle="tab" label="Back" href="#photos"
                        type="button"><span >Next</span></a>
                        </div> */}
                    </div>
                </div>
                {/* <div style ={{paddingTop: '10px', paddingBottom: '25px' , textAlign: 'center'}} >
                    <div className="row">
                        <div id = "back-de" className="col-md-6">
                            <a className="btn btn-primary continue-button" data-toggle="tab" label="Back" href="#location"
                            type="button"><span >Back</span></a>
                        </div>
                        <div id="next-de" className="col-md-6">
                        <a className="btn btn-primary btn-rounded btn-sm" label="Next" data-toggle="tab" href="#photos"
                            type="button"><span className="btn__label">Next</span></a></div>
                    </div>
                </div> */}
                {/* <button className="btn btn-primary" type="submit">Submit form</button> */}
            </form>
            </div>
            </div>
        </div>
    )
}
 
export default details;
// const details = (props) => {
//     return(
//         <div>
//         <h1> Hello world!</h1>
//             {/* <div className="panel panel-default">
//                 <div className="panel-body">
//                     <div>
//                         <div className="checklist-header-container ">
//                             <h3><span>Describe your property</span></h3>
//                             <hr></hr>
//                         </div>
//                             <div>
//                                 <form role="form">
//                                     <div><span>Start out with a descriptive headline and a detailed summary of your property.</span></div>
//                                     <div className="row headline-container out-of-limits">
//                                         <div className="col-xs-12">
//                                             <div className="form-group floating-label not-empty">
//                                                 <input className="form-control"  aria-label="Headline"
//                                                     aria-invalid="false" aria-describedby="headline__help" id="headline" name="headline"
//                                                     type="text" />
//                                                 </div>
//                                         </div>
//                                     </div>
//                                     <div className="row out-of-limits">
//                                         <div className="col-xs-12">
//                                             <div className="form-group floating-label not-empty">
//                                             <textarea className="FormTextArea__textarea form-control" 
//                                                 aria-label="Property description" aria-describedby="description__help" id="description"
//                                                 name="description" rows="8">avaiable in the prime area</textarea><label className="FormTextArea__floating-label"
//                                                     for="description">Property description</label></div>
//                                         </div>
//                                     </div>
//                                     <div className="row">
//                                         <div className="col-xs-12 col-lg-6">
//                                             <div className="form-group floating-label not-empty"><label>Property type</label>
//                                                 <div className="FormSelect__wrapper">
//                                                 <select aria-label="Property type"  name="propertyType"
//                                                     className="form-control FormSelect__select">
//                                                     <option value="apartment">Apartment</option>
//                                                     <option value="barn">Barn</option>
//                                                     <option value="bed &amp; breakfast">Bed &amp; Breakfast</option>
//                                                     <option value="boat">Boat</option>
//                                                     <option value="bungalow">Bungalow</option>
//                                                     <option value="cabin">Cabin</option>
//                                                     <option value="campground">Campground</option>
//                                                     <option value="castle">Castle</option>
//                                                     <option value="chalet">Chalet</option>
//                                                     <option value="country house / chateau">Chateau / Country House</option>
//                                                     <option value="condo">Condo</option>
//                                                     <option value="corporate apartment">Corporate Apartment</option>
//                                                     <option value="cottage">Cottage</option>
//                                                     <option value="estate">Estate</option>
//                                                     <option value="farmhouse">Farmhouse</option>
//                                                     <option value="guest house/pension">Guest House</option>
//                                                     <option value="hostel">Hostel</option>
//                                                     <option value="hotel">Hotel</option>
//                                                     <option value="hotel suites">Hotel Suites</option>
//                                                     <option value="house">House</option>
//                                                     <option value="house boat">House Boat</option>
//                                                     <option value="lodge">Lodge</option>
//                                                     <option value="Mill">Mill</option>
//                                                     <option value="mobile home">Mobile Home</option>
//                                                     <option value="Recreational Vehicle">Recreational Vehicle</option>
//                                                     <option value="resort">Resort</option>
//                                                     <option value="studio">Studio</option>
//                                                     <option value="Tower">Tower</option>
//                                                     <option value="townhome">Townhome</option>
//                                                     <option value="villa">Villa</option>
//                                                     <option value="yacht">Yacht</option>
//                                                 </select>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="row">
//                                         <div className="col-xs-12 col-lg-6">
//                                             <div className="form-group floating-label not-empty">
//                                                 <input className="form-control"  aria-label="Bedrooms"
//                                                     aria-invalid="false" id="bedrooms" name="bedrooms" type="number" step="1" min = "1"/>
//                                                 <label className="" for="bedrooms">Bedrooms</label></div>
//                                         </div>
//                                     </div>
//                                     <div className="row">
//                                         <div className="col-xs-12 col-lg-6">
//                                             <div className="form-group floating-label not-empty">
//                                                 <input className="form-control"  aria-label="Accommodates"
//                                                     aria-invalid="false" id="sleeps" name="sleeps" type="number" max="500" min="1"
//                                                     step="1" /><label className="" for="sleeps">Accommodates</label></div>
//                                         </div>
//                                     </div>
//                                     <div className="row">
//                                         <div className="col-xs-12 col-lg-6">
//                                             <div className="form-group floating-label not-empty">
//                                                 <input className="form-control"  aria-label="Bathrooms"
//                                                     aria-invalid="false" id="bathrooms" name="bathrooms" type="number" max="500"
//                                                     min="1" step="0.5" /><label className="" for="bathrooms">Bathrooms</label></div>
//                                         </div>
//                                     </div>
//                                 </form>
//                             </div>
//                         </div>
//                         <hr></hr>
//                             <div style ={{paddingTop: '10px', paddingBottom: '25px' , textAlign: 'center'}} className="panel-control step-footer-wrapper">
//                                 <div className="row">
//                                     <div id = "back-de" className="col-xs-6">
//                                         <a className="btn btn-default btn-rounded btn-sm" data-toggle="tab" label="Back" href="#location"
//                                         type="button"><span className="btn__label">Back</span></a>
//                                     </div>
//                                     <div id="next-de" className="col-xs-6">
//                                     <a className="btn btn-primary btn-rounded btn-sm" label="Next" data-toggle="tab" href="#photos"
//                                         type="button"><span className="btn__label">Next</span></a></div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div> */}
//                 </div>
//     )
// }

// export default details;