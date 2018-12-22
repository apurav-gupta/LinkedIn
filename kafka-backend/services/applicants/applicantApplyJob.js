// Load Property model
const ApplicantUser = require("../../Model/Applicant");
const JobsModel = require("../../Model/Jobs");
const JobApplicationModel = require("../../Model/JobApplication");

function handle_request(msg, callback) {
  
  var newJobApplication = new JobApplicationModel(); //intialize the subdocument

  console.log("In handle request Apply Jobs:" + JSON.stringify(msg));
  //check whether applicant has already applied for this job
  JobsModel.findOne({ "jobApplication.applicant_id": msg.applicantId }),
    function(err, jobApp) {
      console.log("Check if applicant has already applied for same job");
      if (jobApp) {
        console.log("Applicant has already applied");
        callback(err, { success: false, status: "Already applied to job" });
      } else {
        console.log("Applicant has not applied before ");
        //create a newJobApplication subdocument 

        newJobApplication.applicant_id = msg.applicantId;
        newJobApplication.firstName = msg.data.first_name;
        newJobApplication.lastName = msg.data.last_name;
        newJobApplication.address = msg.data.address;
        newJobApplication.hearAboutUs = msg.data.referral;
        newJobApplication.diversity = msg.data.diversity;
        newJobApplication.sponsorship = msg.data.sponsorship;
        newJobApplication.disability = msg.data.disability;
        newJobApplication.resume = msg.data.resume;
        newJobApplication.cover_letter = msg.data.cover_letter;

        //find the correct job document to append to 
        JobsModel.findOneAndUpdate(
          { _id: msg.jobId },
          {
            $push: { jobApplications: newJobApplication },
            $inc: { noOfViews: 1 }
          },
          jobsModel.save(function(err) {
            if (err)
              callback(err, {
                success: false,
                status: "Job Application push fail"
              });
            console.log("Jobs schema", msg.jobId ,"updated with new Job application ")  
            //add jobId into applicant Collection as appliedJobs
            ApplicantUser.findOneAndUpdate(
              { _id: msg.applicantId },
              { $push: { appliedJobs: msg.jobId } },
              function(err, res) {
                if (error) {
                  console.log("unable to update applicant user");

                  callback(error, { status: false });
                }
                console.log("applicant ", msg.applicantId, "  document updated");
                console.log(res);
                callback(null, { success: true, status: "job applied" });
              }
            );
          })
        );
      }
    };
}

// exports.handle_request = handle_request;
