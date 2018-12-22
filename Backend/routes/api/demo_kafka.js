// const travelerModel = require("../models/traveler");
// const ownerModel = require("../models/owner");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
// const JWT_KEY = "secret";
// require("dotenv").config();

// function handle_request(msg, callback) {
//   var res = {};
//   console.log("In handle request:" + JSON.stringify(msg));
//   var email = msg.email;
//   var password = msg.password;
//   console.log("Email and Password:  : ", email, password);
//   if (msg.isTraveler) {
//     console.log("Inside Traveler Login Request");
//     //QUERY TRAVELER_INFO Collection to get the email and password
//     travelerModel
//       .findOne({ email: email })
//       .exec()
//       .then(traveler => {
//         if (traveler.length < 1) {
//           // return res.status(401).json({
//           //     message: 'Auth failed'
//           // });
//           // throw err;
//           callback(err, "Auth failed");
//         }
//         // } else {
//         bcrypt.compare(msg.password, traveler.password, (err, result) => {
//           if (err) {
//             // return res.status(401).json({
//             //     message: 'Auth failed'
//             // });
//             // throw err;
//             callback(err, "Auth failed");
//           }
//           if (result) {
//             const token = jwt.sign(
//               {
//                 email: traveler.email,
//                 userId: traveler._id,
//                 firstname: traveler.firstname,
//                 lastname: traveler.lastname,
//                 phonenumber: traveler.phonenumber,
//                 profileimage: traveler.profileimage,
//                 aboutme: traveler.aboutme,
//                 city: traveler.city,
//                 country: traveler.country,
//                 company: traveler.company,
//                 school: traveler.school,
//                 hometown: traveler.hometown,
//                 languages: traveler.languages,
//                 gender: traveler.gender,
//                 memberSince: traveler.memberSince,
//                 isTraveler: traveler.isTraveler
//               },
//               JWT_KEY,
//               // process.env.JWT_KEY,
//               {
//                 expiresIn: "1h"
//               }
//             );
//             // return res.status(200).json( {
//             //     message: "Auth Successful",
//             //     token : token
//             //     });
//             callback(null, token);
//           } else {
//             callback(err, "Auth failed");
//           }
//           // res.status(401).json({
//           //     message: 'Auth failed'
//           // });
//         });
//         // }
//       })
//       .catch(err => {
//         console.log(err);
//         // res.status(500).json({
//         //     error:err
//         // });
//         callback(err, "Resource not found");
//       });
//   } else {
//     console.log("Inside Owner Login Request");
//     //QUERY OWNER_INFO Collection to get the email and password
//     ownerModel
//       .findOne({ email: email })
//       .exec()
//       .then(owner => {
//         if (owner.length < 1) {
//           // return res.status(401).json({
//           //     message: 'Auth failed'
//           // });
//           callback(err, "Auth failed");
//         }
//         bcrypt.compare(msg.password, owner.password, (err, result) => {
//           if (err) {
//             // return res.status(401).json({
//             //     message: 'Auth failed'
//             // });
//             callback(err, "Auth failed");
//           }
//           if (result) {
//             const token = jwt.sign(
//               {
//                 email: owner.email,
//                 userId: owner._id,
//                 firstname: owner.firstname,
//                 lastname: owner.lastname,
//                 phonenumber: owner.phonenumber,
//                 profileimage: owner.profileimage,
//                 aboutme: owner.aboutme,
//                 city: owner.city,
//                 country: owner.country,
//                 company: owner.company,
//                 school: owner.school,
//                 hometown: owner.hometown,
//                 languages: owner.languages,
//                 gender: owner.gender,
//                 memberSince: owner.memberSince,
//                 isTraveler: owner.isTraveler
//               },
//               JWT_KEY,
//               // process.env.JWT_KEY,
//               {
//                 expiresIn: "1h"
//               }
//             );
//             // return res.status(200).json( {
//             //     message: "Auth Successful",
//             //     token : token
//             // });
//             callback(null, token);
//           }
//           // res.status(401).json({
//           //     message: 'Auth failed'
//           // });
//           callback(err, "Auth failed");
//         });
//       })
//       .catch(err => {
//         console.log(err);
//         // res.status(500).json({
//         //     error:err
//         // });
//         callback(err, "Resource not found");
//       });
//   }
// }

// exports.handle_request = handle_request;
