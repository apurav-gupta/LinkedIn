
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
var kafka = require("../../kafka/client");
var redis = require("../../redis.js");
const Applicants = require("../../Model/Applicant");
const neo4j = require('neo4j-driver').v1;
// const driver = neo4j.driver("bolt://localhost:7687", neo4j.auth.basic("neo4j", "password273"));
const driver = neo4j.driver("bolt://purple-keebler-trail-bennie.graphstory.link/", neo4j.auth.basic("purple_keebler_trail_bennie", "dSn2RBNgttSIxhnLmERYEcpuuUW"));
const session = driver.session();



/****************Create Graph User*********************/
router.post("/:email", function(req, res) {
    console.log("Backend Applicant Accept Connection into graph");
   
      const errors = {};
      var responseRadis = {};
      var resP = {};
      console.log("params ",req.params.email);
  
  
      const personName = req.params.email;
      const resultPromise = session.run(
        'CREATE (a:Person {name: $name}) RETURN a',
        {name: personName}
      );
      
      resultPromise.then(result => {
        session.close();
      
        const singleRecord = result.records[0];
        const node = singleRecord.get(0);
      
        console.log(node.properties.name);
      
        // on application exit:
        driver.close();
      });
      res.send(200);
  
    
  });
  
/****************get all Graph User*********************/
router.get("/", function(req, res) {
    console.log("Backend Applicant Accept Connection into graph");
    const session = driver.session();
    const result = session.run('MATCH (p) RETURN p');
    const collectedNames = [];
    
    result.subscribe({
      onNext: record => {
        const name = record.get(0);
        collectedNames.push(name);
      },
      onCompleted: () => {
        session.close();
    
        console.log('Names: ' + collectedNames.join(', '));
        res.send(collectedNames);
      },
      onError: error => {
        console.log(error);
        res.send(400);
      }
    });
      
     
    
  });
  
  
  

/****************Create Graph User COnnection *********************/
router.post("/createConnection/:email", function(req, res) {
    console.log("Backend Applicant Accept Connection into graph");
   
      const errors = {};
      var responseRadis = {};
      var resP = {};
      console.log("params ",req.params.email);
      console.log("body ",req.body.email);
  
  
      const requester = req.params.email;
      const to = req.body.email;
      const resultPromise = session.run( 'MATCH (a:Person),(b:Person) WHERE a.name = $requestername AND b.name = $toname CREATE (a)-[r:CONNECTED]->(b) RETURN r',
      {requestername: requester,toname: to }
      );
      
      resultPromise.then(result => {
        session.close();
      
        const singleRecord = result.records[0];
        const node = singleRecord.get(0);
      
        console.log(node.properties.name);
      
        // on application exit:
        driver.close();
        res.sendStatus(200);
      })
      .catch(err=>{

      console.log("errored" , err)
      res.sendStatus(400);
        });
      
  
    
  });

/*

MATCH (a:Person)-[:CONNECTED*2..2]-(friend_of_friend)
WHERE a.name="ak@gmail.com" AND NOT (a:Person)-[:CONNECTED]-(friend_of_friend)
RETURN friend_of_friend.name, COUNT(*)
ORDER BY COUNT(*) DESC, friend_of_friend.name

*/
/****************get Reccomendation Graph User*********************/
router.get("/getRecommendation/:email", function(req, res) {
    console.log("Backend Applicant GET recommendation into graph");
    const session = driver.session();

    const result = session.run('MATCH (a:Person)-[:CONNECTED*2..2]-(friend_of_friend) WHERE a.name=$email AND NOT (a:Person)-[:CONNECTED]-(friend_of_friend) RETURN friend_of_friend.name, COUNT(*) ORDER BY COUNT(*) DESC, friend_of_friend.name' , {email : req.params.email});
    const collectedNames = [];
    
    result.subscribe({
      onNext: record => {
        const name = record.get(0);
        collectedNames.push(name);
      },
      onCompleted: () => {
        session.close();
    
        console.log('Names: ' + collectedNames.join(', '));
        res.send(collectedNames);
      },
      onError: error => {
        console.log(error);
        res.send(400);
      }
    });
      
     
    
  });

  module.exports = router;