// Load Property model
const Applicants = require("../../Model/Applicant");
const Recruiter = require("../../Model/Recruiter");


function handle_request(msg, callback) {
  console.log("KAFKA : search Profile --> ", msg.body);
  var res = {};
  var profile1 = [];
  var profile2 = [];
  var profiles = [];
  Recruiter.find({
    firstName: msg.firstName
  })
    .limit(10)

    .then(profile => {
      if (profile.length > 0) {
        profile1.push(profile);
        profiles = profiles.concat(profile1[0]);
      }
      Applicants.find({
        firstName: msg.firstName
      })
        .limit(10)

        .then(profile => {
          if (profile.length > 0) {
            profile2.push(profile);
            profiles = profiles.concat(profile2[0]);
          }
          callback(null, profiles);
        });

      console.log("Hi", profiles);
    })
    .catch(function(err) {
      res.message = err;
      res.code = 400;
      callback(null, res);
    });
  console.log("after callback" + res);
}

exports.handle_request = handle_request;
