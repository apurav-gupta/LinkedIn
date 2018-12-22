var mongoose = require("mongoose");
var utility = require("../utility");

var recruiterSchema = new mongoose.Schema({
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
  companyName: {
    type: String,
    required: false,
    default: ""
  },
  profileImage: {
    type: String,
    required: false,
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
    default: true
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
      isRecr:{type:Boolean, default: false }
    }
  ]
});

module.exports = mongoose.model("Recruiters", recruiterSchema);
