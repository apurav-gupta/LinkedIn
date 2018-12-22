var applicantModel = require("../Model/Applicant");
var recruiterModel = require("../Model/Recruiter");
var jobsModel = require("../Model/Jobs");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const JWT_KEY = "secret";

var mongo = require("../db/mongo");
var mongoURL = "mongodb://mithun:password273@ds121753.mlab.com:21753/linkedin";
var ObjectId = require("mongodb").ObjectID;
require("dotenv").config();

exports.handle_request = function handle_request(msg, callback) {
  switch (msg.path) {
    case "getJobsTitleLocation":
      getJobsTitleLocation(msg, callback);
      break;
    case "getJobsDetail":
      getJobsDetail(msg, callback);
      break;
    case "getSavedJobsNumber":
      getSavedJobsNumber(msg, callback);
      break;
    case "listOfJobs":
      getListOfJobs(msg, callback);
      break;
  }
};

//jobModel.aggregate([{$match: {recruiterId: msg.recruiterId}}, {$project: {savedBy: {$size: '$savedBy'}}}])
function getSavedJobsNumber(msg, callback) {
  console.log("KAFKA: getSavedJobsNumber --->", msg.recruiterId);
  jobsModel
    .aggregate([
      { $match: { recruiterId: msg.recruiterId } },
      { $project: { title: "$title", savedBy: { $size: "$savedBy" } } },
      { $match: { savedBy: { $gt: 0 } } }
    ])
    .then(savedJobsCount => {
      console.log("result of saved job count", savedJobsCount);
      if (!savedJobsCount) {
        console.log("inside if");
        callback(null, {
          success: false,
          status: "no results found"
        });
      }
      console.log("suc");
      callback(null, {
        success: true,
        status: "results found",
        data: savedJobsCount
      });
    })
    .catch(error => {
      console.log("Error at connecting to saved jobs");
      callback(error, {
        success: false,
        status: "failed connecting to DB at getSavedJobsNumber"
      });
    });
}

//Search Job based on title and location
// function getJobsTitleLocation(msg, callback) {
//   // console.log("KAFKA : getJobsTitleLocation --> ", msg.title, msg.location);
//   console.log("In handle request:" + JSON.stringify(msg));
//   var title = msg.jobname;
//   var location = msg.joblocation;

//   //not working with array? ? ?
//   jobsModel
//     .find({ $or: [{ title: title }, { location: location }] })
//     .then(job => {
//       console.log("result of jobs", job);
//       if (!job) {
//         callback(null, {
//           success: false,
//           status: "Job doesnt exist in getJobsTitleLocation"
//         });
//       }
//       callback(null, {
//         success: true,
//         status: "Job fetched Success",
//         data: job
//       });
//     })
//     .catch(error => {
//       console.log("Error at connecting to Jobs");
//       callback(error, {
//         success: false,
//         status: "Failed connecting to Mongo in getJobsTitleLocation"
//       });
//     });
// }

//GET jobs details based on job_id
function getJobsDetail(msg, callback) {
  console.log("KAFKA : getJobsDetail --> ", msg.id);
  jobsModel
    .find({ _id: msg.id })
    .then(job => {
      if (!job) {
        callback(null, { success: false, status: "Job doesnt exist" });
      }
      callback(null, {
        success: true,
        status: "Job fetched Success",
        data: job
      });
    })
    .catch(error => {
      console.log("Error at connecting to Jobs");
      callback(error, { success: false, status: "Failed connecting to mongo" });
    });
}


//GET List of recruiter posted jobs
function getListOfJobs(msg, callback) {
  console.log("KAFKA : getListOfJobs --> ", msg.id);
  jobsModel
    .aggregate([
      { $match: { recruiterId: msg.id } },
      {
        $project: {
          title: 1,
          description: 1,
          industry: 1,
          location: 1,
          companyLogo: 1,
          readCounter :1,
          startCounter: 1,
          completedCounter:1,
          noOfApplicants: { $size: { $ifNull: ["$jobApplications", []] } }
        }
      },
      // {$pull : {jobApplicationssize:{$lt:1}}},
      { $sort: { noOfApplicants: -1 } }
    ])
    .then(job => {
      if (!job) {
        callback(null, { success: false, status: "Job list Fetch  failed" });
      }
      callback(null, {
        success: true,
        status: "Job List fetched Success",
        data: job
      });
    })
    .catch(error => {
      console.log("Error at connecting to Jobs");
      callback(error, { success: false, status: "Failed connecting to mongo" });
    });
}
