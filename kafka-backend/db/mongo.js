const mongoose = require("mongoose");

//MONGODB Config

const dbkey = require("../config/keys").mongoURI;

// Connect to Mongo Db
mongoose
    .connect(dbkey)
    .then(() => console.log("MongoDB Connected!!"))
    .catch(err => console.log(err));