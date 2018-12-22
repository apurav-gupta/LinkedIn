var mongoose = require("mongoose");


var jobApplication = new mongoose.Schema({
    applicant_id: {
        type: String,
        required: false,
        default: ""
      },
      resume: {
        type: String,
        required: false,
        default: ""
      },
      coverLetter: {
        type: String,
        required: false,
        default: ""
      },
      firstName: {
        type: String,
        required: false,
        default: ""
      },
      lastName: {
        type: String,
        required: false,
        default: ""
      },
      address: {
        type: String,
        required: false,
        default: ""
      },
      hearAboutUs: {
        type: String,
        required: false,
        default: ""
      },
    
      diversity: {
        type: String,
        required: false,
        default: ""
      },
      sponsorship: {
        type: String,
        required: false,
        default: ""
      },
      disability: {
        type: String,
        required: false,
        default: ""
      }
});


module.exports = mongoose.model("JobApplication", jobApplication);
