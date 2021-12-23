const express = require("express");
const mysql = require("mysql");
const pool = require("../database/connection");
const crypto = require("crypto");

const router = express.Router();


//get all orders detail.....
router.get("/allorders", (req, res) => {
    pool.getConnection((err, connection) => {
      if (err) {
        return res.status(400).send({ data: err.message });
      }
  
      const getEmploy = "select * from Employ";
  
      connection.query(getEmploy, (err, data) => {
        connection.release();
        if (err) {
          return res.status(400).send({ data: err.message });
        }
        return res.status(201).send({ data: data });
      });
    });
  });

modoule.exports = router;
