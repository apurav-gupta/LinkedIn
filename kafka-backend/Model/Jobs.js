var mongoose = require("mongoose");
var utility = require("../utility");
const jobApplication = require('./JobApplication');

var jobSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  //JOB_ID
  title: {
    type: String,
    required: true,
    set: utility.capitalizeFirstLetter,
    default: ""
  },
  description: {
    type: String,
    required: true,
    set: utility.capitalizeFirstLetter,
    default: ""
  },
  industry: {
    type: String,
    // set: utility.toLower,
    lowercase: true,
    required: true,
    set: utility.capitalizeFirstLetter,
    default: ""
  },
  employmentType: {
    type: String,
    set: utility.capitalizeFirstLetter,
    required: true
  },
  location: {
    type: String,
    required: false,
    set: utility.capitalizeFirstLetter,
    default: ""
  },
  jobFunction: {
    type: String,
    required: false,
    set: utility.capitalizeFirstLetter,
    default: ""
  },
  noOfViews: {
    type: Number,
    required: false,
    default: 0
  },
  readCounter: {
    type: Number,
    required: false,
    default: 0
  },
  startCounter: {
    type: Number,
    required: false,
    default: 0
  },
  completedCounter: {
    type: Number,
    required: false,
    default: 0
  },
  companyName: {
    type: String,
    required: false,
    set: utility.capitalizeFirstLetter,
    default: ""
  },
  companyLogo: {
    type: String,
    required: false,
    default: "preview.png"
  },

  postedDate: {
    type: Date,
    default: Date.now
  },
  recruiterId: {
    type: String,
    required: false,
    default: ""
  },
  easyApply: {
    type :  Boolean,
    required: true,
    default : false
  },

  // stores the applicant ID who have saved this
  savedBy: {
    type: Array,
    required: false,
    default: []
  },
  jobApplications: [jobApplication.schema]
});

module.exports = mongoose.model("Jobs", jobSchema);
