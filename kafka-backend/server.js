var connection = new require("./kafka/Connection");
var { mongoose } = require("./db/mongo");
//topics files
//var signin = require('./services/signin.js');

//topics files
//var signin = require('./services/signin.js');
var Log = require("./services/logs.js");
var Job = require("./services/jobs.js");
var JobSearch = require("./services/Jobs/jobSearch");
var ApplicantDetails = require("./services/applicants/applicantViewProfile");
var RecruiterDetails = require("./services/recruiter/recruiterViewProfile");
var ApplicantLogin = require("./services/applicants/applicantLogin");
var RecruiterLogin = require("./services/recruiter/recruiterLogin");
var ApplicantSignup = require("./services/applicants/applicantSignup");
var RecruiterSignup = require("./services/recruiter/recruiterSignup");
var ApplicantSignupMongo = require("./services/applicants/applicantSignupMongo");
var RecruiterSignupMongo = require("./services/recruiter/recruiterSignupMongo");
var ApplicantUpdateProfile = require("./services/applicants/applicantUpdateProfile");
var RecruiterUpdateProfile = require("./services/recruiter/recruiterUpdateProfile");
var ApplicantDelete = require("./services/applicants/applicantDelete");
var ApplicantDeleteMysql = require("./services/applicants/applicantDeleteMysql");
var RecruiterDelete = require("./services/recruiter/recruiterDelete");
var Applicant = require("./services/applicants/applicants.js");
var RecruiterJobView = require("./services/recruiter/recruiterViewJobById");
var RecruiterJobUpdate = require("./services/recruiter/recruiterUpdateJob");
var sendMessage = require("./services/applicants/sendMessage");
var receiveMessage = require("./services/applicants/receiveMessage");
var applicantMessages = require("./services/applicants/applicantMessages");
var ApplicantViewConnections = require("./services/applicants/ApplicantViewConnections");
var ApplicantSendConnections = require("./services/applicants/ApplicantConnectionSend");
var AddApplicantExperience = require("./services/profile/applicant/addExperience");
var EditApplicantExperience = require("./services/profile/applicant/editExperience");
var AddApplicantEducation = require("./services/profile/applicant/addEducation");
var EditApplicantEducation = require("./services/profile/applicant/editEducation");
var AddApplicantSkill = require("./services/profile/applicant/addSkill");
var EditApplicantSkill = require("./services/profile/applicant/editSkill");
var EditApplicantSummary = require("./services/profile/applicant/editSummary");
var EditRecruiterSummary = require("./services/profile/recruiter/editSummary");
var JobPost = require("./services/Jobs/postJob");
var RecruiterGetJobs = require("./services/Jobs/recruiterGetJobs");
var ApplicantViewPendingRequests = require("./services/applicants/applicantViewPendingRequests");
var ApplicantSearchProfile = require("./services/applicants/applicantSearchProfile");
var ApplicantAcceptConnection = require("./services/applicants/ApplicantConnectionAccept");
var RecruiterViewConnections = require("./services/recruiter/RecruiterViewConnections");
var RecruiterSendConnections = require("./services/recruiter/RecruiterConnectionSend");
var RecruiterViewPendingRequests = require("./services/recruiter/RecruiterViewPendingRequests");
var RecruiterAcceptConnection = require("./services/recruiter/RecruiterConnectionAccept");
var ApplicantSavedJobs = require("./services/Jobs/ApplicantSavedJobs");

function handleTopicRequest(topic_name, fname) {
  //var topic_name = 'root_topic';
  var consumer = connection.getConsumer(topic_name);
  var producer = connection.getProducer();
  console.log("server is running ");
  consumer.on("message", function(message) {
    console.log("message received for " + topic_name + " ", fname);
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);

    fname.handle_request(data.data, function(err, res) {
      console.log("after handle" + res);
      var payloads = [
        {
          topic: data.replyTo,
          messages: JSON.stringify({
            correlationId: data.correlationId,
            data: res
          }),
          partition: 0
        }
      ];
      producer.send(payloads, function(err, data) {
        console.log(data);
      });
      return;
    });
  });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request

/*handleTopicRequest("logs_topic", Log);
handleTopicRequest("jobs_topic", Job);
handleTopicRequest("applicant_details", ApplicantDetails);
handleTopicRequest("recruiter_details", RecruiterDetails);
handleTopicRequest("applicant_login", ApplicantLogin);
handleTopicRequest("recruiter_login", RecruiterLogin);
handleTopicRequest("applicant_signup", ApplicantSignup);
handleTopicRequest("applicant_signup_mongo", ApplicantSignupMongo);
handleTopicRequest("recruiter_signup_mongo", RecruiterSignupMongo);
handleTopicRequest("recruiter_signup", RecruiterSignup);
handleTopicRequest("applicant_update_profile", ApplicantUpdateProfile);
handleTopicRequest("recruiter_update_profile", RecruiterUpdateProfile);
handleTopicRequest("applicant_delete", ApplicantDelete);
handleTopicRequest("applicant_mysql_delete", ApplicantDeleteMysql);
handleTopicRequest("applicant_topic", Applicant);
handleTopicRequest("send_message", sendMessage);
handleTopicRequest("receive_message", receiveMessage);

handleTopicRequest("recruiter_delete", RecruiterDelete);
handleTopicRequest("recruiter_JobView", RecruiterJobView);
handleTopicRequest("recruiter_JobUpdate", RecruiterJobUpdate);
handleTopicRequest("add_experience", AddApplicantExperience);
handleTopicRequest("edit_experience", EditApplicantExperience);

handleTopicRequest("edit_education", EditApplicantEducation);
handleTopicRequest("add_education", AddApplicantEducation);
handleTopicRequest("add_skill", AddApplicantSkill);
handleTopicRequest("edit_skill", EditApplicantSkill);
handleTopicRequest("edit_summary", EditApplicantSummary);

handleTopicRequest("edit_recruiter_summary", EditRecruiterSummary);

handleTopicRequest("applicant_messages", applicantMessages);
handleTopicRequest("applicant_ViewConnection", ApplicantViewConnections);
handleTopicRequest("applicant_SendConnection", ApplicantSendConnections);
handleTopicRequest("search_job", JobSearch);
handleTopicRequest("post_job", JobPost);
handleTopicRequest("rec_get_jobs", RecruiterGetJobs);
handleTopicRequest("applicant_PendingRequests", ApplicantViewPendingRequests);
handleTopicRequest("applicant_SearchProfile", ApplicantSearchProfile);
handleTopicRequest("applicant_AcceptConnection", ApplicantAcceptConnection);
handleTopicRequest("applicant_SearchProfile", ApplicantSearchProfile);
handleTopicRequest("recruiter_ViewConnection", RecruiterViewConnections);
handleTopicRequest("recruiter_SendConnection", RecruiterSendConnections);
handleTopicRequest("recruiter_PendingRequests", RecruiterViewPendingRequests);
handleTopicRequest("recruiter_AcceptConnection", RecruiterAcceptConnection);
handleTopicRequest("saved_jobs", ApplicantSavedJobs);*/
/* ****************************************************
please  UPDATE  below code before adding new topics
*/

/*
Run the topics using
//Change port between 2181(default) / 2183 depending on compatability 
(bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic logs_topic;
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic jobs_topic; 
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic applicant_details;
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic applicant_details;
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic recruiter_details;
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic applicant_login;
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic recruiter_login;
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic applicant_signup; 
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic applicant_signup_mongo;
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic recruiter_signup;
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic recruiter_signup_mongo;
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic applicant_update_profile;
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic recruiter_update_profile;
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic applicant_delete;
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic recruiter_delete;
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic applicant_topic;
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic recruiter_JobView;
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic recruiter_JobUpdate;
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic send_message;
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic receive_message;
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic applicant_messages;
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic applicant_signup_mongo;
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic applicant_ViewConnection;
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic applicant_SendConnection;
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic rec_get_jobs;
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic post_job;
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic search_job;
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic add_experience;
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic edit_experience;
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic edit_education;
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic add_education;
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic add_skill;
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic edit_skill;
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic edit_summary;
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic applicant_PendingRequests;
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic applicant_SearchProfile;
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic applicant_AcceptConnection;
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic edit_recruiter_summary;
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic applicant_mysql_delete;
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic recruiter_ViewConnection;
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic recruiter_SendConnection;
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic recruiter_PendingRequests;
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic recruiter_AcceptConnection;
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic saved_jobs;
) &
*/
