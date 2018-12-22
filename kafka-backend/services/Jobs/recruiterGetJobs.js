// Load Jobs model
const jobsModel = require("../../Model/Jobs");

function handle_request(msg, callback) {
    console.log("KAFKA_BACKEND --> Inside get jobs for a respective recruiter")
    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));
    jobsModel.find({recruiterId: msg.email})
        .then(jobs => {
            if (!jobs) {
                res.code = 404 ;
                res.message = "No Jobs found" ;
                callback(null,res);
            } else {
                res.code = 200 ;
                res.result = jobs ;
                callback(null,res);
            }
        })
        .catch(function (err) {
            res.message = err;
            res.code = 400;
            callback(null, res);
        });
    console.log("after callback" + res);
};
exports.handle_request = handle_request;
