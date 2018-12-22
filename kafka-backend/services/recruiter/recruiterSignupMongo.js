const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const keys = require('../../config/keys');
// Load Recruiter model
const RecruiterUser = require('../../Model/Recruiter');
const mongoose = require('mongoose');

function handle_request(msg, callback) {
    console.log("Kafka Backend --> Inside create recruiter SignUp(MongoDB) Request Handler");
    var res = {};
    RecruiterUser.findOne({email: msg.email})
        .then(user => {
            if (user) {
                console.log("User already exist in MongoDB");
                res.value = 'User already exists!';
                res.code = 409;
                callback(null, res);
            } else {
                const newUser = new RecruiterUser({
                    _id : new mongoose.Types.ObjectId(),
                    firstName: msg.firstName,
                    lastName: msg.lastName,
                    email: msg.email,
                    isRecruiter: true,
                    phoneNumber: "",
                    address: "",
                    city: "",
                    state: "",
                    zipcode: "",
                    companyName: "",
                    profileImage: "",
                    gender: "",
                    memberSince: "",
                    connectionsRequests: [],
                    connections: []
                });
                const payload = {
                    email: msg.email,
                    isRecruiter: true
                }; 
                // Create JWT Payload
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