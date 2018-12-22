var mongoose = require("mongoose");

var userTracker = new mongoose.Schema({
    username: { type: String, required: true, default: "" },
    location  : {type: String, required: false, default: ""},
    tracker: [
        {
            timeStamp: {type: Date, required: false, default: Date.now},
            page: {type: String,required: false,default: ""}
        }
    ]

});

module.exports = mongoose.model("tracker", userTracker);
