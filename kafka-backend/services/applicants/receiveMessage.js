//Load Messages Model
const Messages = require("../../Model/Messages");

function handle_request(msg, callback) {
  var res = {};
  console.log("In handle request:" + JSON.stringify(msg));
  var frome = JSON.parse(msg).from_email;
  var toe = JSON.parse(msg).to_email;

  Messages.findOne({ messageMembers: { $all: [frome, toe] } })
    .then(messages => {
      if (!messages) {
        console.log("No conversation between the users");
        res.value = "No conversation between the users";
        res.status = "400";
        callback(null, res);
      }
      console.log("Conversation present between the users");
      console.log(messages);
      callback(null, messages);
    })

    .catch(err => callback(err, "Getting Conversation failed"));
}

exports.handle_request = handle_request;
