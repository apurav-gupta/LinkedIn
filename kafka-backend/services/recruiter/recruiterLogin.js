const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const keys = require('../../config/keys');
var mysql = require('mysql');
var pool = require('../../db/pool');


function handle_request(msg, callback) {
    var res = {};
    const email = msg.email;
    const password = msg.password;

    var sql =
        "SELECT * FROM RECRUITER WHERE EMAIL" + " = " + mysql.escape(email);

    pool.getConnection(function (err, con) {

        if (err) {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            });
            res.end("Could Not Get Connection Object");
        } else {
            con.query(sql, function (err, user) {
                if (err) {
                    res.writeHead(400, {
                        'Content-Type': 'text/plain'
                    });
                    res.end("Could Not Get Connection Object");
                } else {
                    if (user.length > 0) {
                        bcrypt.compare(password, user[0].PASSWORD).then(isMatch => {
                            if (isMatch) {
                                // User Matched
                                const payload = {
                                    email: email,
                                    isRecruiter: true
                                }; 
                                // Create JWT Payload
                                // Sign Token
                                jwt.sign(
                                    payload,
                                    keys.secretOrKey,
                                    {expiresIn: 3600},
                                    (err, token) => {
                                        res.code = 200;
                                        res.token = token;
                                        callback(err, res);
                                    }
                                )
                            } else {
                                res.err = 'Incorrect password';
                                res.code = 401;
                                callback(null, res);
                            }
                        }).catch(function (err) {
                            res.err = err;
                            res.code = 401;
                            callback(null, res);
                        });
                    } else {
                        res.err = 'User does not exist,Please Sign Up';
                        res.code = 401;
                        callback(null, res);
                    }
                }
            });
        }
    });
    console.log("after callback" + this.res);
};


exports.handle_request = handle_request;