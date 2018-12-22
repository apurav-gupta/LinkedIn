const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const keys = require('../../../config/keys');


// Load OwnerUser model
const Applicant = require('../../../Model/Applicant');

function handle_request(msg, callback) {


    var res = {};

    const profileFields = {};



    Applicant.findOne({email: msg.email})
        .then(profile => {
            if (!profile) {
                res.errorMessage = 'There is no  user with this id.';
                res.code = 404;
                callback(null, res);

            }

            profile.experience.unshift(msg.experience);
            profile.save()
                .then(profile => {
                    res.code = 202;
                    res.message = profile.experience;
                    callback(null, res);
                });


        })
        .catch(function (err) {
            res.code = 404;
            res.errorMessage = err;
            callback(null, res);
        });


    console.log("after callback" + this.res);
};

exports.handle_request = handle_request;