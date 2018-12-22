const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
var mysql = require('mysql');
var pool = require('../../db/pool');

function handle_request(msg, callback) {
    console.log("Kafka Backend --> Inside create Applicant Delete(MYSQL) Request Handler");
    var res = {};

    // Create JWT Payload
    var sql = "DELETE FROM APPLICANT WHERE EMAIL = " + mysql.escape(msg.applicant_id);
    pool.getConnection(function (err, con) {
        if (err) {
            res.err = err;
            res.code = 400;
            callback(null, res);
        } else {
            con.query(sql, function (err, result) {
                if (err) {
                    res.err = err;
                    res.code = 400;
                    callback(null, res);
                } else {
                    res.message = "created";
                    res.code = 202;
                    callback(null, res);
                }

            });


        }
    });

    console.log("after callback" + this.res);

};

exports.handle_request = handle_request;