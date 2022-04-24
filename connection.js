const mysql = require("mysql2");
const connect = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Charlotte!21",
  database: "employee_database",
});

connect.connect(function (err) {
  if (err) throw err;
});

module.exports = connect;
