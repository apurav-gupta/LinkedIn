// Load Recruiter model
const recruiterModel = require('../../Model/Recruiter');

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
    if (msg.companyName) profileFields.companyName = msg.companyName;
    if (msg.profileImage) profileFields.profileImage = msg.profileImage;
    if (msg.gender) profileFields.gender = msg.gender;
    if (msg.skills) profileFields.skills.push(msg.skills);

    recruiterModel.findOneAndUpdate({email: msg.email},
        {$set: profileFields})
        .then(profile => {
            if (!profile) {
                res.errorMessage = 'There is no  user with this id.';
                res.code = 404;
                callback(null, res);

            } else {
                res.code = 202;
                res.message = profile;
                callback(null, res);
            }
        })
        .catch(function (err) {
            res.code = 404;
            res.errorMessage = err;
            callback(null, res);
        });
    console.log("after callback" + this.res);
};

exports.handle_request = handle_request;