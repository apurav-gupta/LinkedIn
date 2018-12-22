const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const keys = require('../../config/keys');


// Load OwnerUser model
const Applicant = require('../../Model/Applicant');

function handle_request(msg, callback) {


    var res = {};

    const profileFields = {};
    if (msg.firstName) profileFields.firstName = msg.firstName;
    if (msg.lastName) profileFields.lastName = msg.lastName;
    if (msg.email) profileFields.email = msg.email;
    if (msg.phoneNumber) profileFields.phoneNumber = msg.phoneNumber;
    if (msg.address) profileFields.address = msg.address;
    if (msg.city) profileFields.city = msg.city;
    if (msg.state) profileFields.state = msg.state;
    if (msg.zipcode) profileFields.zipcode = msg.zipcode;
    if (msg.profileSummary) profileFields.profileSummary = msg.profileSummary;
    if (msg.profileImage) profileFields.profileImage = msg.profileImage;
    if (msg.resume) profileFields.resume = msg.resume;
    if (msg.gender) profileFields.gender = msg.gender;
    if (msg.skills) profileFields.skills.push(msg.skills);
    if (msg.experience) profileFields.experience.push(msg.experience);
    if (msg.education) profileFields.education.push(msg.education);




    Applicant.findOneAndUpdate({email: msg.email},
        {$set: profileFields})
        .then(profile => {
            if (!profile) {
                res.errorMessage = 'There is no  user with this id.';
                res.code = 404;
                callback(null, res);

            }

            res.code = 202;
            res.message = profile;
            callback(null, res);
        })
        .catch(function (err) {
            res.code = 404;
            res.errorMessage = err;
            callback(null, res);
        });


    console.log("after callback" + this.res);
};

exports.handle_request = handle_request;