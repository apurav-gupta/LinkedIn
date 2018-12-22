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

            profile.firstName = msg.summary.firstName;
            profile.lastName = msg.summary.lastName;
            profile.city = msg.summary.city;
            profile.state = msg.summary.state;
            profile.profileSummary = msg.summary.profileSummary;
            profile.profileImage = msg.summary.profileImage;
            profile.zipcode = msg.summary.zipcode;
            profile.gender = msg.summary.gender;
            profile.resume = msg.summary.resume;
            profile.save()
                .then(profile => {
                    res.code = 202;
                    var summary = {
                        firstName: profile.firstName,
                        lastName: profile.lastName,
                        city: profile.city,
                        state: profile.state,
                        profileSummary: profile.profileSummary,
                        profileImage:profile.profileImage,
                        zipcode:profile.zipcode,
                        gender:profile.gender,
                        resume:profile.resume
                    };
                    res.message = summary;
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