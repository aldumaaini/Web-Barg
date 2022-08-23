const express = require("express");
const jwt = require("jsonwebtoken");
const env = require("dotenv");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { CON } = require("../utlis/dbCon");
const { ResponseHandler } = require("../utlis/ResponseHandler");
const jadeCompiler = require("../lib/jadeCompiler");
const mailer = require("../lib/mailer");
const { verifyJWT } = require("../utlis/auth");
const shortid = require("shortid");
const moment = require("moment");
const router = express.Router();
env.config({ path: "./.env" });

const SECRETKEY = process.env.SECRETKEY || "";
const PAYMENT_KEY = process.env.PAYMENT_KEY || "";

router.get("/PaymentKeys", verifyJWT, (req, res) => {
  res.send({
    PayemntKey: PAYMENT_KEY,
  });
});

//register-new-account
router.post("/register-new-account", async function (req, res) {
  const { name, phone, password, email, ReferralCode } = req.body;
  const role = "user";
  const saltRounds = 10;
  const referral_code = shortid.generate();
  const referrer = ReferralCode;
  CON.query(
    "SELECT COUNT(*) AS PhoneCount FROM users WHERE phone=?",
    [phone],
    async function (err, results) {
      if (err) res.status(500).send(ResponseHandler(500, null, null));
      else {
        var phoneCount = results[0].PhoneCount;
        if (phoneCount === 1) {
          res
            .status(404)
            .send(
              ResponseHandler(404, null, "This phone number already registred")
            );
        } else {
          CON.query(
            "SELECT COUNT(*) AS EmailCount FROM users WHERE email=?",
            [email],
            async function (err, results) {
              if (err) res.status(500).send(ResponseHandler(500, null, null));
              else {
                var emailCount = results[0].EmailCount;
                if (emailCount === 1) {
                  res
                    .status(404)
                    .send(
                      ResponseHandler(
                        404,
                        null,
                        "This Email address already registred"
                      )
                    );
                } else {
                  bcrypt.hash(
                    password,
                    saltRounds,
                    function (err, hashedPassword) {
                      if (err)
                        res.status(500).send(ResponseHandler(500, null, null));
                      else {
                        CON.query(
                          "INSERT INTO users( FullName,role,email, password,phone,code, referrer)VALUES(?,?,?,?,?,?,?)",
                          [
                            name,
                            role,
                            email,
                            hashedPassword,
                            phone,
                            referral_code,
                            referrer,
                          ],
                          function (err, results) {
                            if (err)
                              res
                                .status(500)
                                .send(ResponseHandler(500, null, null));
                            else {
                              if (results.affectedRows > 0) {
                                let userId = results.insertId;
                                let ExpireDate = moment()
                                  .add(7, "days")
                                  .format("YYYY-MM-DD");

                                let memeberShipNumber = `6565${Math.floor(
                                  100000 + Math.random() * 900000000000
                                )}`;

                                CON.query(
                                  "INSERT INTO userPlan( userId,planType,PlanExpireDate, planStatus,totalUsedMessage,memeberShipNumber)VALUES(?,?,?,?,?,?)",
                                  [
                                    userId,
                                    "Free",
                                    ExpireDate,
                                    "active",
                                    0,
                                    memeberShipNumber,
                                  ],
                                  function (err, results) {
                                    if (err)
                                      res
                                        .status(500)
                                        .send(ResponseHandler(500, null, null));
                                    else {
                                      CON.query(
                                        "INSERT INTO usersReferrals( userReferredToId,userRefferedFromCode)VALUES(?,?)",
                                        [userId, referrer]
                                      );
                                      res
                                        .status(200)
                                        .send(
                                          ResponseHandler(
                                            200,
                                            null,
                                            "successfull"
                                          )
                                        );
                                    }
                                  }
                                );
                              }
                            }
                          }
                        );
                      }
                    }
                  );
                }
              }
            }
          );
        }
      }
    }
  );
});

router.get("/coupons-admin", verifyJWT, async function (req, res) {
  // const { id } = req.body;

  CON.query("SELECT * FROM Coupons", function (err, results) {
    if (err) res.status(500).send(ResponseHandler(500, null, null));
    else {
      res.status(200).send(ResponseHandler(200, results, "successfull"));
    }
  });
});

//dd-new-coupons-admin
router.post("/add-new-coupons-admin", verifyJWT, async function (req, res) {
  const { name, description, numofuse, expire, type, percentage, fixedamount } =
    req.body;

  CON.query(
    "INSERT INTO Coupons( name,description,numOfUse, expire,type,percentage, fixedAmount)VALUES(?,?,?,?,?,?,?)",
    [name, description, numofuse, expire, type, percentage, fixedamount],
    function (err, results) {
      if (err) res.status(500).send(ResponseHandler(500, null, null));
      else {
        if (results.affectedRows > 0) {
          let data = {
            description: description,
            expire: expire,
            fixedAmount: fixedamount,
            id: results.insertId,
            name: name,
            numOfUse: numofuse,
            percentage: percentage,
            type: type,
          };
          res.status(200).send(ResponseHandler(200, data, "successfull"));
        }
      }
    }
  );
});

//delete-coupone-admin
router.delete("/delete-coupons-admin", verifyJWT, async function (req, res) {
  const { id } = req.query;

  CON.query("DELETE FROM Coupons WHERE id=?", [id], function (err, results) {
    if (err) res.status(500).send(ResponseHandler(500, null, null));
    else {
      res.status(200).send(ResponseHandler(200, id, "successfull"));
    }
  });
});

// get-users admin

router.get("/users-admin", verifyJWT, async function (req, res) {
  // const { id } = req.body;

  CON.query(
    "SELECT u.id AS userID,u.email,u.role,u.isPhoneVerified,u.code, u.FullName,u.phone,u.referrer,up.planType,up.PlanExpireDate,up.planStatus,up.totalUsedMessage FROM users u INNER JOIN userPlan up ON u.id = up.userId WHERE u.role=? ",
    "user",
    function (err, results) {
      if (err) res.status(500).send(ResponseHandler(500, null, null));
      else {
        res.status(200).send(ResponseHandler(200, results, "successfull"));
      }
    }
  );
});

//add-new-user-admin
router.post("/add-new-user-admin", verifyJWT, async function (req, res) {
  const { name, phone, password, email } = req.body;

  const role = "user";
  const saltRounds = 10;
  const referral_code = shortid.generate();
  CON.query(
    "SELECT COUNT(*) AS PhoneCount FROM users WHERE phone=?",
    [phone],
    async function (err, results) {
      if (err) res.status(500).send(ResponseHandler(500, null, null));
      else {
        var phoneCount = results[0].PhoneCount;
        if (phoneCount === 1) {
          res
            .status(404)
            .send(
              ResponseHandler(404, null, "This phone number already registred")
            );
        } else {
          CON.query(
            "SELECT COUNT(*) AS EmailCount FROM users WHERE email=?",
            [email],
            async function (err, results) {
              if (err) res.status(500).send(ResponseHandler(500, null, null));
              else {
                var emailCount = results[0].EmailCount;
                if (emailCount === 1) {
                  res
                    .status(404)
                    .send(
                      ResponseHandler(
                        404,
                        null,
                        "This Email address already registred"
                      )
                    );
                } else {
                  bcrypt.hash(
                    password,
                    saltRounds,
                    function (err, hashedPassword) {
                      if (err)
                        res.status(500).send(ResponseHandler(500, null, null));
                      else {
                        CON.query(
                          "INSERT INTO users( FullName,role,email, password,phone,code)VALUES(?,?,?,?,?,?)",
                          [
                            name,
                            role,
                            email,
                            hashedPassword,
                            phone,
                            referral_code,
                          ],
                          function (err, results) {
                            if (err)
                              res
                                .status(500)
                                .send(ResponseHandler(500, null, null));
                            else {
                              if (results.affectedRows > 0) {
                                let userId = results.insertId;
                                let ExpireDate = moment()
                                  .add(7, "days")
                                  .format("YYYY-MM-DD");

                                let memeberShipNumber = `6565${Math.floor(
                                  100000 + Math.random() * 900000000000
                                )}`;
                                CON.query(
                                  "INSERT INTO userPlan( userId,planType,PlanExpireDate, planStatus,totalUsedMessage, memeberShipNumber)VALUES(?,?,?,?,?,?)",
                                  [
                                    userId,
                                    "Free",
                                    ExpireDate,
                                    "active",
                                    0,
                                    memeberShipNumber,
                                  ],
                                  function (err, results) {
                                    if (err)
                                      res
                                        .status(500)
                                        .send(ResponseHandler(500, null, null));
                                    else
                                      res
                                        .status(200)
                                        .send(
                                          ResponseHandler(
                                            200,
                                            null,
                                            "successfull"
                                          )
                                        );
                                  }
                                );
                              }
                            }
                          }
                        );
                      }
                    }
                  );
                }
              }
            }
          );
        }
      }
    }
  );
});
//update-user-admin
router.put("/update-user-admin", verifyJWT, async function (req, res) {
  const {
    id,
    fullname,
    email,
    phone,
    isPhoneVerified,
    planType,
    PlanExpireDate,
    planStatus,
  } = req.body;

  CON.query(
    "UPDATE users SET FullName=? , email=?, phone=?, isPhoneVerified=? WHERE id=?",
    [fullname, email, phone, isPhoneVerified, id],
    function (err, results) {
      if (err) res.status(500).send(ResponseHandler(500, null, null));
      else {
        CON.query(
          "UPDATE userPlan SET planType=? , PlanExpireDate=?, planStatus=? WHERE userId=?",
          [planType, PlanExpireDate, planStatus, id]
        );
        res.status(200).send(ResponseHandler(200, null, "successfull"));
      }
    }
  );
});
//delete-user-admin
router.delete("/delete-user-admin", verifyJWT, async function (req, res) {
  const { id } = req.query;

  CON.query("DELETE FROM users WHERE id=?", [id], function (err, results) {
    if (err) res.status(500).send(ResponseHandler(500, null, null));
    else {
      res.status(200).send(ResponseHandler(200, id, "successfull"));
    }
  });
});

router.post("/callbackTap", function (req, res) {
  console.log("callback taps req post: ", req);
});

router.get("/fetch-user-transactions", verifyJWT, function (req, res) {
  let id = req.user;
  CON.query(
    "SELECT * FROM transactions WHERE cus_unique_id = ?",
    [id],
    async function (err, Results) {
      if (err) {
        res.status(500).send(ResponseHandler(500, null, null));
      } else {
        return res
          .status(200)
          .send(ResponseHandler(200, Results, "successfull"));
      }
    }
  );
});

router.get("/fetch-admin-transactions", verifyJWT, function (req, res) {
  let id = req.user;
  CON.query("SELECT * FROM transactions", async function (err, Results) {
    if (err) {
      res.status(500).send(ResponseHandler(500, null, null));
    } else {
      return res.status(200).send(ResponseHandler(200, Results, "successfull"));
    }
  });
});

router.post("/user-membership-subscription", verifyJWT, function (req, res) {
  const {
    transactions_id,
    status,
    amount,
    currency,
    receipt_id,
    cue_id,
    cus_email,
    cus_unique_id,
    method,
    cardLast4,
  } = req.body;
  CON.query(
    "INSERT INTO transactions (transactions_id,status,amount,currency,receipt_id,cus_id,cus_email,cus_unique_id ,method,cardLast4) VALUES (?,?,?,?,?,?,?,?,?,?)",
    [
      transactions_id,
      status,
      amount,
      currency,
      receipt_id,
      cue_id,
      cus_email,
      cus_unique_id,
      method,
      cardLast4,
    ],
    async function (err, Results) {
      if (err) {
        return res.status(500).send(ResponseHandler(500, null, null));
      } else {
        if (Results.affectedRows > 0) {
          var startdate = moment();
          startdate = startdate.add(1, "month");
          let oneMonthAhead = startdate.format("YYYY-MM-DD");
          let sqlCheck = `UPDATE userPlan SET planType=?, PlanExpireDate=? WHERE userId =?`;
          CON.query(
            sqlCheck,
            ["Paid", oneMonthAhead, cus_unique_id],
            (err, result) => {
              if (err) {
                return res.status(500).send(ResponseHandler(500, null, null));
              } else {
                return res
                  .status(200)
                  .send(ResponseHandler(200, "ok", "successfull"));
              }
            }
          );
        } else {
          return res.status(500).send(ResponseHandler(500, null, null));
        }
      }
    }
  );
});

/* LOGIN - router */
router.post("/login", function (req, res) {
  const { mobile, password } = req.body;
  CON.query(
    "SELECT u.id AS userID, u.password,u.email,u.isPhoneVerified,u.code, u.role, u.FullName,u.phone,up.planType,up.PlanExpireDate,up.planStatus,up.totalUsedMessage,up.memeberShipNumber FROM users u INNER JOIN userPlan up ON u.id = up.userId WHERE u.phone = ?",
    [mobile],
    async function (err, Results) {
      if (err) {
        res.status(500).send(ResponseHandler(500, null, null));
      } else {
        if (Results.length === 1) {
          let userPassword = Results[0].password;
          let userID = Results[0].userID;
          let email = Results[0].email;
          let FullName = Results[0].FullName;
          let phone = Results[0].phone;
          let planType = Results[0].planType;
          let code = Results[0].code;
          let role = Results[0].role;
          let PlanExpireDate = Results[0].PlanExpireDate;
          let totalUsedMessage = Results[0].totalUsedMessage;
          let planStatus = Results[0].planStatus;
          let isPhoneVerified = Results[0].isPhoneVerified;
          let memeberShipNumber = Results[0].memeberShipNumber;
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
                isPhoneVerified,
                code,
                role,
                phone,
                planType, // plan type either Free or premiume
                PlanExpireDate, // plan expiry date
                totalUsedMessage, // this to track sent messages
                planStatus, // either active or unactive
                memeberShipNumber,
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
    "SELECT u.id AS userID,u.role, u.password,u.email,u.isPhoneVerified,u.code, u.FullName,u.phone,up.planType,up.PlanExpireDate,up.planStatus,up.totalUsedMessage, up.memeberShipNumber FROM users u INNER JOIN userPlan up ON u.id = up.userId WHERE u.id = ?",
    req.user,
    (err, user) => {
      if (err) return res.status(500).send(ResponseHandler(500, null, null));
      else {
        if (user.length > 0) {
          let userID = user[0].userID;
          let email = user[0].email;
          let FullName = user[0].FullName;
          let phone = user[0].phone;
          let role = user[0].role;
          let isPhoneVerified = user[0].isPhoneVerified;
          let code = user[0].code;
          let planType = user[0].planType;
          let PlanExpireDate = user[0].PlanExpireDate;
          let totalUsedMessage = user[0].totalUsedMessage;
          let planStatus = user[0].planStatus;
          let memeberShipNumber = user[0].memeberShipNumber;
          let userData = {
            token: token,
            user: {
              userId: userID,
              FullName,
              isPhoneVerified,
              code,
              email,
              phone,
              role,
              planType, // plan type either Free or premiume
              PlanExpireDate, // plan expiry date
              totalUsedMessage, // this to track sent messages
              planStatus, // either active or unactive
              memeberShipNumber,
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
//eidit email
router.post("/edit-email", verifyJWT, async function (req, res) {
  const { id, email } = req.body;

  CON.query(
    "UPDATE users SET email=? WHERE id =?",
    [email, id],
    function (err, results) {
      if (err) res.status(500).send(ResponseHandler(500, null, null));
      else {
        res
          .status(200)
          .send(ResponseHandler(200, null, "Email updated successfully"));
      }
    }
  );
});

//edit password

router.post("/edit-password", verifyJWT, (req, res) => {
  const { id, newPassword, oldPassword } = req.body;

  CON.query("SELECT * FROM users WHERE id=? ", [id], function (err, Results) {
    if (err) res.status(500).send(ResponseHandler(500, null, null));
    else {
      let curpass = Results[0].password;
      bcrypt.compare(oldPassword, curpass).then((result) => {
        if (result === false) {
          res
            .status(401)
            .send(ResponseHandler(401, null, "Old password not matching"));
        } else {
          var saltRounds = 10;
          bcrypt.hash(newPassword, saltRounds, function (err, HashedPassword) {
            CON.query(
              "UPDATE users SET password=? WHERE id=? ",
              [HashedPassword, id],
              function (err, Results) {
                if (err) res.status(500).send(ResponseHandler(500, null, null));
                else {
                  res
                    .status(200)
                    .send(
                      ResponseHandler(
                        200,
                        null,
                        "Password updated successfully"
                      )
                    );
                }
              }
            );
          });
        }
      });
    }
  });
});

//phone-verify
router.post("/verify-phone", verifyJWT, async function (req, res) {
  const { id } = req.body;

  CON.query(
    "UPDATE users SET isPhoneVerified=? WHERE id =?",
    [1, id],
    function (err, results) {
      if (err) res.status(500).send(ResponseHandler(500, null, null));
      else {
        res.status(200).send(ResponseHandler(200, null, "successfull"));
      }
    }
  );
});
/* UserPlanValidation - router */

router.get("/UserPlanValidation", verifyJWT, (req, res) => {
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

          if (planType === "Free") {
            if (isExpiryInthePast) {
              response = {
                info: "Expired",
                code: 100,
                planType,
                PlanExpiryDate,
                totalUsedMessage,
                status,
              };
              return res
                .status(403)
                .send(ResponseHandler(403, response, "not valid"));
            } else if (PlanStatus !== "active") {
              response = {
                info: "Not active",
                code: 101,
                planType,
                PlanExpiryDate,
                totalUsedMessage,
                status,
              };
              return res
                .status(403)
                .send(ResponseHandler(403, response, "not valid"));
            } else if (totalUsedMessage >= 100) {
              response = {
                info: "Trial ended",
                code: 102,
                planType,
                PlanExpiryDate,
                totalUsedMessage,
                status,
              };
              return res
                .status(403)
                .send(ResponseHandler(403, response, "not valid"));
            } else {
              response = {
                info: "active",
                totalUsedMessage,
                planType,
                PlanExpiryDate,
                totalUsedMessage,
                status,
              };
              return res
                .status(200)
                .send(ResponseHandler(200, response, "valid"));
            }
          } else {
            if (isExpiryInthePast) {
              response = {
                info: "Expired",
                code: 100,
                planType,
                PlanExpiryDate,
                totalUsedMessage,
                status,
              };
              return res
                .status(403)
                .send(ResponseHandler(403, response, "not valid"));
            } else if (PlanStatus !== "active") {
              response = {
                info: "Not active",
                code: 101,
                planType,
                PlanExpiryDate,
                totalUsedMessage,
                status,
              };
              return res
                .status(403)
                .send(ResponseHandler(403, response, "not valid"));
            } else {
              response = {
                info: "active",
                totalUsedMessage,
                planType,
                PlanExpiryDate,
                totalUsedMessage,
                status,
              };
              return res
                .status(200)
                .send(ResponseHandler(200, response, "valid"));
            }
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

router.post("/password-reset", function (req, res) {
  const email = req.body.email;
  const phone = req.body.phone;

  CON.query(
    "SELECT email FROM users WHERE phone = ? OR email=?",
    [phone, email],
    async function (err, phoneCountResults) {
      if (err) {
        return res.status(500).send(ResponseHandler(500, null, null));
      } else {
        if (phoneCountResults.length !== 0) {
          const emailAddess = phoneCountResults[0].email;

          const token = crypto.randomBytes(20).toString("hex");
          const hashId = crypto.randomBytes(20).toString("hex");
          const expires = moment().add(1, "d").format();
          let saltRounds = 10;
          const hasedToken = await bcrypt.hash(token, saltRounds);
          CON.query(
            "INSERT INTO PasswordReset(hashId,email,token,expires) VALUES (?,?,?,?) ",
            [hashId, emailAddess, hasedToken, expires],
            async function (err, Results) {
              if (err) {
                return res.status(500).send(ResponseHandler(500, null, null));
              } else {
                if (Results.affectedRows === 1) {
                  const RELATIVE_TEMPLATE_PATH = "reset";
                  // get compiled template first
                  var data = {
                    url: `https://localhost/change-password/${hashId}`,
                  };

                  jadeCompiler.compile(
                    RELATIVE_TEMPLATE_PATH,
                    data,
                    function (err, html) {
                      mailer.sendMail(
                        "akoma919@gmail.com",
                        emailAddess,
                        "Password Reset",
                        html,
                        function (err, success) {
                          if (err) {
                            res
                              .status(503)
                              .send(
                                ResponseHandler(
                                  503,
                                  "Unable to reset password",
                                  "Unable to reset password"
                                )
                              );
                          } else {
                            return res
                              .status(200)
                              .send(
                                ResponseHandler(
                                  200,
                                  "Password reset insturction sent to your email",
                                  "success"
                                )
                              );
                          }
                        }
                      );
                    }
                  );
                } else {
                  res
                    .status(503)
                    .send(
                      ResponseHandler(
                        503,
                        "Unable to reset password",
                        "Unable to reset password"
                      )
                    );
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
                "No account associated with this email / phone number"
              )
            );
        }
      }
    }
  );
});

/* new-password - router */

router.post("/new-password", (req, res) => {
  const newPassword = req.body.newPassword;
  const sentToken = req.body.token;

  CON.query(
    "SELECT * FROM PasswordReset WHERE hashId = ? ",
    [sentToken],
    function (err, Results) {
      if (err) {
        return res.status(500).send(ResponseHandler(500, null, null));
      } else {
        if (Results.length > 0) {
          var expires = Results[0].expires;
          var current = moment().format();
          let compare = moment(current).isBefore(expires);

          var email = Results[0].email;

          let sql = `DELETE FROM PasswordReset WHERE email = ?`;
          CON.query(sql, email, (error, results) => {
            if (error) {
              return res.status(500).send(ResponseHandler(500, null, null));
            }
          });
          if (compare == true) {
            var saltRounds = 10;

            bcrypt.hash(newPassword, saltRounds, function (err, myHash) {
              CON.query(
                "UPDATE `users` SET password=? WHERE email =?",
                [myHash, email],
                function (err, insertResults) {
                  if (err) {
                    return res
                      .status(500)
                      .send(ResponseHandler(500, null, null));
                  } else {
                    return res
                      .status(200)
                      .send(
                        ResponseHandler(
                          200,
                          "Password reset successfully",
                          "success"
                        )
                      );
                  }
                }
              );
            });
          } else {
            return res
              .status(403)
              .send(
                ResponseHandler(
                  403,
                  "Reset request has been expired, request a new one.",
                  "not valid"
                )
              );
          }
        } else {
          return res
            .status(403)
            .send(
              ResponseHandler(403, "Invalid request, try again", "not valid")
            );
        }
      }
    }
  );
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
