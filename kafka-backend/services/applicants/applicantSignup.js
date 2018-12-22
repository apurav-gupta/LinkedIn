const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const keys = require('../../config/keys');
var mysql = require('mysql');
var pool = require('../../db/pool');

function handle_request(msg, callback) {
    console.log("Kafka Backend --> Inside create Applicant SignUp(MYSQL) Request Handler");
    var res = {};
    var password = msg.password;
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
            if (err) throw err;
            password = hash;
            const payload = {
                email: msg.email,
                isRecruiter: false
            }; 
            // Create JWT Payload
            var sql = "INSERT INTO APPLICANT (EMAIL, PASSWORD, IS_RECRUITER) VALUES ( " +
                mysql.escape(msg.email) + " , " + mysql.escape(password) + " , " + mysql.escape(true) + " ) ";
            var sqlCheckUserExists   = "SELECT * FROM APPLICANT WHERE EMAIL =" + mysql.escape(msg.email) ;
            pool.getConnection(function(err,con){
                if(err) {
                    res.err = err;
                    res.code = 400;
                    callback(null, res);
                } else {
                    con.query(sqlCheckUserExists, function(err, result){
                        if(err) {
                            res.err = err;
                            res.code = 400;
                            callback(null, res);
                        } else if(result.length > 0) {
                            console.log("User already exists");
                            // res.err = err;
                            res.code = 409;
                            callback(null, res);
                        } else {
                            con.query(sql, function (err, result) {
                                if (err) {
                                    res.err = err;
                                    res.code = 400;
                                    callback(null, res);
                                } else {
                                    jwt.sign(
                                        payload,
                                        keys.secretOrKey,
                                        {expiresIn: 3600},
                                        (err, token) => {
                                            res.code = 201;
                                            res.token = token;
                                            callback(err, res);
                                        }
                                    );
                                }
        
                            });
                        }
                    })
                }
            });

            // pool.getConnection(function (err, con) {
            //     if (err) {
            //         res.err = err;
            //         res.code = 400;
            //         callback(null, res);
            //     } else {
            //         con.query(sql, function (err, result) {
            //             if (err) {
            //                 res.err = err;
            //                 res.code = 400;
            //                 callback(null, res);
            //             } else {
            //                 jwt.sign(
            //                     payload,
            //                     keys.secretOrKey,
            //                     {expiresIn: 3600},
            //                     (err, token) => {
            //                         res.code = 201;
            //                         res.token = token;
            //                         callback(err, res);
            //                     }
            //                 );
            //             }

            //         });
            //     }
            // });
            console.log("after callback" + this.res);
        })
    })
};

exports.handle_request = handle_request;