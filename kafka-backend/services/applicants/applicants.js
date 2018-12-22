// Load Property model
const ApplicantUser = require("../../Model/Applicant");
const JobsModel = require("../../Model/Jobs");
const JobApplicationModel = require("../../Model/JobApplication");

exports.handle_request = function handle_request(msg, callback) {
  switch (msg.path) {
    case "jobSave":
      JobSaveApplicant(msg, callback);
      break;
    case "jobApply":
      JobApplyApplicant(msg, callback);
      break;
  }
};

function JobSaveApplicant(msg, callback) {
  //Update applicant schema ADD jobid into savedJobs
  //store applicant id in savedJobs of Jobs
  console.log("In handle request Save Jobs:" + JSON.stringify(msg));

  ApplicantUser.update(
    { email: msg.applicantId },
    {
      $push: { savedJobs: msg.jobId }
    },
    function(err, res) {
      if (err) {
        console.log("unable to update saved jobs ");

        callback(error, {
          code: 500,
          success: false,
          status: "Unable to update saved jobs"
        });
      }
      else{
      JobsModel.update(
        { _id: msg.jobId },
        { $push: { savedBy: msg.applicantId } },
        function(error, res) {
          if (error) {
            console.log("unable to update saved by");

            callback(error, { status: false });
          }
          console.log("Job ", msg.jobId, "   updated");
          console.log(res);
          callback(null, { code: 200, success: true, status: "Job saved" });
        }
      );
      }
    }
  );
}

/**************************NOT WORKIMG 
 * MONGO GETS UPDATED, BUT RESPONSES WITH 500 LINE 106************************************/
function JobApplyApplicant(msg, callback) {
  var newJobApplication = new JobApplicationModel(); //intialize the subdocument

  console.log(
    "In handle request Apply Jobs:" +
      JSON.stringify(msg) +
      "applicant id is " +
      JSON.stringify(msg.applicantId)
  );
  //check whether applicant has already applied for this job
  // JobsModel.findOne({ "jobApplications.applicant_id": msg.applicantId },{'jobApplications.$':1})
  //   .then(applicant => {
  //     console.log("applicant is ", applicant);

  //     if (applicant) {
  //       console.log("Applicant has already applied");
  //       callback(null, { code: 200, success: false, status: "Already applied to job" });
  //     }
      
        newJobApplication.applicant_id = msg.applicantId;
        newJobApplication.firstName = msg.data.firstName;
        newJobApplication.lastName = msg.data.lastName;
        newJobApplication.address = msg.data.address;
        newJobApplication.hearAboutUs = msg.data.hearAboutUs;
        newJobApplication.diversity = msg.data.diversity;
        newJobApplication.sponsorship = msg.data.sponsorship;
        newJobApplication.disability = msg.data.disability;
        newJobApplication.resume = msg.data.resume;
        newJobApplication.coverLetter = msg.data.coverLetter;
        console.log("new job application", newJobApplication);
        //find the correct job document to append to
        JobsModel.findOneAndUpdate(
          { _id: msg.jobId },
          {
            $push: { jobApplications: newJobApplication },
            $inc: { noOfViews: 1 }
          }
        )
          .then(jobApplication => {
            console.log(
              "Jobs schema      ",
              jobApplication,
              "     updated with new Job application "
            );
            ApplicantUser.findOneAndUpdate(
              { email: msg.applicantId },
              { $push: { appliedJobs: msg.jobId } }
            )
              .then(result => {
                console.log("applicant ", result, "  document updated");
                callback(null, { code: 200, success: true, status: "job applied" });
              })
              .catch(applicantError => {
                console.log("unable to update applicant user", applicantError);

                callback(null, { success: false, status: "unable to apply job" });
              });
          })
          .catch(errorApplication => {
            console.log(
              "Error in updating JobApplication subdocument ",
              errorApplication
            );
            callback(null, {
              success: false,
              status: "error for updating job applicant subdocument"
            });
          });
        
    // })
    // .catch(err => {
    //   console.log("Errored inside apply job", err);
    //   callback(null, {
    //     success: false,
    //     status: "error for find job applicant"
    //   });
    // });
}
