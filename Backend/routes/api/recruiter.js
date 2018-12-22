var kafka = require("../../kafka/client");
var passport = require("passport");
var express = require("express");
const router = express.Router();

const Recruiters = require("../../Model/Recruiter");

/*  Recruiter --> Login
    Login is facilitated by MYSQL DB
 */

router.post("/login", (req, res) => {
  console.log("Inside Recruiter login backend");
  kafka.make_request("recruiter_login", req.body, function(err, results) {
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
        console.log("Recruiter logged in successfully");
        res.status(results.code).json({
          success: true,
          token: "Bearer " + results.token
        });
      } else {
        console.log(`Recruiter-->Unable to Login. Error-->${results.err}`);
        res.status(results.code).json({
          error: results.err
        });
      }
      res.end();
    }
  });
});

/*  Recruiter --> Signup request with SQL and Mongo DB
    SQL DB --   stores recruiter email and password
    Mongo DB -- stores recruiter entire details (firstName, lastName, email and password)
                in recruiter schema.
*/

//Recruiter Signup MYSQL
router.post("/", (req, res) => {
  console.log("Inside Recruiter signup(MYSQL) backend");
  kafka.make_request("recruiter_signup", req.body, function(err, results) {
    console.log("in result");
    console.log(results);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again."
      });
    } else {
      if (results.code === 201) {
        console.log("Recruiter record in MYSQL created successfully");
        res.status(results.code).json({
          success: true,
          token: "Bearer " + results.token
        });
      } else if (results.code === 409) {
        console.log("User already exists in MYSQL");
        res.status(results.code).json({
          message: "User already exists"
        });
      } else {
        console.log("Unable to create recruiter record in MYSQL");
        res.status(results.code).json({
          error: results.err
        });
      }
      res.end();
    }
  });
});

//Recruiter signup call for MongoDB
router.post("/mongo", (req, res) => {
  console.log("Inside Recruiter signup(MongoDB) backend");
  kafka.make_request("recruiter_signup_mongo", req.body, function(
    err,
    results
  ) {
    console.log("in result");
    console.log(results);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again."
      });
    } else {
      if (results.code === 201) {
        console.log("Recruiter record in MongoDB created successfully");
        res.status(results.code).json({
          success: true,
          token: "Bearer " + results.token
        });
      } else {
        console.log("Unable to create recruiter record in MongoDB");
        res.status(results.code).json({
          error: results.err
        });
      }
      res.end();
    }
  });
});

/*  Recruiter --> Update Profile 
    @param -- recruiterEmail
    @params --  recruiterDetails (could be first name, last name, city and others)
*/

router.put(
  "/:recruiter_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    kafka.make_request("recruiter_update_profile", req.body, function(
      err,
      results
    ) {
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
        if (results.code === 202) {
          res.status(results.code).json(results.message);
        } else {
          res.status(results.code).json(results.errorMessage);
        }
        res.end();
      }
    });
  }
);

//Get Recruiter details
router.get(
  "/:recruiter_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    kafka.make_request("recruiter_details", req.params, function(err, results) {
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
          res.status(results.code).json(results.message);
        } else {
          res.status(results.code).json(results.message);
        }
        res.end();
      }
    });
  }
);

//delete Recruiter
router.delete(
  "/:recruiter_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    kafka.make_request("recruiter_delete", req.body, function(err, results) {
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
        if (results.code === 202) {
          res.status(results.code).json(results.message);
        } else {
          res.status(results.code).json(results.errorMessage);
        }
        res.end();
      }
    });
  }
);

//GET LOGS of top ten jobs of recruiter he/she has posted
//Returns :
/*

*/
router.get("/:recruiterId/jobs/top-ten", function(req, res) {
  console.log("inside backend jobs/top-ten");

  kafka.make_request(
    "logs_topic",
    { path: "getJobsTopTen", id: req.params.recruiterId },
    function(err, result) {
      if (err) {
        res
          .status(404)
          .json({ success: false, error: "Recruiter not found" })
          .send(err);
      } else 
      { console.log("Recruiter log Top Ten Jobs", result);
        if (result.success) {
          console.log("Data inside success  -->  "+  JSON.stringify(result.data));
        
          let datas = new Array();
        let colors = ['rgba(106,183,255,0.6)','rgba(0,0,128, 0.6)', 'rgba(0,0,255,0.6)','rgba(255,0,255,0.6)','rgba(128,0,128,0.6)','rgba(0,255,25,0.8)','rgba(0,128,128,0.6)','rgba(128,128,128,0.6)','rgba(0,255,0,0.6)','rgba(0,128,0,0.6)','rgba(128,128,0,0.6)','rgba(192,192,192,0.6)']
          
        for(var job =0; job< result.data.length; job++){
            console.log("each job is:",result.data[job]);
            var months = [0,0,0,0,0,0,0,0,0,0,0,0];
            let r =result.data[job].job.map((monthsCount)=>
            months[monthsCount.month-1]=monthsCount.count
            )
            console.log("Variable r  is ",r);


            var obj = {
              "label" : result.data[job].jobtitle,
              "data" : months,
              "backgroundColor" : colors[job]
            }
            datas.push(obj)
          }
          console.log("Return data is ",datas)



          res.status(200);
          res.send(datas);
        } else {
          res.status(400).json({ success: false });
        }
      }
    }
  );
});

// Recruiter can view job details
router.get("/:recruiter_id/jobs/:job_id", function(req, res) {
  console.log("Backend Recruiter Job View");
  kafka.make_request(
    "recruiter_JobView",
    { job_id: req.params.job_id },
    function(err, results) {
      console.log("in result");
      console.log(results);
      if (err) {
        console.log("Inside err");
        res.json({
          status: "error",
          msg: "Unable to fetch Job."
        });
      } else {
        console.log("Inside else");
        res.json({
          fetchedJob: results
        });

        res.end();
      }
    }
  );
});

// Recruiter gets list of all their job posting
router.get("/:recruiter_id/jobs", function(req, res) {
  console.log("Backend Recruiter Job List ");
  kafka.make_request(
    "jobs_topic",
    { path: "listOfJobs", id: req.params.recruiter_id },
    function(err, results) {
      console.log("in result");
      console.log(results);
      if (err) {
        console.log("Inside err");
        res.json({
          status: "error",
          msg: "Unable to fetch list of Jobs."
        });
        res.end();
      } else {
        if (results.success) {
          console.log("Inside else");
          res.json({
            jobsList: results
          });
          res.end();
        } else {
          res.json({
            status: "error",
            msg: "Job list empty"
          });
          res.end();
        }
      }
    }
  );
});

//Recruiter updates job details
router.put("/:recruiter_id/jobs/:job_id", function(req, res) {
  kafka.make_request(
    "recruiter_JobUpdate",
    { job_id: req.params.job_id, body: req.body },
    function(err, results) {
      console.log("in result");
      console.log(results);
      if (err) {
        console.log("Inside err");
        res.json({
          status: "error",
          msg: "Unable to Update Job."
        });
      } else {
        console.log("Inside else" ,results );
        if(results.code === 202){
          res.status(202)
          res.end();
        }else { 
          res.status(400)
          res.end();

        }


       
      }
    }
  );
});

//Get Number of saved jobs for each job of recruiter
router.get("/:recruiterId/jobs/logs/saved-job-count", function(req, res) {
  console.log("inside backend get number of saved jobs");
  kafka.make_request(
    "jobs_topic",
    { path: "getSavedJobsNumber", recruiterId: req.params.recruiterId },
    function(err, result) {
      if (err) {
        res
          .status(404)
          .json({ success: false, error: "Jobs empty" })
          .send(err);
      } else {
        console.log("result", result.data);
        let title = result.data.map((eachJob)=>(
          eachJob.title
        ))
        let savedJobSize = result.data.map((eachJob)=>(
          eachJob.savedBy
        ))

        if (result.success) {
          res.status(200);
          res.send({"labels" :title , "data": savedJobSize});
        } else {
          res.status(400).json({ success: false });
        }
      }
    }
  );
});

//Add Tracking details of a user by id
/*
Tested and working
*************************
pass user to be tracked email as param
pass location of user as Body    -->  {"location": "San Jose" }
*************************
*/
router.post("/track/:user", function(req, res) {
  console.log("inside backend post track user by id");
  
  kafka.make_request(
    "logs_topic",
    { path: "createTrackUserById", id: req.params.user, body: req.body },
    function(err, result) {
      if (err) {
        res
          .status(404)
          .json({ success: false, error: "User create track record failed" })
          .send(err);
      } else {
        console.log("User create track record ", result);
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

//Update Tracking details of a user by id with existing page
/*
Tested and working
*************************
pass user to be tracked email as param
pass page user has visited as Body    -->  {"page": "User Login" }
*************************
*/
router.put("/track/:user", function(req, res) {
  console.log("inside backend update track user by id");
  kafka.make_request(
    "logs_topic",
    { path: "updateTrackUserById", id: req.params.user, body: req.body },
    function(err, result) {
      if (err) {
        res
          .status(404)
          .json({ success: false, error: "User update track record failed" })
          .send(err);
      } else {
        console.log("User update track record ", result);
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

//Get Tracking details of a user by id
/*
Tested and working
*************************
pass user to be fetched  email as param
:applicantId  = goel1@gmail.com
*************************
*/
router.get("/track/:user", function(req, res) {
  console.log("inside backend get track user by id");
  kafka.make_request(
    "logs_topic",
    { path: "trackUserById", id: req.params.user },
    function(err, result) {
      if (err) {
        res
          .status(404)
          .json({ success: false, error: "User track record failed" })
          .send(err);
      } else {
        console.log("User track record ", result);
        let pages = result.data.tracker.map((eachPage)=>(
          eachPage.page
        ))
        let times = result.data.tracker.map((eachTime)=>(
          eachTime.timeStamp
        ))
        if (result.status) {
          res.status(200);
          res.send({"labels" : times, "data" : pages});
        } else {
          res.status(400).json({ success: false });
        }
      }
    }
  );
});
//Get Tracking details of a user by location
/*
Tested and working
*************************
pass location to be fetched  as param
:location  = San Jose
*************************
*/
router.get("/locations/track/:location", function(req, res) {
  console.log("inside backend GET track user by locaTION");
  kafka.make_request(
    "logs_topic",
    { path: "trackUserByLocation", location : req.params.location },
    function(err, result) {
      if (err) {
        res
          .status(404)
          .json({ success: false, error: "Location track record failed" })
          .send(err);
      } else {
        if (result.success) {
        console.log("location track record ", result);
        let pages = result.data[0].tracker.map((eachPage)=>(
          eachPage.page
        ))
        let times = result.data[0].tracker.map((eachTime)=>(
          eachTime.timeStamp
        ))
        
          res.status(200);
           res.send({
             "data": pages,
             "labels" : times,
             "location" : result.data[0]._id.location
           });
        } else {
          res.status(400).json({ success: false });
        }
      }
    }
  );
});


//Route to get the Number of clicks for job (click per job posting graph in recruiter dashboard)
router.get("/:recruiterId/jobs/logs/click-count", function(req, res) {
  console.log("inside backend get click count");
  kafka.make_request(
    "logs_topic",
    { path: "getClickCount", id: req.params.recruiterId },
    function(err, result) {
      if (err) {
        res
          .status(404)
          .json({ success: false, error: "Get click count failed" })
          .send(err);
      } else {
        console.log("Click count Result ", result.data);
        let title =result.data.map((eachJob)=>(
          eachJob.title
        ))
        let clickCount = result.data.map((eachJob)=>(
          eachJob.noOfViews
        ))

        if (result.success) {
          res.status(200);
          res.send({"labels" :title , "data": clickCount});
        } else {
          res.status(400).json({ success: false });
        }
      }
    }
  );
});

// To increment the number of clicks in job schema
/*
Include this call in every route to a job details page
http://localhost:3001/recruiters/jobs/logs/click-count
BODY:
{
	"jobid":"5bfc781ce8df91050d1b484f"
}

*/
router.put("/jobs/logs/click-count", function(req, res) {
  console.log("inside backend update Click count for job", req.body.jobid);
  kafka.make_request(
    "logs_topic",
    { path: "updateClickCount", id: req.body.jobid },
    function(err, result) {
      if (err) {
        res
          .status(404)
          .json({ success: false, error: "Update click count failed" })
          .send(err);
      } else {
        console.log("Update click count success ", result);
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

router.put("/jobs/logs/read-count", function(req, res) {
  console.log("inside backend update read count for job", req.body.jobid);
  kafka.make_request(
    "logs_topic",
    { path: "readCounter", id: req.body.jobid },
    function(err, result) {
      if (err) {
        res
          .status(404)
          .json({ success: false, error: "Update readCounter count failed" })
          .send(err);
      } else {
        console.log("Update readCounter count success ", result);
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

router.put("/jobs/logs/start-count", function(req, res) {
  console.log("inside backend update start-count for job", req.body.jobid);
  kafka.make_request(
    "logs_topic",
    { path: "startCounter", id: req.body.jobid },
    function(err, result) {
      if (err) {
        res
          .status(404)
          .json({ success: false, error: "Update start-count count failed" })
          .send(err);
      } else {
        console.log("Update start-count count success ", result);
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

router.put("/jobs/logs/completed-count", function(req, res) {
  console.log("inside backend update completed-count count for job", req.body.jobid);
  kafka.make_request(
    "logs_topic",
    { path: "completeCounter", id: req.body.jobid },
    function(err, result) {
      if (err) {
        res
          .status(404)
          .json({ success: false, error: "Update completed-count count failed" })
          .send(err);
      } else {
        console.log("Update completed-count count success ", result);
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

//Route to get the Bottom 5 job posting of a recruiter
router.get("/:recruiterId/last-five", function(req, res) {
  console.log("inside backend Find last 5 jobs");
  kafka.make_request(
    "logs_topic",
    { path: "lastFive", id: req.params.recruiterId },
    function(err, result) {
      if (err) {
        res
          .status(404)
          .json({ success: false, error: "Get Bottom 5 job posting failed" })
          .send(err);
      } else {
        if (result.success) {
        console.log("bottom 5 jobs  are", result.data);
        let title = result.data.map((eachJob)=>(
          eachJob.title
        ))
        let jobSize = result.data.map((eachJob)=>(
          eachJob.jobApplicationssize
        ))

        
          res.status(200);
          res.send({"labels" :title , "data": jobSize});
        } else {
          res.status(400).json({ success: false });
        }
      }
    }
  );
});


//to edit summary
router.put(
    "/summary/edit",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        const errors = {};
        kafka.make_request("edit_recruiter_summary", req.body, function(err, results) {
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
                if (results.code === 202) {
                    res.status(results.code).json(results.message);
                } else {
                    res.status(results.code).json(results.errorMessage);
                }

                res.end();
            }
        });
    }
);


//Route to get the Bottom 5 job posting of a recruiter
router.get("/:recruiterId/jobs/logs/citywise", function(req, res) {
  console.log("inside backend citywise");
  kafka.make_request(
    "logs_topic",
    { path: "citywise", id: req.params.recruiterId },
    function(err, result) {
      if (err) {
        console.log("Error in city wise : ", err);
        res
          .status(404)
          .json({ success: false, error: "Get citywise jobs failed" })
          .send(err);
      } else {
        console.log("city wise jobs are ", result);
        let months = new Array();
        let count = new Array();
        for(var job =0; job< result.data.length; job++){
          console.log("data", result.data[job]._id.location);
          months.push(result.data[job]._id.location);
          count.push(result.data[job].count);
        }


        if (result.success) {
          res.status(200);
          res.send({"labels" : months, "data" : count});
        } else {
          res.status(400).json({ success: false });
        }
      }
    }
  );
});

/****************Recruiter View All Connections*********************/
router.get(
  "/viewconnections/:email",
  passport.authenticate("jwt", { session: false }),
  function(req, res) {
    console.log("Backend Recruiter View Connections");
    kafka.make_request(
      "recruiter_ViewConnection",
      { email: req.params.email },
      function(err, results) {
        console.log("in result");
        console.log(results);
        if (err) {
          console.log("Inside err");
          res.json({
            status: "error",
            msg: "Unable to fetch Connections."
          });
        } else {
          console.log("Inside else");
          res.json(results);
          res.end();
        }
      }
    );
  }
);

/****************Recruiter View Pending Requests*********************/
router.get("/viewPendingRequests/:email", function(req, res) {
  console.log("Backend Recruiter View Connections");
  kafka.make_request(
    "recruiter_PendingRequests",
    { email: req.params.email },
    function(err, results) {
      console.log("in result");
      console.log(results);
      if (err) {
        console.log("Inside err");
        res.json({
          status: "error",
          msg: "Unable to fetch Connections."
        });
      } else {
        console.log("Inside else");
        res.json(results);
        res.end();
      }
    }
  );
});

/****************Recruiter Send Connection*********************/
router.post("/connections/:email", function(req, res) {
  console.log("Backend Recruiter Send Connection");
  kafka.make_request(
    "recruiter_SendConnection",
    { email: req.params.email, body: req.body },
    function(err, results) {
      console.log("in result");
      console.log(results);
      if (err) {
        console.log("Inside err");
        res.json({
          status: "error",
          msg: "Unable to Send Connection."
        });
      } else {
        console.log("Inside else");
        res.json({
          SendConnections: results
        });

        res.end();
      }
    }
  );
});

/****************Recruiter Accept Connection*********************/
router.post("/acceptConnection/:email", function(req, res) {
  console.log("Backend Recruiter Accept Connection");
  kafka.make_request(
    "recruiter_AcceptConnection",
    { email: req.params.email, body: req.body },
    function(err, results) {
      console.log("in result");
      console.log(results);
      if (err) {
        console.log("Inside err");
        res.json({
          status: "error",
          msg: "Unable to Accept Connection."
        });
      } else {
        console.log("Inside else");
        res.json({
          SendConnections: results
        });

        res.end();
      }
    }
  );
});


module.exports = router;
