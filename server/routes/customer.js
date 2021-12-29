const express = require("express");
const pool = require("../database/connection");
const mysql = require("mysql");
const crypto = require("crypto");

const router = express.Router();

//get all of the customer from database......
router.get("/api/customers", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      res.send(err.message);
    } else {
      const getCustomer =
        "Select customerID, username,contact,address from Customer";

      connection.query(getCustomer, (err, rows) => {
        connection.release();
        if (err) {
          console.log(err.message);
          res.status(404).send({ message: err.message });
        } else {
          //console.log(rows);
          res.status(200).send({ data: rows });
        }
      });
    }
  });
});

//add a new customer..........
router.post("/newcustomer", (req, res) => {
  console.log(req.body);
  const { name, userName, password, contact, address } = req.body.user;
  const customerID = crypto.randomBytes(16).toString("hex");

  pool.getConnection((err, connection) => {
    if (err) {
      return res.status(400).send({ data: err.message });
    }

    let checkUsername = "Select username from ?? where ?? = ?";
    const query = mysql.format(checkUsername, [
      "Customer",
      "username",
      userName,
    ]);

    connection.query(query, (err, rows) => {
      if (err) {
        return res.status(400).send({ data: err.message });
      }

      if (rows.length !== 0) {
        return res.status(400).send({ data: "user Exists" });
      }

      connection.query(query, (err, rows) => {
        if (err) {
          return res.status(400).send({ data: err.message });
        }

        if (rows.length !== 0) {
          return res.status(400).send({ data: "user Exists" });
        }

        const query = mysql.format(checkUsername, [
          "Employ",
          "username",
          userName,
        ]);

        connection.query(query, (err, rows) => {
          if (err) {
            return res.status(400).send({ data: err.message });
          }

          if (rows.length !== 0) {
            return res.status(400).send({ data: "user Exists" });
          }

          const query = mysql.format(checkUsername, [
            "Admin",
            "username",
            userName,
          ]);

          connection.query(query, (err, rows) => {
            if (err) {
              return res.status(400).send({ data: err.message });
            }

            if (rows.length !== 0) {
              return res.status(400).send({ data: "user Exists" });
            }

            const addNewCustomer =
              "INSERT INTO ?? (??,??,??,??,??,??,??) VALUES (?,?,?,?,?,?,?)";
            const query = mysql.format(addNewCustomer, [
              "Customer",
              "customerID",
              "name",
              "username",
              "password",
              "contact",
              "address",
              "employRole",
              customerID,
              name,
              userName,
              password,
              contact,
              address,
              "customer"
            ]);

            connection.query(query, (err, data) => {
              connection.release();
              if (err) {
                return res.status(400).send({ data: err.message });
              }
              return res
                .status(201)
                .send({ data: customerID, message: "register" });
            });
          });
        });
      });
    });
  });
});

//update Customer profile........
router.post("/updatecustomer", (req, res) => {
  console.log(req.body);
  const { customerID, name, userName, contact, address } = req.body;

  pool.getConnection((err, connection) => {
    if (err) {
      return res.status(400).send({ data: err.message });
    }

    let checkUsername = "Select username from ?? where ?? = ?";
    const query = mysql.format(checkUsername, [
      "Customer",
      "username",
      userName,
    ]);

    connection.query(query, (err, rows) => {
      if (err) {
        return res.status(400).send({ data: err.message });
      }

      if (rows.length !== 0) {
        return res.status(400).send({ data: "user Exists" });
      }

      connection.query(query, (err, rows) => {
        if (err) {
          return res.status(400).send({ data: err.message });
        }

        if (rows.length !== 0) {
          return res.status(400).send({ message: "user Exists" });
        }

        const query = mysql.format(checkUsername, [
          "Employ",
          "username",
          userName,
        ]);

        connection.query(query, (err, rows) => {
          if (err) {
            return res.status(400).send({ data: err.message });
          }

          if (rows.length !== 0) {
            return res.status(400).send({ message: "user Exists" });
          }

          const query = mysql.format(checkUsername, [
            "Admin",
            "username",
            userName,
          ]);

          connection.query(query, (err, rows) => {
            if (err) {
              return res.status(400).send({ data: err.message });
            }

            if (rows.length !== 0) {
              return res.status(400).send({ message: "user Exists" });
            }

            const updateCustomer =
              "UPDATE ?? SET ?? = ?, ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?";
            const query = mysql.format(updateCustomer, [
              "Customer",
              "name",
              name,
              "username",
              userName,
              "contact",
              contact,
              "address",
              address,
              "customerID",
              customerID,
            ]);

            connection.query(query, (err, data) => {
              connection.release();
              if (err) {
                return res.status(400).send({ data: err.message });
              }
              return res
                .status(201)
                .send({ data: customerID, message: "updated" });
            });
          });
        });
      });
    });
  });
});

//delete customer....
router.post("/deletecustomer/:id", (req, res) => {
  const customerID = req.params.id;

  //console.log(itemPhoto);
  pool.getConnection((err, connection) => {
    if (err) {
      res.send({ message: err.message });
    } else {
      console.log("connected as id " + connection.threadId);
      const deleteCustomer = "DELETE FROM ?? WHERE ?? = ?";
      const query = mysql.format(deleteCustomer, [
        "Customer",
        "customerID",
        customerID,
      ]);

      connection.query(query, async (err, data) => {
        connection.release();
        if (err) {
          res.send({ message: err.message });
        } else {
          res.status(201).send({ data: "deleted" });
        }
      });
    }
  });
});

module.exports = router;
