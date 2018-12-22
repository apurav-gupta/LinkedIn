//Load Messages Model
const Applicants = require('../../Model/Applicant');
const Jobs = require("../../Model/Jobs");

function handle_request(msg, callback) {
  // console.log("KAFKA : getJobsTitleLocation --> ", msg.title, msg.location);
  console.log("In handle request:" + JSON.stringify(msg));
  var email = msg.email;
  var applicantSavedJobs ={};
  var applicantArr =[];
  Applicants.find({email: email})
  .then(applicant =>{
      console.log("result applicant", applicant);
      if(!applicant) {
        callback(null, {
            success: false,
            status: "Applicant does not exist"
          });
      } else {
          console.log("value of applicant: ", applicant[0]);
        applicantSavedJobs = applicant[0];
        applicantArr = applicantSavedJobs.savedJobs;
        console.log("saved Jobs", applicantArr);
        Jobs.find({_id: { "$in": applicantArr}})
         .then(jobs=> {
            callback(null, {
                success: true,
                status: 200,
                data: jobs
            })
         })
         .catch(error => {
            console.log("Error in fetching job details");
            callback(error, {
            success: false,
            status: "Failed connecting to Mongo to fetch jobs"
            });
        });
      }

  })
.catch(error => {
    console.log("Error at connecting to Jobs");
    callback(error, {
    success: false,
    status: "Failed connecting to Mongo in Application saved jobs"
    });
});
}

exports.handle_request = handle_request;
