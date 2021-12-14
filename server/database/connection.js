const mysql = require("mysql")

const pool = mysql.createPool({
    host     : 'localhost',
    user     : 'coder',
    password : 'coder123',
    database : 'restaurant'
});

module.exports = pool