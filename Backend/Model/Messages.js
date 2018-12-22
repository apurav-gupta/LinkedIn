const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  messageMembers: {
    type: Array,
    required: false,
    lowercase: true,
    default: []
  },
  senderFirstname: {
    type: String,
    required: false,
    lowercase: true,
    default: ""
  },
  receiverFirstname: {
    type: String,
    required: false,
    lowercase: true,
    default: ""
  },
  from_email: {
    type: String,
    required: false,
    lowercase: true,
    default: ""
  },
  to_email: {
    type: String,
    required: false,
    lowercase: true,
    default: ""
  },
  authorMessage: [
    {
      author: {
        type: String,
        required: false,
        lowercase: true,
        default: ""
      },
      message: {
        type: String,
        required: false,
        lowercase: true,
        default: ""
      }
    }
  ]
  // fromEmail: {
  //   type: String,
  //   required: true,
  //   lowercase: true,
  //   default: ""
  // },
  // toEmail: {
  //   type: String,
  //   lowercase: true,
  //   required: true,
  //   default: ""
  // },

  // fromMessage: {
  //   type: String,
  //   required: false,
  //   default: ""
  // },
  // toMessage: {
  //   type: String,
  //   required: false,
  //   default: ""
  // }
});

module.exports = mongoose.model("Messages", messageSchema);
