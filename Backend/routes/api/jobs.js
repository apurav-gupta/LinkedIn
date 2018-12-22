// Hello world
var express = require("express");
const router = express.Router();

var kafka = require("../../kafka/client");

//Post a Job
router.post("/", function(req, res) {
  console.log("Inside backend--> Job Post route");
  kafka.make_request("post_job", req.body, function(err, results) {
    console.log("in result");
    console.log(results);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again."
      });
    } else {
      console.log("Inside else", results);
      if (results.code === 201) {
        console.log("Job Posted successfully");
        res.status(results.code).json({
          result: results.result
        });
      } else {
        console.log(`Post Job-->Unable to Post Job. Error-->${results.err}`);
        res.status(results.code).json({
          error: results.err
        });
      }
      res.end();
    }
  });
});

//View Saved Jobs:
router.get("/savedjobs", function(req,res){
  console.log("Inside backend--> Get saved Jobs for Applicant.");
  kafka.make_request("saved_jobs", req.query, function(err, result) {
    if (err) {
      res
        .status(404)
        .json({ success: false, error: "Jobs not found" })
        .send(err);
    } else console.log("Saved Jobs", result);
    {
      if (result.status) {
        res.status(200);
        res.send(result);
      } else {
        res.status(400).json({ success: false });
      }
    }
  });
})

//Recruiter -- View Posted Jobs
router.get("/", function(req, res) {
  console.log("Inside backend--> Job Post route");
  kafka.make_request("rec_get_jobs", req.query, function(err, results) {
    console.log("in result");
    console.log(results);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again."
      });
    } else {
      console.log("Inside else", results);
      if (results.code === 200) {
        console.log("Jobs fetched successfully");
        res.status(results.code).json({
          result: results.result
        });
      } else {
        console.log(`Post Job-->Unable to fetch Jobs Error-->${results.err}`);
        res.status(results.code).json({
          error: results.err
        });
      }
      res.end();
    }
  });
});

//SEARCH jobs based on title and location
router.get("/jobSearch", function(req, res) {
  console.log("inside backend /jobs/:title&:location");

  kafka.make_request("search_job", req.query, function(err, result) {
    if (err) {
      res
        .status(404)
        .json({ success: false, error: "Job not found" })
        .send(err);
    } else console.log("Job search", result);
    {
      if (result.status) {
        res.status(200);
        res.send(result);
      } else {
        res.status(400).json({ success: false });
      }
    }
  });
});

//GET details of particular job
router.get("/:jobId", function(req, res) {
  console.log("inside backend get jobs details");

  kafka.make_request(
    "jobs_topic",
    { path: "getJobsDetail", id: req.params.jobId },
    function(err, result) {
      if (err) {
        res
          .status(404)
          .json({ success: false, error: "Job not found" })
          .send(err);
      } else console.log("Job details", result);
      {
        if (result.status) {
          res.status(200);
          res.send(result);
        } else {
          res.status(400).json({ success: false });
        }
      }
    }
  );
});

module.exports = router;
