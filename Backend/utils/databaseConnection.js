const mysql = require("mysql2");
var pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "sqllegasypassword24",
  database: "booking_appointment_app",
});
module.exports = pool.promise();

// username phonenumber emails
