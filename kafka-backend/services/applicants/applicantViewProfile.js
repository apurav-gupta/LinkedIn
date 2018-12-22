// Load Applicant model
const ApplicantUser = require('../../Model/Applicant');

function handle_request(msg, callback) {


    var res = {};

    ApplicantUser.findOne({email: msg.applicant_id})
        .then(profile => {
            if (!profile) {
                res.code = 404 ;
                res.message = "User not found" ;
                callback(null,res);

            }

            res.code = 200 ;
            res.message = profile ;
            callback(null,res);
        })
        .catch(function (err) {
            res.message = err;
            res.code = 400;
            callback(null, res);
        });

    console.log("after callback" + res);
};

exports.handle_request = handle_request;
