var mongoose = require("mongoose");
var utility = require("../utility");

var recruiterSchema = new mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,
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
    required: true
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
  profileimage: {
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
  connectionsRequests: {
    type: Array,
    required: false,
    defuaut: []
  },
  connections: {
    type: Array,
    required: false,
    defuaut: []
  }
});

module.exports = mongoose.model('Recruiters', recruiterSchema);
