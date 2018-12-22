var mongoose = require("mongoose");
var utility = require("../utility");

var applicantSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    set: utility.capitalizeFirstLetter,
    default: ""
  },
  lastName: {
    type: String,
    required: true,
    set: utility.capitalizeFirstLetter,
    default: ""
  },
  email: {
    type: String,
    // set: utility.toLower,
    lowercase: true,
    required: true,
    default: ""
  },
  password: {
    type: String,
    required: false
  },

  phoneNumber: {
    type: Number,
    required: false,
    get: v => Math.round(v),
    default: ""
  },
  address: {
    type: String,
    required: false,
    set: utility.capitalizeFirstLetter,
    default: ""
  },
  city: {
    type: String,
    required: false,
    set: utility.capitalizeFirstLetter,
    default: ""
  },
  state: {
    type: String,
    required: false,
    set: utility.capitalizeFirstLetter,
    default: ""
  },
  zipcode: {
    type: Number,
    required: false,
    get: v => Math.round(v),
    default: ""
  },
  experience: [
    {
      title: { type: String, required: false, default: "" },
      company: { type: String, required: false, default: "" },
      location: { type: String, required: false, default: "" },
      description: { type: String, required: false, default: "" },
      from: { type: Date, required: false, default: "" },
      to: { type: Date, required: false, default: "" }
    }
  ],
  education: [
    {
      school: { type: String, required: false, default: "" },
      degreeLevel: { type: String, required: false, default: "" },
      location: { type: String, required: false, default: "" },
      from: { type: Date, required: false, default: "" },
      to: { type: Date, required: false, default: "" }
    }
  ],
  skills: {
    type: Array,
    required: false,
    default: []
  },
  profileSummary: {
    type: String,
    required: false,
    default: ""
  },
  profileImage: {
    type: String,
    required: false,
    default: ""
  },
  resume: {
    type: String,
    required: false,
    set: utility.capitalizeFirstLetter,
    default: ""
  },
  gender: {
    type: String,
    required: false,
    set: utility.capitalizeFirstLetter,
    default: ""
  },
  memberSince: {
    type: Date,
    default: Date.now
  },
  isRecruiter: {
    type: Boolean,
    default: false
  },

  //job id is saved
  savedJobs: {
    type: Array,
    required: false,
    default: []
  },
  //job id is saved
  appliedJobs: {
    type: Array,
    required: false,
    default: []
  },
  connectionsRequests: [
    {
      requestFrom: { type: String, required: false, default: "" },
      requestTo: { type: String, required: false, default: "" },
      isAccepted: { type: Boolean, required: false, default: false },
      isRecr:{type:Boolean, default: false}
    }
  ],
  connections: [
    {
      acceptedFrom: { type: String, required: false, default: "" },
      acceptedTo: { type: String, required: false, default: "" },
      isAccepted: { type: Boolean, required: false, default: true },
      isRecr:{type:Boolean, default: false}
    }
  ],
  profileViewCount: [
    {
      date: { type: Date, required : false , default : Date.now}
      
    }
  ]
});

module.exports = mongoose.model("Applicants", applicantSchema);
