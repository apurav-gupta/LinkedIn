var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit : 1000,
    connectTimeout  : 60 * 60 * 1000,
    acquireTimeout   : 60 * 60 * 1000,
    timeout         : 60 * 60 * 1000,
    port: '3306',
    //Uncomment below for cloggZilla DB
   // host: 'linkedin.cps5kt4trlcj.us-east-1.rds.amazonaws.com',
    //Uncomment below for using sanatized records DB.
     host: 'linkedin-v-01.cps5kt4trlcj.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'password273',
    database: 'LinkedIn'
});

module.exports = pool;