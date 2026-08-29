const mysql = require("mysql2/promise");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "562004",
  database: "retail_store",
  connectionLimit: 10,
});

module.exports = db;
