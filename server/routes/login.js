  const express = require("express");
const pool = require("../database/connection");
const mysql = require("mysql");

const router = express.Router();

router.post("/user/login", (req, res) => {
    console.log("inside")
  const { userName, password } = req.body;
  pool.getConnection((err, connection) => {
    if (err) {
      res.send(err.message);
    } else {
      const getCustomerDetail =
        "Select customerID,name,username,contact,address,employRole from ?? where ?? = ? and ?? = ?";
      const query = mysql.format(getCustomerDetail, [
        "Customer",
        "username",
        userName,
        "password",
        password,
      ]);
      connection.query(query, (err, rows) => {
        if (err) {
          console.log(err.message);
          res.status(404).send({ message: err.message });
        } else {
          if (rows.length !== 0) return res.status(200).send({ data: rows });
          const getAdminDetail =
            "Select adminID,name,username,employRole,contact,address from ?? where ?? = ? and ?? = ?";
          const query = mysql.format(getAdminDetail, [
            "Admin",
            "username",
            userName,
            "password",
            password,
          ]);
          connection.query(query, (err, rows) => {
            if (err) {
              console.log(err.message);
              res.status(404).send({ message: err.message });
            } else {
              if (rows.length !== 0)
                return res.status(200).send({ data: rows });
              const getEmployDetail =
                "Select employID,name,username,contact,address,employRole from ?? where ?? = ? and ?? = ?";
              const query = mysql.format(getEmployDetail, [
                "Employ",
                "username",
                userName,
                "password",
                password,
              ]);
              connection.query(query, (err, rows) => {
                connection.release()
                if (err) {
                  console.log(err.message);
                  res.status(404).send({ message: err.message });
                } else {
                  if (rows.length !== 0)
                    return res.status(200).send({ data: rows });

                  return res.status(404).send({ message: "user not found" });
                }
              });
            }
          });
        }
      });
    }
  });
});

module.exports = router;
