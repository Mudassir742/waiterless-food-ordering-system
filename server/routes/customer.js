const express = require("express");
const pool = require("../database/connection");

const router = express.Router();

//get all of the customer from database......
router.get("/api/customers",(req,res)=>{
    pool.getConnection((err, connection) => {
        if (err) {
          res.send(err.message);
        } else {
          const getCustomer = "Select username,contact,address from Customer;";
    
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
})


module.exports = router;