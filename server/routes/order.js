const express = require("express");
const mysql = require("mysql");
const pool = require("../database/connection");
const crypto = require("crypto");

const router = express.Router();


//place orders......
router.post("/placeorder", (req, res) => {
  const customerID = req.body.customerID;
  const totalPrice = req.body.totalPrice;
  const foodItems = req.body.foodItems;
  const orderID = crypto.randomBytes(16).toString("hex");
  const createdAt = new Date().toLocaleString();

  pool.getConnection((err, connection) => {
    if (err) {
      return res.status(400).send({ data: err.message });
    }
    const createOrder = "INSERT INTO ?? (??,??,??,??,??) VALUES (?,?,?,?,?)";
    const query = mysql.format(createOrder, [
      "Orders",
      "orderID",
      "customerID",
      "createAt",
      "status",
      "totalAmount",
      orderID,
      customerID,
      createdAt,
      "cooking",
      totalPrice,
    ]);

    connection.query(query, (err, rows) => {
      if (err) {
        return res.status(400).send({ data: err.message });
      }

      if (rows.length !== 0) {
        for (let i = 0; i < foodItems.length; i++) {
          const createOrder = "INSERT INTO ?? (??,??,??,??) VALUES (?,?,?,?)";
          const query = mysql.format(createOrder, [
            "FoodItem",
            "itemID",
            "orderID",
            "itemPrice",
            "itemQuantity",
            foodItems[i].itemID,
            orderID,
            foodItems[i].itemPrice,
            foodItems[i].itemQuantity,
          ]);
          connection.query(query, (err, rows) => {
            if (err) {
              return res.status(400).send({ data: err.message });
            }
          });
        }
        return res.status(201).send({ data: "order is placed" });
      }
      return res.status(400).send({ data: "order not placed" });
    });
  });
});


//get all previous orders history of customers......
router.get("/allorders", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      return res.status(400).send({ data: err.message });
    }

    const getEmploy = "select * from Orders";

    connection.query(getEmploy, (err, data) => {
      connection.release();
      if (err) {
        return res.status(400).send({ data: err.message });
      }
      return res.status(201).send({ data: data });
    });
  });
});

//get orders of specific customer....
router.get("/orders/:id", (req, res) => {
  console.log("inside")

  const customerID = req.params.id

  pool.getConnection((err, connection) => {
    if (err) {
      return res.status(400).send({ data: err.message });
    }

    const getOrder = `select * from Orders where ?? = ? `;
    const query = mysql.format(getOrder,["customerID",customerID])

    connection.query(query, (err, data) => {
      connection.release();
      if (err) {
        return res.status(400).send({ data: err.message });
      }
      return res.status(201).send({ data: data });
    });
  });
});

module.exports = router;
