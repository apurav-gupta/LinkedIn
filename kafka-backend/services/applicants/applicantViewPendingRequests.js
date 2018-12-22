// Load Property model
const Applicants = require('../../Model/Applicant');

function handle_request(msg, callback) {
    console.log("KAFKA : viewApplicantPendingRequests --> ", msg.email);
    var res = {};
    Applicants.find({email:msg.email},
        { 'connectionsRequests':['requestFrom'] }
  )
  .then(job => {
    if (!job) {
        res.code = 404 ;
        res.message = "Applicant Connections not found" ;
        callback(null,res);
    }
    
    callback(null,job);
})
.catch(function (err) {
    res.message = err;
    res.code = 400;
    callback(null, res);
});
   console.log("after callback" + res);
};
/*---*/

exports.handle_request = handle_request;
