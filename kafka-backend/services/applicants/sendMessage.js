//Load Messages Model
const Messages = require("../../Model/Messages");

function handle_request(msg, callback) {
  var res = {};
  console.log("In handle request:" + JSON.stringify(msg));

  var members = [msg.from_email, msg.to_email];

  Messages.findOne({
    messageMembers: { $all: [msg.from_email, msg.to_email] }
  }).then(user => {
    if (!user) {
      console.log("In from and to empty");
      console.log(user);
      console.log(members);
      const newMessage = new Messages({
        messageMembers: members,
        senderFirstname: msg.senderFirstName,
        receiverFirstname: msg.receiverFirstName,
        from_email: msg.from_email,
        to_email: msg.to_email,
        authorMessage: [
          {
            author: msg.from_email,
            message: msg.messageSent
          }
        ]
      });
      newMessage.save().then(
        message => {
          console.log("Message send to desired User: ", message);
          res.status = "200";
          res.value = "Success Sending Message to desired User";
          res.data = message;
          callback(null, res);
        },
        err => {
          console.log("Error Sending Message");
          console.log(err);
          res.code = "400";
          res.value = "Unsuccessfull";
          callback(err, "New Message not saved properly");
        }
      );
    } else {
      Messages.findOneAndUpdate(
        { messageMembers: { $all: [msg.from_email, msg.to_email] } },
        {
          $push: {
            authorMessage: [
              {
                author: msg.author,
                message: msg.messageSent
              }
            ]
          }
        }
      ).then(
        message => {
          console.log(
            "Message send to desired User when message already exists: ",
            message
          );
          res.status = "200";
          res.value = "Success Sending Message to desired User";
          res.data = message;
          callback(null, res);
        },
        err => {
          console.log("Error Sending Message");
          console.log(err);
          res.code = "400";
          res.value = "Unsuccessfull";
          callback(err, "Update Message not send properly");
        }
      );
    }
  });
}

exports.handle_request = handle_request;
