var chai = require('chai'), chaiHttp = require('chai-http');
// const { CONSTANTS } = require('../Constants');

chai.use(chaiHttp);

var expect = chai.expect;
//Applicant Login
it("Should check Applicant credentials and return status code", function(done){
    chai.request(`http://LinkedIn-Backend-1636541959.us-west-1.elb.amazonaws.com`)
    .post('/applicants/login')
    .send({
            "email": "robert@gmail.com",
            "password": "Robert@1234",
    })
    .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
    });
})


//Recruiter Login :
it("Should check Recruiter credentials and return status code", function(done){
    chai.request(`http://LinkedIn-Backend-1636541959.us-west-1.elb.amazonaws.com`)
    .post('/recruiters/login')
    .send({
            "email": "john@gmail.com",
            "password": "John@1234",
    })
    .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
    });
})

//Search a Job:

it("Should search Job and return status code", function(done){
    chai.request(`http://LinkedIn-Backend-1636541959.us-west-1.elb.amazonaws.com`)
    .get('/jobs/jobSearch')
    .send({
        "jobname":"Software Engineer", 
        "joblocation": "San jose", 
        
    })
    .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
    });
})

//Graph Profile view Count
it("Should return the profile view count", function(done){
    chai.request(`http://LinkedIn-Backend-1636541959.us-west-1.elb.amazonaws.com`)
    .get(`/applicants/goel1@gmail.com/logs/profile-view-count`)
    .send({
        
    })
    .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
    });
})

//Graph bottom -five jobs

it("Should return the bottom five jobs", function(done){
    chai.request(`http://LinkedIn-Backend-1636541959.us-west-1.elb.amazonaws.com`)
    .get(`/recruiters/recruiter13@gmail.com/last-five`)
    .send({
        
    })
    .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
    });
})

//Graph city-wise details
it("Should return the city-wise details", function(done){
    chai.request(`http://LinkedIn-Backend-1636541959.us-west-1.elb.amazonaws.com`)
    .get(`/recruiters/recruiter13@gmail.com/jobs/logs/citywise`)
    .send({
        
    })
    .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
    });
})

//Graph Clicks-per Job

it("Should return the Clicks per job count", function(done){
    chai.request(`http://LinkedIn-Backend-1636541959.us-west-1.elb.amazonaws.com`)
    .get(`/recruiters/recruiter13@gmail.com/jobs/logs/click-count`)
    .send({
        
    })
    .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
    });
})

//Saved Jobs count

it("Should return saved jobs count", function(done){
    chai.request(`http://LinkedIn-Backend-1636541959.us-west-1.elb.amazonaws.com`)
    .get(`/recruiters/recruiter13@gmail.com/jobs/logs/saved-job-count`)
    .send({
        
    })
    .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
    });
})

//Graph Top ten job posting

it("Should return top ten job posting", function(done){
    chai.request(`http://LinkedIn-Backend-1636541959.us-west-1.elb.amazonaws.com`)
    .get(`/recruiters/recruiter13@gmail.com/jobs/top-ten`)
    .send({
        
    })
    .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
    });
})

//Location trace based on routes traversed

it("Should not return routes group by location for a particular region", function(done){
    chai.request(`http://LinkedIn-Backend-1636541959.us-west-1.elb.amazonaws.com`)
    .get(`/recruiters/locations/track?San jose`)
    .send({
        
    })
    .end(function (err, res) {
        expect(res).to.have.status(404);
        done();
    });
})
//Location trace based on routes traversed

it("Should return routes for a particular user", function(done){
    chai.request(`http://LinkedIn-Backend-1636541959.us-west-1.elb.amazonaws.com`)
    .get(`/recruiters/track?recruiter13@gmail.com`)
    .send({
        
    })
    .end(function (err, res) {
        expect(res).to.have.status(401);
        done();
    });
})
