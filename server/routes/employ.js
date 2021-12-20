const express = require("express");
const mysql = require("mysql");
const pool = require("../database/connection");
const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
const fs = require("fs");
const { promisify } = require("util");

const unlinkAsync = promisify(fs.unlink);

const router = express.Router();

//add a new employ..........
router.post("/newemploy", (req, res) => {
  console.log(req.body);
  const { name, userName, password, contact, address, role } = req.body;
  const employID = crypto.randomBytes(16).toString("hex");

  pool.getConnection((err, connection) => {
    if (err) {
      return res.status(400).send({ data: err.message });
    }

    const addNewEmploy =
      "INSERT INTO ?? (??,??,??,??,??,??,??) VALUES (?,?,?,?,?,?,?)";
    const query = mysql.format(addNewEmploy, [
      "Employ",
      "employID",
      "name",
      "username",
      "password",
      "contact",
      "address",
      "employRole",
      employID,
      name,
      userName,
      password,
      contact,
      address,
      role,
    ]);

    connection.query(query, (err, data) => {
      connection.release();
      if (err) {
        return res.status(400).send({ data: err.message });
      }
      return res.status(201).send({ data: data });
    });
  });
});

//get all of the employ data.......
router.get("/allemploy", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      return res.status(400).send({ data: err.message });
    }

    const getEmploy =
      "select name,username,contact,employRole,address from Employ";

    connection.query(getEmploy, (err, data) => {
      connection.release();
      if (err) {
        return res.status(400).send({ data: err.message });
      }
      return res.status(201).send({ data: data });
    });
  });
});

//delete an employ....
router.post("/deleteemploy/:id", (req, res) => {
  const employID = req.params.id;
  //const { itemPhoto } = req.body;

  //console.log(itemPhoto);
  pool.getConnection((err, connection) => {
    if (err) {
      res.send({ message: err.message });
    } else {
      console.log("connected as id " + connection.threadId);
      const deleteMenuItem = "DELETE FROM ?? WHERE ?? = ?";
      const query = mysql.format(deleteMenuItem, [
        "Employ",
        "employID",
        employID,
      ]);

      connection.query(query, (err, data) => {
        connection.release();
        if (err) {
          res.send({ message: err.message });
        } else {
          // try {
          //   await unlinkAsync("./public"+itemPhoto)
          //   console.log("Image Deleted");
          //   return res
          //     .status(200)
          //     .send({ message: "Successfully! Image has been Deleted" });
          // } catch (err) {
          //   // handle the error
          //   return res.status(400).send({ message: err.message });
          // }

          res.status(201).send({ data: "Item deleted Successfull" });
        }
      });
    }
  });
});

//update an employ........
router.post("/updateemploy", (req, res) => {
  console.log(req.body);
  const { employID, name, userName, password, contact, address, role } =
    req.body;

  pool.getConnection((err, connection) => {
    if (err) {
      return res.send({ data: err.message });
    } else {
      const updateMenuItem =
        "UPDATE ?? SET ?? = ?, ?? = ?, ?? = ?,?? = ?, ?? = ?, ?? = ? WHERE ?? = ?";
      const query = mysql.format(updateMenuItem, [
        "Employ",
        "name",
        name,
        "username",
        userName,
        "employRole",
        role,
        "password",
        password,
        "contact",
        contact,
        "address",
        address,
        "employID",
        employID,
      ]);
      connection.query(query, (err, rows) => {
        connection.release();
        if (err) {
          return res.send({ data: err.message });
        } else {
          return res.status(200).send({ data: rows });
        }
      });
    }
  });
});

module.exports = router;
