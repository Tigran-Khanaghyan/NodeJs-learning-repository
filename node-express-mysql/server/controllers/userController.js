const mysql = require("mysql");

const pool = mysql.createPool({
  connectionLimit: 100,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

exports.view = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log(connection.threadId);

    connection.query(
      "SELECT * FROM usersDb.`user-info`",
      (err, rows) => {
        connection.release();

        if (!err) {
          res.render("home", { rows });
        } else {
          console.log(err);
        }
        console.log(rows);
      }
    );
  });
};

exports.find = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log(connection.threadId);

    let searchTerm = req.body.search;

    connection.query(
      "SELECT * FROM usersDb.`user-info` WHERE first_name LIKE ? OR last_name LIKE ?",
      ["%" + searchTerm + "%", "%" + searchTerm + "%"],
      (err, rows) => {
        connection.release();

        if (!err) {
          res.render("home", { rows });
        } else {
          console.log(err);
        }
      }
    );
  });
};

exports.form = (req, res) => {
  res.render("add-user");
};

//add new user
exports.create = (req, res) => {
  const { first_name, last_name, email, phone, comments } = req.body;

  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log(connection.threadId);

    connection.query(
      "INSERT INTO usersDb. `user-info` SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ?",
      [first_name, last_name, email, phone, comments],
      (err, rows) => {
        connection.release();

        if (!err) {
          res.render("add-user");
        } else {
          console.log(err);
        }
      }
    );
  });
};

exports.edit = (req, res) => {
  res.render("edit-user");
}
