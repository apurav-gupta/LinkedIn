// Load Applicant model
const ApplicantUser = require('../../Model/Applicant');

function handle_request(msg, callback) {


    var res = {};

    ApplicantUser.findOneAndDelete({email: msg.applicant_id})
        .then(profile => {
            if (!profile) {
                res.code = 401 ;
                res.errorMessage = "User not found" ;
                callback(null,res);

            }

            res.code = 202 ;
            res.message = "Record deleted successfully" ;
            callback(null,res);
        })
        .catch(function (err) {
            res.errorMessage = err;
            res.code = 401;
            callback(null, res);
        });

    console.log("after callback" + res);
};

exports.handle_request = handle_request;