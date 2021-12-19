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

//get all of the item categories....
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

//get all items from Menu......
router.get("/api/menuitems", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      return res.status(404).send({ message: err.message });
    }

    const addCategory = `select mItemID as itemID,itemCat,itemName,itemPhoto,catName as itemCategory,unit_price as itemPrice
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

//insert a new category of items....
router.post("/addcategory", (req, res) => {
  const { itemCategory } = req.body;
  console.log(itemCategory);
  pool.getConnection((err, connection) => {
    if (err) {
      res.send(err.message);
    } else {
      console.log("connected as id " + connection.threadId);
      const addCategory = "INSERT INTO ?? (??) VALUES (?)";
      const query = mysql.format(addCategory, [
        "Category",
        "catName",
        itemCategory,
      ]);

      connection.query(query, (err, rows) => {
        if (err) {
          res.send(err.message);
        } else {
          console.log("The data from users table are: \n", rows);

          res.status(201).send({ message: "Categroy Added" });
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

  const mItemID = crypto.randomBytes(16).toString("hex");

  pool.getConnection((err, connection) => {
    if (err) {
      res.send({ message: err.message });
    } else {
      console.log("connected as id " + connection.threadId);
      const addMenuItem = "INSERT INTO ?? (??,??,??,??) VALUES (?,?,?,?)";
      const query = mysql.format(addMenuItem, [
        "MenuItems",
        "mItemID",
        "itemCat",
        "itemName",
        "unit_price",
        mItemID,
        itemCategoryID,
        itemName,
        itemPrice,
      ]);

      connection.query(query, (err, rows) => {
        if (err) {
          res.send({ message: err.message });
        } else {
          console.log("The data from MenuItems table are: \n", rows);
          res.status(201).send({ itemID: mItemID });
        }
      });
    }
  });
});

//delete items from the menu.....
router.post("/removeitem/:id", (req, res) => {
  const itemID = req.params.id;
  const { itemPhoto } = req.body;

  console.log(itemID);
  console.log(itemPhoto);
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

      connection.query(query, async(err, rows) => {
        connection.release();
        if (err) {
          res.send({ message: err.message });
        } else {
          try {
            await unlinkAsync("./public"+itemPhoto)
            console.log("Image Deleted");
            return res
              .status(200)
              .send({ message: "Successfully! Image has been Deleted" });
          } catch (err) {
            // handle the error
            return res.status(400).send({ message: err.message });
          }

          //res.status(201).send({ data: "Item deleted Successfull" });
        }
      });
    }
  });
});

//edit the Item in Menu.....
router.post("/edititem", (req, res) => {
  console.log(req.body);
  const itemID = parseInt(req.body.itemID);
  const itemCategoryID = parseInt(req.body.category);
  const itemName = req.body.name;
  const itemPrice = parseInt(req.body.price);

  pool.getConnection((err, connection) => {
    if (err) {
      return res.send({ message: err.message });
    } else {
      const updateMenuItem =
        "UPDATE ?? SET ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?";
      const query = mysql.format(updateMenuItem, [
        "MenuItems",
        "itemCat",
        itemCategoryID,
        "itemName",
        itemName,
        "unit_price",
        itemPrice,
        "mItemID",
        itemID,
      ]);
      connection.query(query, (err, rows) => {
        connection.release();
        if (err) {
          return res.send({ message: err.message });
        } else {
          return res.status(200).send({ data: rows });
        }
      });
    }
  });
});

//image upload..................
const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function (req, file, cb) {
    cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
});

router.post("/upload/itemimage/:itemID", upload.single("image"), (req, res) => {
  console.log("inside upload");
  console.log(req.params.itemID);
  const mItemID = req.params.itemID;
  if (!req.file) {
    console.log("No file upload");
    res.send({ message: "err" });
  } else {
    pool.getConnection((err, connection) => {
      if (err) {
        return res.send({ message: err.message });
      }
      console.log(req.file.filename);

      const imgsrc = "/uploads/" + req.file.filename;
      console.log(imgsrc);

      const updateMenuItem = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
      const query = mysql.format(updateMenuItem, [
        "MenuItems",
        "itemPhoto",
        imgsrc,
        "mItemID",
        mItemID,
      ]);
      connection.query(query, (err, rows) => {
        connection.release();
        if (err) {
          return res.send({ message: err.message });
        } else {
          return res.status(200).send({ data: "Image Uploaded" });
        }
      });
    });
  }
});

module.exports = router;
