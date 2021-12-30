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
              return res
                .status(201)
                .send({ data: employID, message: "register" });
            });
          });
        });
      });
    });
  });
});

//get all of the employ data.......
router.get("/allemploy", (req, res) => {
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

//delete an employ....
router.post("/deleteemploy/:id", (req, res) => {
  const employID = req.params.id;
  const { employPhoto } = req.body;

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

      connection.query(query, async (err, data) => {
        connection.release();
        if (err) {
          res.send({ message: err.message });
        } else {
          try {
            await unlinkAsync("./public" + employPhoto);
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

//update an employ........
router.post("/updateemploy", (req, res) => {
  console.log(req.body);
  const { employID, name, password, contact, address, role } =
    req.body;

  pool.getConnection((err, connection) => {
    if (err) {
      return res.status(400).send({ data: err.message });
    }

    const updateMenuItem =
              "UPDATE ?? SET ?? = ?, ?? = ?, ?? = ?,?? = ?, ?? = ? WHERE ?? = ?";
            const query = mysql.format(updateMenuItem, [
              "Employ",
              "name",
              name,
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

            connection.query(query, (err, data) => {
              connection.release();
              if (err) {
                return res.status(400).send({ data: err.message });
              }
              return res
                .status(201)
                .send({ data: employID, message: "updated" });
            });
          });
    
});

//image upload..................
const storage = multer.diskStorage({
  destination: "./public/users/",
  filename: function (req, file, cb) {
    cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
});

router.post(
  "/upload/employimage/:employID",
  upload.single("employImage"),
  (req, res) => {
    console.log("inside upload");
    console.log(req.params.employID);
    const employID = req.params.employID;
    if (!req.file) {
      console.log("No file upload");
      res.send({ message: "err" });
    } else {
      pool.getConnection((err, connection) => {
        if (err) {
          return res.send({ message: err.message });
        }
        console.log(req.file.filename);

        const imgsrc = "/users/" + req.file.filename;
        console.log(imgsrc);

        const updateMenuItem = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
        const query = mysql.format(updateMenuItem, [
          "Employ",
          "photo",
          imgsrc,
          "employID",
          employID,
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
  }
);

module.exports = router;
/////////////
