const nodemailer = require("nodemailer");
const env = require("dotenv");
env.config({ path: "./.env" });
// Its not a good idea to provide your credentials like this, they should come from an external source. This is only for the demo.
const stmpUser = process.env.STMPUSER;
const stmpPassword = process.env.STMPPASSWORD;

//reusable transport, look at the docs to see other service/protocol options

const smtpTransport = nodemailer.createTransport({
  // host: "smtp.xxxxx.com",
  service: "gmail",
  // logger: true,
  // debug: true,
  //secure: false,
  //port: 587,

  auth: {
    user: stmpUser,
    pass: stmpPassword,
  },
  tls: {
    rejectUnauthorized: false,
    minVersion: "TLSv1",
  },
});

// Public method that actually sends the email
exports.sendMail = function (fromAddress, toAddress, subject, content, next) {
  var success = true;
  var mailOptions = {
    // NOTE: the fromAdress can actually be different than the email address you're sending it from. Which is good and bad I suppose. Use it wisely.
    from: `Whatsapp Barg 👻" <akoma919@gmail.com>`,
    to: toAddress,
    replyTo: fromAddress,
    subject: subject,
    html: content,
  };

  // send the email!
  smtpTransport.sendMail(mailOptions, function (error, response) {
    if (error) {
      success = false;
    }

    next(error, success);
  });
};
