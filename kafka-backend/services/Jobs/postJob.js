var jobsModel = require("../../Model/Jobs");

const mongoose = require('mongoose');

function handle_request(msg, callback){
    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));
    var email = msg.email;

    //Query to update the parameters received
    var newJob = new jobsModel();
    var companyLogoStored = "";
    (msg.jobCompanyLogo.length === 0)? companyLogoStored = "preview.png" : companyLogoStored = msg.jobCompanyLogo;
    newJob._id = new mongoose.Types.ObjectId();
    newJob.recruiterId = email;
    newJob.companyName = msg.jobCompany;
    newJob.title = msg.jobTitle;
    newJob.location = msg.jobLocation;
    newJob.jobFunction = msg.jobFunction;
    newJob.employmentType = msg.jobEmploymentType;
    newJob.industry = msg.jobIndustry;
    newJob.description = msg.jobDescription;
    newJob.easyApply = msg.jobEasyApply;
    newJob.companyLogo = companyLogoStored;
    newJob.savedBy = msg.jobsavedBy||[];
    newJob.jobApplications = [];
    newJob.noOfViews = 0;
    newJob.postedDate = msg.memberSince||Date.now();
    newJob.save()
    .then(job=>{
        console.log("Job created: ", job);
        res.code = 201;
        res.result = job;
        callback(null, res);
    })
    .catch(err => {
        console.log(err);
        res.err = 'Unable to create Job';
        res.code = 400;
        callback(null, res);
    });
}
exports.handle_request = handle_request;

