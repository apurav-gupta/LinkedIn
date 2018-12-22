// Load Property model
const Jobs = require('../../Model/Jobs');

function handle_request(msg, callback) {
    console.log("KAFKA : viewRecruiterJobById --> ", msg.job_id);
    var res = {};
    
  Jobs.find({_id:msg.job_id})
  .then(job => {
    if (!job) {
        res.code = 404 ;
        res.message = "Job not found" ;
        callback(null,res);

    }

    res.code = 200 ;
    res.message = job ;
    callback(null,res);
})
.catch(function (err) {
    res.message = err;
    res.code = 400;
    callback(null, res);
});
  

    console.log("after callback" + res);
};


exports.handle_request = handle_request;
