const mysql = require('mysql2');
const env = require('dotenv');
env.config({ path: './.env' });
console.log(process.env.DBUSER,process.env.DBPASSWORD,process.env.DATABASENAME, process.env.DATABASEHOST,process.env.DBPORT)
const CON = mysql.createPool({
    
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DATABASENAME,
    host: process.env.DATABASEHOST,
    port: process.env.DBPORT
});


module.exports = { CON }