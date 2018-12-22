import React from 'react';
import {extractNameFromEmail,capitalizeFirstLetter} from '../../../utility';
import '../jopost.css';
import jwtDecode from 'jwt-decode';
const welcome = () => {
    return(
    <div id="tab-content" className="container">
        <div className="col-md-8 checklist-content property-container tab-pane fade in active">
            <div className="checklist-page">
                <div>
                    <div className="checklist-summary-header ">
                        <h1><span>Welcome! {capitalizeFirstLetter(extractNameFromEmail(jwtDecode(localStorage.getItem('recruiterToken')).email))}</span> </h1>
                        <p><span><img className="" alt="Idea" src="/bulb.png" />Let's Begin, Show your job to the right candidates</span></p>
                    </div>
                </div><br/>
                <div>
                    <div id = "continueNext" className="checklist-buttons">
                        <div><a  href = "#details" data-toggle="tab" ref= {nextTab => this.nextTab = nextTab}></a>
                        <button onClick={()=> this.nextTab.click()} className="btn btn-primary continue-button"><span>Continue</span></button></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

// {capitalizeFirstLetter(jwtDecode(localStorage.getItem('token')).firstname)}

export default welcome;