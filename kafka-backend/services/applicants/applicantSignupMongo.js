const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const keys = require('../../config/keys');
var mysql = require('mysql');
var pool = require('../../db/pool');


// Load Applicant model
const ApplicantUser = require('../../Model/Applicant');

function handle_request(msg, callback) {
    console.log("Kafka Backend --> Inside create recruiter SignUp(MongoDB) Request Handler");
    var a;
    var b;

    var res = {};
    ApplicantUser.findOne({email: msg.email})
        .then(user => {
            if (user) {
                res.value = 'User already exists!';
                res.code = 409;
                callback(null, res);
            } else {


                const newUser = new ApplicantUser({
                    firstName: msg.firstName,
                    lastName: msg.lastName,
                    email: msg.email,
                    isRecruiter: false,
                    phoneNumber: "",
                    address: "",
                    city: "",
                    state: "",
                    zipcode: "",
                    experience: [],
                    education: [],
                    skills: "",
                    profileSummary: "",
                    profileImage: "",
                    resume: "",
                    gender: "",
                    memberSince: "",
                    savedJobs: [],
                    appliedJobs: [],
                    connectionsRequests: [],
                    connections: []
                });
                const payload = {
                    email: msg.email,
                    isRecruiter: false
                }; // Create JWT Payload

                const token = jwt.sign(payload, keys.secretOrKey);

                newUser
                    .save()
                    .then(function (result) {
                        res.code = 201;
                        res.token = token;
                        res.user = result;
                        callback(null, res);
                    })
                    .catch(function (err) {
                        res.err = 'Password incorrect';
                        res.code = 400;
                        callback(null, res);
                    });


            }
        });


    console.log("after callback" + res);
}


exports.handle_request = handle_request;


