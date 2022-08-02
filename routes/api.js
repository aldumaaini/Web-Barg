const express = require("express");
const jwt = require("jsonwebtoken");
const env = require("dotenv");
const bcrypt = require("bcrypt");
const { CON } = require("../utlis/dbCon");
const { ResponseHandler } = require("../utlis/ResponseHandler");
const { verifyJWT } = require("../utlis/auth");
const axios = require("axios");
const moment = require("moment");
const router = express.Router();
env.config({ path: "./.env" });

//get value of SECRETKEY for hashing
const SECRETKEY = process.env.SECRETKEY || "";
("");

/* SIGN-UP router */

router.post("/signup", async function (req, res) {
  const { Fullname, phone, password, email } = req.body;
  const role = "user";
  const saltRounds = 10;

  CON.query(
    "SELECT COUNT(*) AS PhoneCount FROM users WHERE phone=?",
    [phone],
    async function (err, results) {
      if (err) res.status(500).send(ResponseHandler(500, null, null));
      else {
        var phoneCount = results[0].PhoneCount;
        if (phoneCount === 1) {
          res.status(500).send(ResponseHandler(400, null, null));
        } else {
          bcrypt.hash(password, saltRounds, function (err, hashedPassword) {
            if (err) res.status(500).send(ResponseHandler(500, null, null));
            else {
              CON.query(
                "INSERT INTO users( FullName,role,email, password,phone)VALUES(?,?,?,?,?)",
                [Fullname, role, email, hashedPassword, phone],
                function (err) {
                  if (err)
                    res.status(500).send(ResponseHandler(500, null, null));
                  else
                    res
                      .status(200)
                      .send(ResponseHandler(200, null, "successfull"));
                }
              );
            }
          });
        }
      }
    }
  );
});
router.get("/welcome", function (req, res) {
  res.status(200).send(ResponseHandler(200, { hi: "Hi" }, "success"));
});

/* LOGIN - router */
router.post("/login", function (req, res) {
  console.log(req.body);
  const { mobile, password } = req.body;
  CON.query(
    "SELECT u.id AS userID, u.password,u.email, u.FullName,u.phone,up.planType,up.PlanExpireDate,up.planStatus,up.totalUsedMessage FROM users u INNER JOIN userPlan up ON u.id = up.userId WHERE u.phone = ?",
    [mobile],
    async function (err, Results) {
      if (err) {
        console.log(err);
        res.status(500).send(ResponseHandler(500, null, null));
      } else {
        if (Results.length === 1) {
          let userPassword = Results[0].password;
          let userID = Results[0].userID;
          let email = Results[0].email;
          let FullName = Results[0].FullName;
          let phone = Results[0].phone;
          let planType = Results[0].planType;
          let PlanExpireDate = Results[0].PlanExpireDate;
          let totalUsedMessage = Results[0].totalUsedMessage;
          let planStatus = Results[0].planStatus;
          const match = await bcrypt.compare(password, userPassword);
          if (match) {
            const token = jwt.sign({ userID: userID }, SECRETKEY, {
              expiresIn: "30d",
            });
            let userData = {
              token: token,
              user: {
                userId: userID,
                FullName,
                email,
                phone,
                planType, // plan type either Free or premiume
                PlanExpireDate, // plan expiry date
                totalUsedMessage, // this to track sent messages
                planStatus, // either active or unactive
              },
            };

            res.status(200).send(ResponseHandler(200, userData, "successfull"));
          } else {
            res
              .status(401)
              .send(ResponseHandler(401, null, "Password not matching"));
          }
        } else {
          res
            .status(404)
            .send(
              ResponseHandler(
                404,
                null,
                "No account associated with this phone number"
              )
            );
        }
      }
    }
  );
});

/* Authentication - router */

router.get("/isValidUser", verifyJWT, (req, res) => {
  const token = req.headers["x-auth-token"];
  CON.query(
    "SELECT u.id AS userID, u.password,u.email, u.FullName,u.phone,up.planType,up.PlanExpireDate,up.planStatus,up.totalUsedMessage FROM users u INNER JOIN userPlan up ON u.id = up.userId WHERE u.id = ?",
    req.user,
    (err, user) => {
      if (err) return res.status(500).send(ResponseHandler(500, null, null));
      else {
        if (user.length > 0) {
          let userID = user[0].userID;
          let email = user[0].email;
          let FullName = user[0].FullName;
          let phone = user[0].phone;
          let planType = user[0].planType;
          let PlanExpireDate = user[0].PlanExpireDate;
          let totalUsedMessage = user[0].totalUsedMessage;
          let planStatus = user[0].planStatus;
          let userData = {
            token: token,
            user: {
              userId: userID,
              FullName,
              email,
              phone,
              planType, // plan type either Free or premiume
              PlanExpireDate, // plan expiry date
              totalUsedMessage, // this to track sent messages
              planStatus, // either active or unactive
            },
          };
          return res
            .status(200)
            .send(ResponseHandler(200, userData, "successfull"));
        } else {
          return res.status(400).send(ResponseHandler(400, null, null));
        }
      }
    }
  );
});

/* UserPlanValidation - router */

router.get("/UserPlanValidation", verifyJWT, (req, res) => {
  console.log("req.user= ", req.user);
  CON.query(
    "SELECT * FROM userPlan  WHERE userId= ?",
    req.user,
    (err, user) => {
      if (err) return res.status(500).send(ResponseHandler(500, null, null));
      else {
        if (user.length > 0) {
          let PlanExpiryDate = user[0].PlanExpireDate;
          let status = user[0].planStatus;
          let totalUsedMessage = user[0].totalUsedMessage;
          let planType = user[0].planType;
          let today = moment(new Date()).format("YYYY-MM-DD");
          let planExDate = moment(PlanExpiryDate).format("YYYY-MM-DD");
          // check if expiry date is in the past which mean is expired
          //if true then it  expired
          let isExpiryInthePast = moment(planExDate).isBefore(today);
          let PlanStatus = status;
          let response;
          if (isExpiryInthePast) {
            response = { info: "Expired", code: 100, planType };
            return res
              .status(403)
              .send(ResponseHandler(403, response, "not valid"));
          } else if (PlanStatus !== "active") {
            response = { info: "Not active", code: 101, planType };
            return res
              .status(403)
              .send(ResponseHandler(403, response, "not valid"));
          } else if (planType === "Free" && totalUsedMessage >= 100) {
            response = { info: "Trial ended", code: 102, planType };
            return res
              .status(403)
              .send(ResponseHandler(403, response, "not valid"));
          } else {
            response = { info: "active", totalUsedMessage, planType };
            return res
              .status(200)
              .send(ResponseHandler(200, response, "valid"));
          }
        } else {
          return res.status(400).send(ResponseHandler(400, null, null));
        }
      }
    }
  );
});

/* validateUsedMessages - router  */
router.post("/validateUsedMessages", verifyJWT, (req, res) => {
  CON.query(
    "SELECT * FROM userPlan  WHERE userId= ?",
    req.user,
    (err, user) => {
      if (err) return res.status(500).send(ResponseHandler(500, null, null));
      else {
        if (user.length > 0) {
          let totalUsedMessage = user[0].totalUsedMessage;
          let planType = user[0].planType;

          let response;
          if (planType === "Free" && totalUsedMessage >= 100) {
            response = { planType };
            return res
              .status(403)
              .send(ResponseHandler(403, response, "not valid"));
          } else {
            response = { planType };
            return res
              .status(200)
              .send(ResponseHandler(200, response, "valid"));
          }
        } else {
          return res.status(400).send(ResponseHandler(400, null, null));
        }
      }
    }
  );
});

/* UpdateSentMessagesCount- router */

router.post("/UpdateSentMessagesCount", verifyJWT, (req, res) => {
  const { totalSent, userId } = req.body;
  let sqlCheck = `UPDATE userPlan SET totalUsedMessage=? WHERE userId =?`;
  CON.query(sqlCheck, [totalSent, userId], (err, result) => {
    if (err) {
      return res.status(500).send(ResponseHandler(500, null, null));
    } else {
      return res.status(200).send(ResponseHandler(200, {}, "successfull"));
    }
  });
});
/* forgot password */

router.post("/forgot-password", function (req, res) {
  const phone = req.body.phone;

  CON.query(
    "SELECT * FROM users WHERE phone = ?",
    [phone],
    async function (err, phoneCountResults) {
      if (err) {
        return res.status(500).send(ResponseHandler(500, null, null));
      } else {
        if (phoneCountResults.length !== 0) {
          const email = phoneCountResults[0].email;
          const token = crypto.randomBytes(20).toString("hex");
          const hashId = crypto.randomBytes(20).toString("hex");
          const expires = moment().add(1, "d").format();
          let saltRounds = 10;
          const hasedToken = await bcrypt.hash(token, saltRounds);
          CON.query(
            "INSERT INTO PasswordReset(hashId,email,token,expires) VALUES (?,?,?,?,?) ",
            [hashId, email, role, hasedToken, expires],
            async function (err, Results) {
              if (err) {
                return res.status(500).send(ResponseHandler(500, null, null));
              } else {
                if (Results.affectedRows === 1) {
                  const RELATIVE_TEMPLATE_PATH = "reset";
                  // get compiled template first
                  var data = {
                    url: `https://localhost/reset/${hashId}`,
                  };

                  jadeCompiler.compile(
                    RELATIVE_TEMPLATE_PATH,
                    data,
                    function (err, html) {
                      if (err) {
                        res.send({
                          auth: false,
                          message: "Unable to reset password",
                        });
                      }
                      mailer.sendMail(
                        "info@test.com",
                        email,
                        "Password Reset",
                        html,
                        function (err, success) {
                          if (err) {
                            res.send({
                              auth: false,
                              message: "Unable to reset password",
                            });
                          } else {
                            res.send({
                              auth: true,
                              message:
                                "Password reset insturction sent to your email",
                            });
                          }
                        }
                      );
                    }
                  );
                } else {
                  res.send({
                    auth: false,
                    message: "Unable to reset password",
                  });
                }
              }
            }
          );
        } else {
          res
            .status(404)
            .send(
              ResponseHandler(
                404,
                null,
                "No account associated with this phone number"
              )
            );
        }
      }
    }
  );
});

/* new-password - router */

router.post("/new-password", (req, res) => {
  const newPassword = req.body.password;
  const sentToken = req.body.token;
  if (newPassword !== null || newPassword !== "") {
    CON.query(
      "SELECT * FROM PasswordReset WHERE token = ? ",
      [sentToken],
      function (err, Results) {
        if (err) {
          res.send({ error: "server error 500" });
        } else {
          if (Results.length > 0) {
            var result = Results[0];
            var expires = Results[0].expires;
            var current = moment().format();
            let compare = moment(current).isBefore(expires);

            var email = Results[0].email;
            if (result !== 0) {
              let sql = `DELETE FROM PasswordReset WHERE email = ?`;
              CON.query(sql, email, (error, results) => {
                if (error) {
                  return res.send({ error: "server error 500" });
                }
              });
              if (compare == true) {
                var saltRounds = 10;

                bcrypt.hash(newPassword, saltRounds, function (err, myHash) {
                  CON.query(
                    "UPDATE `customers` SET password=? WHERE email =?",
                    [myHash, email],
                    function (err, insertResults) {
                      if (err) {
                        res.send({ error: "server error 500" });
                      } else {
                        res.send({
                          message: "Password has been reset",
                        });
                      }
                    }
                  );
                });
              } else {
                res.send({
                  error: "Reset request has been expired, request a new one.",
                });
              }
            } else {
              res.send({ error: "Invalid request, try again " });
            }
          } else {
            res.send({ error: "Invalid request, try again " });
          }
        }
      }
    );
  } else {
    res.send({ error: "Invalid request, try again 3" });
  }
});

/*
router.post('/adminDashboardLogin', function(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    const SECRETKEY =
        "A4EB236AF2E55FB02445460CE99D16E53C17E03606CD289A4DC0907B5D58B9D5";

    CON.query('SELECT * FROM users WHERE email = ?', [email], function(err, Results) {
        if (err) {
            res.send({
                message: 'Server internal error 500 !!'
            })
        } else {
            if (Results.length === 1) {

                if (Results[0].role == 'staff') {

                    let userPassword = Results[0].password;
                    let userID = Results[0].id;
                    let email = Results[0].email;
                    let name = Results[0].name;
                    let username = Results[0].username;
                    let phone = Results[0].phone;
                    let role = Results[0].staff_role;
                    bcrypt.compare(password, userPassword)
                        .then((result) => {
                            if (result) {
                                const token = jwt.sign({ userID: userID }, SECRETKEY, {
                                    expiresIn: '365d'
                                });
                                res.status(200).send({
                                    auth: true,
                                    token: token,
                                    user: {
                                        user_id: userID,
                                        email: email,
                                        name: name,
                                        phone: phone,
                                        username: username,
                                        role: 'staff',

                                    }
                                });
                            } else {
                                res.send({ auth: false, message: 'Password not matching' });
                            }
                        })


                }


            } else {
                res.send({
                    auth: false,
                    message: 'No account associated with that email'
                });
            }
        }
    })
})
*/

module.exports = router;
