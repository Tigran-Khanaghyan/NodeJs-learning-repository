const express = require("express");
const { engine } = require("express-handlebars");
const mysql = require("mysql");
require("dotenv").config();
const routes = require("./server/routes/user.js");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.engine("hbs", engine({ extname: ".hbs" }));
app.set("view engine", "hbs");

const pool = mysql.createPool({
  connectionLimit: 100,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

pool.getConnection((err, connection) => {
  if (err) throw err;
  console.log(connection.threadId);
});

app.use("/", routes);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log("App is runing"));
