// Load Recruiter model
const recruiterModel = require('../../Model/Recruiter');

function handle_request(msg, callback) {
    var res = {};
    recruiterModel.findOneAndRemove({email: msg.email})
        .then(profile => {
            if (!profile) {
                res.code = 401 ;
                res.errorMessage = "User not found" ;
                callback(null,res);
            } else {
                res.code = 202 ;
                res.message = "Record deleted successfully" ;
                callback(null,res);
            }
        })
        .catch(function (err) {
            res.errorMessage = err;
            res.code = 401;
            callback(null, res);
        });

    console.log("after callback" + res);
};

exports.handle_request = handle_request;