const applicantModel = require("../Model/Applicant");
const recruiterModel = require("../Model/Recruiter");
const jobsModel = require("../Model/Jobs");
const userTrackerModel = require("../Model/userTracker");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const JWT_KEY = "secret";

require("dotenv").config();

exports.handle_request = function handle_request(msg, callback) {
  switch (msg.path) {
    case "getProfileViewCount":
      getProfileViewCount(msg, callback);
      break;
    case "updateProfileViewCount":
      updateProfileViewCount(msg, callback);
      break;
    case "getJobsTopTen":
      getJobsTopTen(msg, callback);
      break;
    case "citywise":
      getJobsCityWise(msg, callback);
      break;
    case "trackUserById":
      trackUserId(msg, callback);
      break;
    case "trackUserByLocation":
      trackUserLocation(msg,callback);
      break;
    case "createTrackUserById":
      createTrackUserId(msg, callback);
      break;
    case "updateTrackUserById":
      updateTrackUserId(msg, callback);
      break;
    case "getClickCount":
      clickCount(msg, callback);
      break;
    case "updateClickCount":
      clickCountIncrementer(msg, callback);
      break;
    case "lastFive":
      lastFiveJobs(msg, callback);
      break;
    case "readCounter":
      readCountIncrementer(msg,callback);
      break;
    case "startCounter":
      startCountIncrementer(msg,callback);
      break;
    case "completeCounter":
      completedCountIncrementer(msg,callback);
      break;

  }
};

//profile view count for 30 days
function getProfileViewCount(msg, callback) {
  /*
https://stackoverflow.com/questions/5168904/group-by-dates-in-mongodb
https://stackoverflow.com/questions/23116330/mongodb-select-count-group-by 
*/
  console.log("KAFKA : getProfileViewCount --> ", msg.id);
  applicantModel
    .aggregate([
      { $match: { email: msg.id } },
      { $project: { _id: 0, profileViewCount: 1 } },
      { $unwind: "$profileViewCount" },
      {
        $group: {
          _id: { day: { $dayOfMonth: "$profileViewCount.date" } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } },
      { $limit: 30 }
    ])
    .then(count => {
      console.log("Result in get profile view count is ", count);
      callback(null, {
        success: true,
        status: "Profile View Count Success",
        data: count
      });
    })
    .catch(err => {
      console.log("Profile view count aggregation failed", err);
      callback(null, {
        success: false,
        status: "Profile view count fetch failed"
      });
    });
}

//Updates the applicant profile view count, when someone visits profile page
/*
PUT :  applicant/:applicantId/logs/profile-view-count
*/
function updateProfileViewCount(msg, callback) {
  console.log("KAFKA : updateProfileViewCount --> ", msg.id);
  applicantModel
    .findOneAndUpdate(
      { email: msg.id },
      {
        $push: {
          profileViewCount: {}
        }
      }
    )
    .then(user => {
      console.log("TimeStamp of Profile View tracked/ User:  ", user);
      callback(null, { success: true, status: "Profile View Count Added" });
    })
    .catch(err => {
      console.log("Find and update error in Profile View Count ", err);
      callback(null, { success: false, status: " Profile view count failed " });
    });
}
/* ************** Get Top 10 jobs , on Application/month  **************/
function getJobsTopTen(msg, callback) {
  console.log("KAFKA : getJobsTopTen --> ", msg.id);

  jobsModel
    .aggregate([
      //match with recruiteriD
      { $match: { recruiterId: msg.id } },
      //get count of JobApplication size
      {
        $project: {
          _id: 1,
          title: 1,
          jobApplications: 1,
          jobApplicationssize: { $size: { $ifNull: ["$jobApplications", []] } }
        }
      },
      //Remove Job Application size less than 0
      { $match: { jobApplicationssize: { $gt: 0 } } },
      //Sort by decreasing order
      { $sort: { jobApplicationssize: -1 } },
      //Take only top 10
      { $limit: 10 },
      // Unwind each element in the JobApplications array for computation
      { $unwind: "$jobApplications" },
      //group each key now, by month and job_id, then count number of occurences and store to count
      // Keep job title using $first
      {
        $group: {
          _id: { month: { $month: "$jobApplications.appliedOn" }, id: "$_id" },
          jobtitle: { $first: "$title" },

          count: { $sum: 1 }
        }
      },
      // group based on job id, and add all details together into an array
      {
        $group: {
          _id: { id: "$_id.id" },
          jobtitle: { $first: "$jobtitle" },
          job: { $push: { month: "$_id.month", count: "$count" } }
        }
      }
    ])
    .then(resultJob => {
      console.log("Result in get jobs top ten applications per month ", resultJob);
      callback(null, {
        success: true,
        status: "jobs top ten applications per month",
        data: resultJob
      });
    })
    .catch(err => {
      console.log("top ten applications per month aggregation failed", err);
      callback(null, {
        success: false,
        status: "top ten applications per month failed"
      });
    });
}


function getJobsCityWise(msg, callback) {
  console.log("KAFKA : getJobsCityWise --> ", msg.id);

  jobsModel
    .aggregate([
      //match with recruiteriD
      { $match: { recruiterId: msg.id } },
      //get count of JobApplication size

      // {
      //   $project: {
      //     _id: 1,
      //     title: 1,
      //     jobApplications: 1,
      //     jobApplicationssize: { $size: { $ifNull: ["$jobApplications", []] } }
      //   }
      // },

      //Remove Job Application size less than 0
      // { $match: { jobApplicationssize: { $gt: 0 } } },
      //Sort by decreasing order
      // { $sort: { jobApplicationssize: -1 } },
      //Take only top 10
      // { $limit: 10 },
      // Unwind each element in the JobApplications array for computation
      // { $unwind: "$jobApplications" },
      //group each key now, by month and job_id, then count number of occurences and store to count
      // Keep job title using $first
      {
        $group: {
          _id: { location: "$location" },
          
          count: { $sum: 1 }
        }
      }
      // group based on job id, and add all details together into an array
      // {
      //   $group: {
      //     _id: { id: "$_id.id" },
      //     jobtitle: { $first: "$jobtitle" },
      //     job: { $push: { month: "$_id.month", count: "$count" } }
      //   }
      // }
    ])
    .then(resultJob => {
      console.log("Result in get jobs getJobsCityWise applications per month ", resultJob);
      callback(null, {
        success: true,
        status: "jobs getJobsCityWise applications per month",
        data: resultJob
      });
    })
    .catch(err => {
      console.log("top getJobsCityWises per month aggregation failed", err);
      callback(null, {
        success: false,
        status: "top getJobsCityWises per month failed"
      });
    });
}
//Get request to fetch particular user track history
function trackUserId(msg, callback) {
  console.log("KAFKA : trackuser by ID  --> ", msg.id);

  console.log("In handle request:" + JSON.stringify(msg));
  userTrackerModel
    .findOne({ username: msg.id }, "tracker")
    .then(trackDetails => {
      if (trackDetails.length === 0) {
        callback(null, {
          success: false,
          status: "No track details found for user"
        });
      } else {
        callback(null, {
          success: true,
          status: "Tracking details found",
          data: trackDetails
        });
      }
    })
    .catch(function(err) {
      callback(null, { success: false, status: "error for track user" });
    });
}

//Get request to fetch particular user track history
function trackUserLocation(msg, callback) {
  console.log("KAFKA : trackuser by location  hh--> ", msg.location);

  console.log("In handle request:" + JSON.stringify(msg));
  userTrackerModel
    .aggregate([
      { $match : {location: msg.location } },
      {
        $group: {
          _id: { location: "$location"  },
          tracker : { $first : "$tracker"}
        }
      }
      // {$limit :5}
    ])
    .then(trackDetails => {
      console.log("trackdetails ", trackDetails)
      if(trackDetails.length === 0){
        console.log("LEngth is 0")
        callback(null, {success: false, status: "No such location"})
      }
      else {
        console.log("Result in track user location ", JSON.stringify(trackDetails));
        callback(null, {
          success: true,
          status: "Tracking details found",
          data: trackDetails
        });
      }

      
    })
    .catch(function(err) {
      callback(null, { success: false, status: "error for track user" });
    });
}

/*
Tested and working
*************************
pass user to be tracked email as param
pass location of user as Body    -->  {location: "San Jose" }
*************************
*/
function createTrackUserId(msg, callback) {
  console.log("KAFKA : create trackuser by ID  --> ", msg.id);

  console.log("In handle request:" + JSON.stringify(msg));
  userTrackerModel.findOne({ username: msg.id }).then(user => {
    if (user) {
      console.log(
        "tracking details for user already exist, perform update call"
      );
      callback(null, {
        success: false,
        status: "Tracker for user already exist"
      });
    } else {
      // new tracker creation always defaulted to signup page
      const newTracker = new userTrackerModel({
        username: msg.id,
        location: msg.body.location,
        tracker: {
          page: 12
        }
      }); 
      newTracker
        .save()
        .then(function(result) {
          console.log("user tracking success : ", result);
          callback(null, { success: true, status: "user tracking started" });
        })
        .catch(function(err) {
          console.log("user tracking failed : ", err);
          callback(nll, {
            success: false,
            status: "user tracking failed, retry"
          });
        });
    }
  });
}

//pass the page as req.body.page
function updateTrackUserId(msg, callback) {
  console.log("KAFKA : update trackuser by ID  --> ", msg.id, msg.body);

  console.log("In handle request:" + JSON.stringify(msg));
  userTrackerModel
    .findOneAndUpdate(
      { username: msg.id },
      {
        $push: {
          tracker: {
            page: msg.body.page
          }
        }
      }
    )
    .then(user => {
      console.log("Find and update successful ", user);
      callback(null, { success: true, status: "page added to user tracker" });
    })
    .catch(err => {
      console.log("Find and update error in tracker ", err);
      callback(null, { success: false, status: " Page tracking failed " });
    });
}

//Get request to fetch particular recrtuier click count for job (Clicks per job posting)
function clickCount(msg, callback) {
  console.log("KAFKA : job ClickCount  of  --> ", msg.id);

  console.log("In handle request:" + JSON.stringify(msg));
  jobsModel
    .find({ recruiterId: msg.id, noOfViews: { $gt: 0 } }, "title noOfViews").sort({noOfViews:-1}).limit(10)
    .then(clickCount => {
      if (!clickCount) {
        callback(null, {
          success: false,
          status: "No clickCounts found for user"
        });
      } else {
        callback(null, {
          success: true,
          status: "clickCount found",
          data: clickCount
        });
      }
    })
    .catch(function(err) {
      callback(null, { success: false, status: "error for clickCount" });
    });
}

// To increment the number of clicks in job schema
/*
Include this call in every route to a job details page
BODY:
{
	"jobid":"5bfc781ce8df91050d1b484f"
}

*/
function clickCountIncrementer(msg, callback) {
  console.log("KAFKA : job clickCountIncrementer  of  --> ", msg.id);

  console.log("In handle request:" + JSON.stringify(msg));
  jobsModel
    .findOneAndUpdate({ _id: msg.id }, { $inc: { noOfViews: 1 } })
    .then(clickCount => {
      if (!clickCount) {
        callback(null, {
          success: false,
          status: "No clickCounts increment for user"
        });
      } else {
        callback(null, {
          success: true,
          status: "clickCount incremented",
          data: clickCount
        });
      }
    })
    .catch(function(err) {
      callback(null, {
        success: false,
        status: "error for clickCountIncrementer"
      });
    });
}

//Get request to fetch Bottom 5 jobs of a recruiter (least number of applications)
// https://stackoverflow.com/questions/9040161/mongo-order-by-length-of-array
function lastFiveJobs(msg, callback) {
  console.log("KAFKA : Last five jobs  of  --> ", msg.id);

  console.log("In handle request:" + JSON.stringify(msg));
  jobsModel
    .aggregate([
      { $match: { recruiterId: msg.id } },
      {
        $project: {
          title: 1,
          jobApplicationssize: { $size: { $ifNull: ["$jobApplications", []] } }
        }
      },
      // {$pull : {jobApplicationssize:{$lt:1}}},
      { $sort: { jobApplicationssize: 1 } },
     { $limit: 5 }
    ])

    .then(jobs => {
      if (!jobs) {
        callback(null, {
          success: false,
          status: "No jobs found for user"
        });
      } else {
        callback(null, {
          success: true,
          status: "jobs found",
          data: jobs
        });
      }
    })
    .catch(function(err) {
      callback(null, { success: false, status: "error for jobs" });
    });
}



// To increment the number of views  in job schema
/*
Include this call in every route to a job details page
BODY:
{
	"jobid":"5bfc781ce8df91050d1b484f"
}

*/
function readCountIncrementer(msg, callback) {
  console.log("KAFKA : job clickCountIncrementer  of  --> ", msg.id);

  console.log("In handle request:" + JSON.stringify(msg));
  jobsModel
    .findOneAndUpdate({ _id: msg.id }, { $inc: { readCounter: 1 } })
    .then(readCount => {
      if (!readCount) {
        callback(null, {
          success: false,
          status: "No readCounts increment for user"
        });
      } else {
        callback(null, {
          success: true,
          status: "readCount incremented",
          data: readCount
        });
      }
    })
    .catch(function(err) {
      callback(null, {
        success: false,
        status: "error for readCountIncrementer"
      });
    });
}


function startCountIncrementer(msg, callback) {
  console.log("KAFKA : job startCountIncrementer  of  --> ", msg.id);

  console.log("In handle request:" + JSON.stringify(msg));
  jobsModel
    .findOneAndUpdate({ _id: msg.id }, { $inc: {readCounter: 1, startCounter:1 } })
    .then(readCount => {
      if (!readCount) {
        callback(null, {
          success: false,
          status: "No startcounter increment for user"
        });
      } else {
        callback(null, {
          success: true,
          status: "startcounter incremented",
          data: readCount
        });
      }
    })
    .catch(function(err) {
      callback(null, {
        success: false,
        status: "error for startCOunterIncrementer"
      });
    });
}


function completedCountIncrementer(msg, callback) {
  console.log("KAFKA : job completedCountIncrementer  of  --> ", msg.id);

  console.log("In handle request:" + JSON.stringify(msg));
  jobsModel
    .findOneAndUpdate({ _id: msg.id }, { $inc: {readCounter: 1, startCounter:1,completedCounter:1 } })
    .then(readCount => {
      if (!readCount) {
        callback(null, {
          success: false,
          status: "No completedCountIncrementer increment for user"
        });
      } else {
        callback(null, {
          success: true,
          status: "completedCountIncrementer incremented",
          data: readCount
        });
      }
    })
    .catch(function(err) {
      callback(null, {
        success: false,
        status: "error for completedCountIncrementer"
      });
    });
}
