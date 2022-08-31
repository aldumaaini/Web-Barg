const mysql = require("mysql2");
const env = require("dotenv");
env.config({ path: "./.env" });

const CON = mysql.createPool({
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.DATABASENAME,
  host: process.env.DATABASEHOST,
  port: process.env.DBPORT,
});

module.exports = { CON };
