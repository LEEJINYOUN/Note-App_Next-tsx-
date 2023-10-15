require("dotenv").config();
const mysql = require("mysql2");

const db = mysql.createPool({
  connectionLimit: 10,
  host: process.env.NEXT_PUBLIC_DB_HOST,
  user: process.env.NEXT_PUBLIC_DB_USER,
  password: process.env.NEXT_PUBLIC_DB_PASSWORD,
  database: process.env.NEXT_PUBLIC_DB_DATABASE,
  dateStrings: "date",
});

module.exports = db;
