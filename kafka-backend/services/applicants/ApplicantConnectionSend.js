// Load Property model
const Applicants = require('../../Model/Applicant');
const Recruiter = require('../../Model/Recruiter');

function handle_request(msg, callback) {
    console.log("KAFKA : viewApplicantConnections --> ", msg.email, msg.body);
    var res = {};


    if (msg.body.isRecieverAORR) {

        Recruiter.update(
            {'email': msg.body.requestFrom},
            {
                $push: {
                    'connectionsRequests': [
                        {
                            'requestFrom': msg.email,
                            'requestTo': msg.body.requestTo,
                            'isAccepted': false,
                            'isRecr': msg.body.isRecruiter
                        }
                    ]
                }
            })
            .then(job => {
                if (!job) {
                    res.code = 404;
                    res.message = "Recruiter Connections not found";
                    callback(null, res);
                } else {
                    res.code = 200;
                    res.message = job;
                    callback(null, res);
                }

            })
            .catch(function (err) {
                res.message = err;
                res.code = 400;
                callback(null, res);
            });
    } else {
        Applicants.update(
            {'email': msg.body.requestFrom},
            {
                $push: {
                    'connectionsRequests': [
                        {
                            'requestFrom': msg.email,
                            'requestTo': msg.body.requestTo,
                            'isAccepted': false,
                            'isRecr': msg.body.isRecruiter
                        }
                    ]
                }
            })
            .then(job => {
                if (!job) {
                    res.code = 404;
                    res.message = "Applicant Connections not found";
                    callback(null, res);
                } else {
                    res.code = 200;
                    res.message = job;
                    callback(null, res);
                }
            })

            .catch(function (err) {
                res.message = err;
                res.code = 400;
                callback(null, res);
            });

    }

}


exports.handle_request = handle_request;
