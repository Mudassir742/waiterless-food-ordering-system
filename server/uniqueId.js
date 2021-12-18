const crypto = require("crypto");

const id = crypto.randomBytes(16).toString("hex");

console.log(id);