// Load Property model
const Recruiter = require('../../Model/Recruiter');
const Applicants = require('../../Model/Applicant');

function handle_request(msg, callback) {
    console.log("KAFKA : acceptConnection --> ", msg.email, msg.body);
    var res = {};

    if (msg.body.recruiterLoggedin && msg.body.sendToRecruiter) {
        Recruiter.update(
            {'email': msg.body.requestFrom},
            {"$push": {"connections": {"acceptedFrom": msg.email}}}
        )
            .then(job => {
                if (!job) {
                    res.code = 404;
                    res.message = "Applicant Connections not found";
                    callback(null, res);
                } else {
                    Recruiter.update(
                        {'email': msg.email},
                        {"$push": {"connections": {"acceptedFrom": msg.body.requestFrom}}},
                    )
                        .then(job => {
                            if (!job) {
                                res.code = 404;
                                res.message = "Applicant Connections not found";
                                callback(null, res);
                            } else {
                                Recruiter.update(
                                    {'email': msg.email},
                                    //{"$push":{"connections":{"acceptedFrom":msg.body.requestFrom}}},
                                    {"$pull": {"connectionsRequests": {"requestFrom": msg.email}}},
                                    {safe: true, multi: true}
                                )
                                    .then(job => {
                                        if (!job) {
                                            res.code = 404;
                                            res.message = "Applicant Connections not found";
                                            callback(null, res);
                                        } else {
                                            res.code = 200;
                                            res.message = job;
                                            callback(null, res);

                                        }
                                    })
                            }

                        })
                }


            });
    } else if (!msg.body.recruiterLoggedin && !msg.body.sendToRecruiter) {
        Applicants.update(
            {'email': msg.body.requestFrom},
            {"$push": {"connections": {"acceptedFrom": msg.email}}}
        )
            .then(job => {
                if (!job) {
                    res.code = 404;
                    res.message = "Applicant Connections not found";
                    callback(null, res);
                } else {
                    Applicants.update(
                        {'email': msg.email},
                        {"$push": {"connections": {"acceptedFrom": msg.body.requestFrom}}}
                    )
                        .then(job => {
                            if (!job) {
                                res.code = 404;
                                res.message = "Applicant Connections not found";
                                callback(null, res);
                            } else {
                                Applicants.update(
                                    {'email': msg.email},
                                    //{"$push":{"connections":{"acceptedFrom":msg.body.requestFrom}}},
                                    {"$pull": {"connectionsRequests": {"requestFrom": msg.body.requestFrom}}},
                                    {safe: true, multi: true}
                                )
                                    .then(job => {
                                        if (!job) {
                                            res.code = 404;
                                            res.message = "Applicant Connections not found";
                                            callback(null, res);
                                        } else {
                                            res.code = 200;
                                            res.message = job;
                                            callback(null, res);

                                        }
                                    })
                            }

                        })
                }


            });


    } else if (!msg.body.recruiterLoggedin && msg.body.sendToRecruiter) {
        Applicants.update(
            {'email': msg.email},
            {"$push": {"connections": {"acceptedFrom": msg.body.requestFrom}}}
        )
            .then(job => {
                if (!job) {
                    res.code = 404;
                    res.message = "Applicant Connections not found";
                    callback(null, res);
                } else {
                    Recruiter.update(
                        {'email': msg.body.requestFrom},
                        {"$push": {"connections": {"acceptedFrom": msg.email}}}
                    )
                        .then(job => {
                            if (!job) {
                                res.code = 404;
                                res.message = "Applicant Connections not found";
                                callback(null, res);
                            } else {
                                Applicants.update(
                                    {'email': msg.email},
                                    //{"$push":{"connections":{"acceptedFrom":msg.body.requestFrom}}},
                                    {"$pull": {"connectionsRequests": {"requestFrom": msg.body.requestFrom}}},
                                    {safe: true, multi: true}
                                )
                                    .then(job => {
                                        if (!job) {
                                            res.code = 404;
                                            res.message = "Applicant Connections not found";
                                            callback(null, res);
                                        } else {
                                            res.code = 200;
                                            res.message = job;
                                            callback(null, res);

                                        }
                                    })
                            }

                        })
                }


            });

    } else if (msg.body.recruiterLoggedin && !msg.body.sendToRecruiter) {

        Applicants.update(
            {'email': msg.body.requestFrom},
            {"$push": {"connections": {"acceptedFrom": msg.email}}}
        )
            .then(job => {
                if (!job) {
                    res.code = 404;
                    res.message = "Applicant Connections not found";
                    callback(null, res);
                } else {
                    Recruiter.update(
                        {'email': msg.email},
                        {"$push": {"connections": {"acceptedFrom": msg.body.requestFrom}}}
                    )
                        .then(job => {
                            if (!job) {
                                res.code = 404;
                                res.message = "Applicant Connections not found";
                                callback(null, res);
                            } else {
                                Recruiter.update(
                                    {'email': msg.email},
                                    //{"$push":{"connections":{"acceptedFrom":msg.body.requestFrom}}},
                                    {"$pull": {"connectionsRequests": {"requestFrom": msg.body.requestFrom}}},
                                    {safe: true, multi: true}
                                )
                                    .then(job => {
                                        if (!job) {
                                            res.code = 404;
                                            res.message = "Applicant Connections not found";
                                            callback(null, res);
                                        } else {
                                            res.code = 200;
                                            res.message = job;
                                            callback(null, res);

                                        }
                                    })
                            }

                        })
                }


            });


    }


    /*  {
          Recruiter.update(
              {'email': msg.email},
              //{"$push":{"connections":{"acceptedFrom":msg.body.requestFrom}}},
              {"$pull": {"connectionsRequests": {"requestFrom": msg.body.requestFrom}}},
              {safe: true, multi: true}
          )
              .then(job => {
                  if (!job) {
                      res.code = 404;
                      res.message = "Recruiter Connections not found";
                      callback(null, res);
                  }
                  Recruiter.update(
                      {'email': msg.body.requestFrom},
                      //{"$push":{"connections":{"acceptedFrom":msg.body.requestFrom}}},
                      {"$pull": {"connectionsRequests": {"requestFrom": msg.email}}},
                      {safe: true, multi: true}
                  )
                      .then(job => {
                          if (!job) {
                              res.code = 404;
                              res.message = "Applicant Connections not found";
                              callback(null, res);
                          }
                          Recruiter.update(
                              {'email': msg.email},
                              {"$push": {"connections": {"acceptedFrom": msg.body.requestFrom}}},
                          )
                              .then(job => {
                                  if (!job) {
                                      res.code = 404;
                                      res.message = "Applicant Connections not found";
                                      callback(null, res);
                                  }
                                  Recruiter.update(
                                      {'email': msg.body.requestFrom},
                                      {"$push": {"connections": {"acceptedFrom": msg.email}}}
                                  )
                                      .then(job => {
                                          if (!job) {
                                              res.code = 404;
                                              res.message = "Applicant Connections not found";
                                              callback(null, res);
                                          }

                                          Applicants.update(
                                              {'email': msg.email},
                                              //{"$push":{"connections":{"acceptedFrom":msg.body.requestFrom}}},
                                              {"$pull": {"connectionsRequests": {"requestFrom": msg.body.requestFrom}}},
                                              {safe: true, multi: true}
                                          )
                                              .then(job => {
                                                  if (!job) {
                                                      res.code = 404;
                                                      res.message = "Recruiter Connections not found";
                                                      callback(null, res);
                                                  }
                                                  Applicants.update(
                                                      {'email': msg.body.requestFrom},
                                                      //{"$push":{"connections":{"acceptedFrom":msg.body.requestFrom}}},
                                                      {"$pull": {"connectionsRequests": {"requestFrom": msg.email}}},
                                                      {safe: true, multi: true}
                                                  )
                                                      .then(job => {
                                                          if (!job) {
                                                              res.code = 404;
                                                              res.message = "Applicant Connections not found";
                                                              callback(null, res);
                                                          }
                                                          Applicants.update(
                                                              {'email': msg.email},
                                                              {"$push": {"connections": {"acceptedFrom": msg.body.requestFrom}}},
                                                          )
                                                              .then(job => {
                                                                  if (!job) {
                                                                      res.code = 404;
                                                                      res.message = "Applicant Connections not found";
                                                                      callback(null, res);
                                                                  }
                                                                  Applicants.update(
                                                                      {'email': msg.body.requestFrom},
                                                                      {"$push": {"connections": {"acceptedFrom": msg.email}}}
                                                                  )
                                                                      .then(job => {
                                                                          if (!job) {
                                                                              res.code = 404;
                                                                              res.message = "Applicant Connections not found";
                                                                              callback(null, res);
                                                                          }
                                                                          res.code = 200;
                                                                          res.message = job;
                                                                          callback(null, res);
                                                                      })

                                                              })

                                                      })
                                              })
                                      })

                              })

                      })
              })
              .catch(function (err) {
                  res.message = err;
                  res.code = 400;
                  callback(null, res);
              });

      }
  else
      if (msg.body.recruiterLoggedin === true && msg.body.sendToRecruiter === false) {
          Recruiter.update(
              {'email': msg.email},
              //{"$push":{"connections":{"acceptedFrom":msg.body.requestFrom}}},
              {"$pull": {"connectionsRequests": {"requestFrom": msg.body.requestFrom}}},
              {safe: true, multi: true}
          )
              .then(job => {
                  if (!job) {
                      res.code = 404;
                      res.message = "Recruiter Connections not found";
                      callback(null, res);
                  }
                  Recruiter.update(
                      {'email': msg.body.requestFrom},
                      //{"$push":{"connections":{"acceptedFrom":msg.body.requestFrom}}},
                      {"$pull": {"connectionsRequests": {"requestFrom": msg.email}}},
                      {safe: true, multi: true}
                  )
                      .then(job => {
                          if (!job) {
                              res.code = 404;
                              res.message = "Applicant Connections not found";
                              callback(null, res);
                          }
                          Recruiter.update(
                              {'email': msg.email},
                              {"$push": {"connections": {"acceptedFrom": msg.body.requestFrom}}},
                          )
                              .then(job => {
                                  if (!job) {
                                      res.code = 404;
                                      res.message = "Applicant Connections not found";
                                      callback(null, res);
                                  }
                                  Recruiter.update(
                                      {'email': msg.body.requestFrom},
                                      {"$push": {"connections": {"acceptedFrom": msg.email}}}
                                  )
                                      .then(job => {
                                          if (!job) {
                                              res.code = 404;
                                              res.message = "Applicant Connections not found";
                                              callback(null, res);
                                          }

                                          Applicants.update(
                                              {'email': msg.email},
                                              //{"$push":{"connections":{"acceptedFrom":msg.body.requestFrom}}},
                                              {"$pull": {"connectionsRequests": {"requestFrom": msg.body.requestFrom}}},
                                              {safe: true, multi: true}
                                          )
                                              .then(job => {
                                                  if (!job) {
                                                      res.code = 404;
                                                      res.message = "Recruiter Connections not found";
                                                      callback(null, res);
                                                  }
                                                  Applicants.update(
                                                      {'email': msg.body.requestFrom},
                                                      //{"$push":{"connections":{"acceptedFrom":msg.body.requestFrom}}},
                                                      {"$pull": {"connectionsRequests": {"requestFrom": msg.email}}},
                                                      {safe: true, multi: true}
                                                  )
                                                      .then(job => {
                                                          if (!job) {
                                                              res.code = 404;
                                                              res.message = "Applicant Connections not found";
                                                              callback(null, res);
                                                          }
                                                          Applicants.update(
                                                              {'email': msg.email},
                                                              {"$push": {"connections": {"acceptedFrom": msg.body.requestFrom}}},
                                                          )
                                                              .then(job => {
                                                                  if (!job) {
                                                                      res.code = 404;
                                                                      res.message = "Applicant Connections not found";
                                                                      callback(null, res);
                                                                  }
                                                                  Applicants.update(
                                                                      {'email': msg.body.requestFrom},
                                                                      {"$push": {"connections": {"acceptedFrom": msg.email}}}
                                                                  )
                                                                      .then(job => {
                                                                          if (!job) {
                                                                              res.code = 404;
                                                                              res.message = "Applicant Connections not found";
                                                                              callback(null, res);
                                                                          }
                                                                          res.code = 200;
                                                                          res.message = job;
                                                                          callback(null, res);
                                                                      })

                                                              })

                                                      })
                                              })
                                      })

                              })

                      })
              })
              .catch(function (err) {
                  res.message = err;
                  res.code = 400;
                  callback(null, res);
              });

      } else if (msg.body.recruiterLoggedin === false && msg.body.sendToRecruiter === true) {
          Recruiter.update(
              {'email': msg.email},
              //{"$push":{"connections":{"acceptedFrom":msg.body.requestFrom}}},
              {"$pull": {"connectionsRequests": {"requestFrom": msg.body.requestFrom}}},
              {safe: true, multi: true}
          )
              .then(job => {
                  if (!job) {
                      res.code = 404;
                      res.message = "Recruiter Connections not found";
                      callback(null, res);
                  }
                  Recruiter.update(
                      {'email': msg.body.requestFrom},
                      //{"$push":{"connections":{"acceptedFrom":msg.body.requestFrom}}},
                      {"$pull": {"connectionsRequests": {"requestFrom": msg.email}}},
                      {safe: true, multi: true}
                  )
                      .then(job => {
                          if (!job) {
                              res.code = 404;
                              res.message = "Applicant Connections not found";
                              callback(null, res);
                          }
                          Recruiter.update(
                              {'email': msg.email},
                              {"$push": {"connections": {"acceptedFrom": msg.body.requestFrom}}},
                          )
                              .then(job => {
                                  if (!job) {
                                      res.code = 404;
                                      res.message = "Applicant Connections not found";
                                      callback(null, res);
                                  }
                                  Recruiter.update(
                                      {'email': msg.body.requestFrom},
                                      {"$push": {"connections": {"acceptedFrom": msg.email}}}
                                  )
                                      .then(job => {
                                          if (!job) {
                                              res.code = 404;
                                              res.message = "Applicant Connections not found";
                                              callback(null, res);
                                          }

                                          Applicants.update(
                                              {'email': msg.email},
                                              //{"$push":{"connections":{"acceptedFrom":msg.body.requestFrom}}},
                                              {"$pull": {"connectionsRequests": {"requestFrom": msg.body.requestFrom}}},
                                              {safe: true, multi: true}
                                          )
                                              .then(job => {
                                                  if (!job) {
                                                      res.code = 404;
                                                      res.message = "Recruiter Connections not found";
                                                      callback(null, res);
                                                  }
                                                  Applicants.update(
                                                      {'email': msg.body.requestFrom},
                                                      //{"$push":{"connections":{"acceptedFrom":msg.body.requestFrom}}},
                                                      {"$pull": {"connectionsRequests": {"requestFrom": msg.email}}},
                                                      {safe: true, multi: true}
                                                  )
                                                      .then(job => {
                                                          if (!job) {
                                                              res.code = 404;
                                                              res.message = "Applicant Connections not found";
                                                              callback(null, res);
                                                          }
                                                          Applicants.update(
                                                              {'email': msg.email},
                                                              {"$push": {"connections": {"acceptedFrom": msg.body.requestFrom}}},
                                                          )
                                                              .then(job => {
                                                                  if (!job) {
                                                                      res.code = 404;
                                                                      res.message = "Applicant Connections not found";
                                                                      callback(null, res);
                                                                  }
                                                                  Applicants.update(
                                                                      {'email': msg.body.requestFrom},
                                                                      {"$push": {"connections": {"acceptedFrom": msg.email}}}
                                                                  )
                                                                      .then(job => {
                                                                          if (!job) {
                                                                              res.code = 404;
                                                                              res.message = "Applicant Connections not found";
                                                                              callback(null, res);
                                                                          }
                                                                          res.code = 200;
                                                                          res.message = job;
                                                                          callback(null, res);
                                                                      })

                                                              })

                                                      })
                                              })
                                      })

                              })

                      })
              })
              .catch(function (err) {
                  res.message = err;
                  res.code = 400;
                  callback(null, res);
              });

      } else if (msg.body.recruiterLoggedin === false && msg.body.sendToRecruiter === false) {
          Recruiter.update(
              {'email': msg.email},
              //{"$push":{"connections":{"acceptedFrom":msg.body.requestFrom}}},
              {"$pull": {"connectionsRequests": {"requestFrom": msg.body.requestFrom}}},
              {safe: true, multi: true}
          )
              .then(job => {
                  if (!job) {
                      res.code = 404;
                      res.message = "Recruiter Connections not found";
                      callback(null, res);
                  }
                  Recruiter.update(
                      {'email': msg.body.requestFrom},
                      //{"$push":{"connections":{"acceptedFrom":msg.body.requestFrom}}},
                      {"$pull": {"connectionsRequests": {"requestFrom": msg.email}}},
                      {safe: true, multi: true}
                  )
                      .then(job => {
                          if (!job) {
                              res.code = 404;
                              res.message = "Applicant Connections not found";
                              callback(null, res);
                          }
                          Recruiter.update(
                              {'email': msg.email},
                              {"$push": {"connections": {"acceptedFrom": msg.body.requestFrom}}},
                          )
                              .then(job => {
                                  if (!job) {
                                      res.code = 404;
                                      res.message = "Applicant Connections not found";
                                      callback(null, res);
                                  }
                                  Recruiter.update(
                                      {'email': msg.body.requestFrom},
                                      {"$push": {"connections": {"acceptedFrom": msg.email}}}
                                  )
                                      .then(job => {
                                          if (!job) {
                                              res.code = 404;
                                              res.message = "Applicant Connections not found";
                                              callback(null, res);
                                          }

                                          Applicants.update(
                                              {'email': msg.email},
                                              //{"$push":{"connections":{"acceptedFrom":msg.body.requestFrom}}},
                                              {"$pull": {"connectionsRequests": {"requestFrom": msg.body.requestFrom}}},
                                              {safe: true, multi: true}
                                          )
                                              .then(job => {
                                                  if (!job) {
                                                      res.code = 404;
                                                      res.message = "Recruiter Connections not found";
                                                      callback(null, res);
                                                  }
                                                  Applicants.update(
                                                      {'email': msg.body.requestFrom},
                                                      //{"$push":{"connections":{"acceptedFrom":msg.body.requestFrom}}},
                                                      {"$pull": {"connectionsRequests": {"requestFrom": msg.email}}},
                                                      {safe: true, multi: true}
                                                  )
                                                      .then(job => {
                                                          if (!job) {
                                                              res.code = 404;
                                                              res.message = "Applicant Connections not found";
                                                              callback(null, res);
                                                          }
                                                          Applicants.update(
                                                              {'email': msg.email},
                                                              {"$push": {"connections": {"acceptedFrom": msg.body.requestFrom}}},
                                                          )
                                                              .then(job => {
                                                                  if (!job) {
                                                                      res.code = 404;
                                                                      res.message = "Applicant Connections not found";
                                                                      callback(null, res);
                                                                  }
                                                                  Applicants.update(
                                                                      {'email': msg.body.requestFrom},
                                                                      {"$push": {"connections": {"acceptedFrom": msg.email}}}
                                                                  )
                                                                      .then(job => {
                                                                          if (!job) {
                                                                              res.code = 404;
                                                                              res.message = "Applicant Connections not found";
                                                                              callback(null, res);
                                                                          }
                                                                          res.code = 200;
                                                                          res.message = job;
                                                                          callback(null, res);
                                                                      })

                                                              })

                                                      })
                                              })
                                      })

                              })

                      })
              })
              .catch(function (err) {
                  res.message = err;
                  res.code = 400;
                  callback(null, res);
              });

      }

*/
    console.log("after callback" + res);
}


exports.handle_request = handle_request;