const express = require("express");
const mysql = require("mysql");
const pool = require("../database/connection");

const router = express.Router();

//get all of the item categories from database....
router.get("/api/categories", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      res.send(err.message);
    } else {
      const addCategory = "Select * from Category";

      connection.query(addCategory, (err, rows) => {
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

//get all items from MenuItmes......
router.get("/api/menuitems", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      return res.status(404).send({ message: err.message });
    }

    const addCategory = `select mItemID as itemID,itemCat,itemName,catName as itemCategory,unit_price as itemPrice
                          from MenuItems join Category on itemCat=catID;`;
    connection.query(addCategory, (err, rows) => {
      connection.release();
      if (err) {
        return res.status(404).send({ message: err.message });
      }
      return res.status(200).send({ data: rows });
    });
  });
});

//insert a new category in database....
router.post("/addcategory", (req, res) => {
  const { name } = req.body;

  pool.getConnection((err, connection) => {
    if (err) {
      res.send(err.message);
    } else {
      console.log("connected as id " + connection.threadId);
      const addCategory = "INSERT INTO ?? (??) VALUES (?)";
      const query = mysql.format(addCategory, ["Category", "catName", name]);

      connection.query(query, (err, rows) => {
        if (err) {
          res.send(err.message);
        } else {
          console.log("The data from users table are: \n", rows);

          connection.query(`select * from Category`, (err, data) => {
            connection.release(); // return the connection to pool
            if (err) {
              res.send(err.message);
            } else {
              console.log("The data from users table are: \n", data);
              res.send(data);
            }
          });
        }
      });
    }
  });
});

//insert new items in Menu....
router.post("/addmenuitems", (req, res) => {
  const itemCategoryID = parseInt(req.body.category);
  const itemName = req.body.name;
  const itemPrice = parseInt(req.body.price);

  pool.getConnection((err, connection) => {
    if (err) {
      res.send({ message: err.message });
    } else {
      console.log("connected as id " + connection.threadId);
      const addMenuItem = "INSERT INTO ?? (??,??,??) VALUES (?,?,?)";
      const query = mysql.format(addMenuItem, [
        "MenuItems",
        "itemCat",
        "itemName",
        "unit_price",
        itemCategoryID,
        itemName,
        itemPrice,
      ]);

      connection.query(query, (err, rows) => {
        if (err) {
          res.send({ message: err.message });
        } else {
          console.log("The data from MenuItems table are: \n", rows);

          connection.query(`select * from MenuItems`, (err, data) => {
            connection.release(); // return the connection to pool
            if (err) {
              res.send(err.message);
            } else {
              console.log("The data from users table are: \n", data);
              res.status(201).send({ data: data });
            }
          });
        }
      });
    }
  });
});

//delete items from the menu.....
router.get("/removeitem/:id", (req, res) => {
  
  const itemID = req.params.id;

  console.log(itemID)

  pool.getConnection((err, connection) => {
    if (err) {
      res.send({ message: err.message });
    } else {
      console.log("connected as id " + connection.threadId);
      const deleteMenuItem = "DELETE FROM ?? WHERE ?? = ?";
      const query = mysql.format(deleteMenuItem, [
        "MenuItems",
        "mItemID",
        itemID,
      ]);

      connection.query(query, (err, rows) => {
        connection.release()
        if (err) {
          res.send({ message: err.message });
        } else {
          res.status(201).send({ data: "Item deleted Successfull" });
        }
      });
    }
  });
});

module.exports = router;
