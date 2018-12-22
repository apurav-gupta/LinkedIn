//Load Messages Model
const Jobs = require("../../Model/Jobs");

function handle_request(msg, callback) {
  // console.log("KAFKA : getJobsTitleLocation --> ", msg.title, msg.location);
  console.log("In handle request:" + JSON.stringify(msg));
  var title = msg.jobname;
  var location = msg.joblocation;

  //not working with array? ? ?
  Jobs.find({ title: title, location: location })
    .then(job => {
      console.log("result of jobs", job);
      if (!job) {
        callback(null, {
          success: false,
          status: "Job doesnt exist in getJobsTitleLocation"
        });
      }
      callback(null, {
        success: true,
        status: "Job fetched Success",
        data: job
      });
    })
    .catch(error => {
      console.log("Error at connecting to Jobs");
      callback(error, {
        success: false,
        status: "Failed connecting to Mongo in getJobsTitleLocation"
      });
    });
}

exports.handle_request = handle_request;
