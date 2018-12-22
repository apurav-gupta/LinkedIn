//import the require dependencies
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
var cors = require("cors");
app.use(require("sanitize").middleware);
var mysql = require("mysql");
var jwt = require("jsonwebtoken");
var passport = require("passport");
var kafka = require("./kafka/client");
const photos = require("./routes/api/photos");
const doc = require("./routes/api/documentsUpload");
const morgan = require('morgan');
const neo4j = require('neo4j-driver').v1;

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// //Use morgan 
app.use(morgan('dev'));
// const driver = neo4j.driver("bolt://localhost:7687", neo4j.auth.basic("neo4j", "password273"));

const driver = neo4j.driver("bolt://purple-keebler-trail-bennie.graphstory.link/", neo4j.auth.basic("purple_keebler_trail_bennie", "dSn2RBNgttSIxhnLmERYEcpuuUW"));
const session = driver.session();

//MONGODB Config
const dbkey = require("./config/keys").mongoURI;

// Connect to Mongo Db
mongoose
  .connect(dbkey)
  .then(() => console.log("MongoDB Connected!!"))
  .catch(err => console.log(err));
 

app.use(
  cors({
    origin: "http://linkedinfrontewndelb-1812843532.us-west-1.elb.amazonaws.com",
    credentials: true
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Allow Access Control
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://linkedinfrontewndelb-1812843532.us-west-1.elb.amazonaws.com");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});

//index.js stores the homepage
var index = require("./routes/api/index");
var applicant = require("./routes/api/applicant");
var jobs = require("./routes/api/jobs");
var recruiter = require("./routes/api/recruiter");
var graphs = require("./routes/api/graph");
//app.use('/', index);
app.use("/jobs", jobs);
app.use("/applicants", applicant);
app.use("/recruiters", recruiter);
app.use("/graphs", graphs);
app.use("/api/photos", photos);
app.use("/api/documentsUpload", doc);
app.use;

app.get("/healthcheck", (req, res) => {
  console.log("health check success");
  res.status(200);
  res.send();
});

// Passport middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

app.listen(3001);
console.log("Server Listening on port 3001");
