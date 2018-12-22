// Load Property model
const Jobs = require('../../Model/Jobs');

function handle_request(msg, callback) {
    console.log("KAFKA : updateRecruiterJobById --> ", msg.job_id, msg.body);
    var res = {};
    
  Jobs.findByIdAndUpdate(msg.job_id, msg.body)
  .then(job => {
    res.code = 202 ;
    res.message = "job updated successfully" ;
    callback(null,res);
})
.catch(function (err) {
    res.message = err;
    res.code = 401;
    callback(null, res);
});
  

    console.log("after callback" + res);
};


exports.handle_request = handle_request;
