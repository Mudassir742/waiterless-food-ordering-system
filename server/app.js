const express = require("express");
const cors = require("cors");

const itemData = require("./routes/itemData");
const customers = require("./routes/customer");

const app = express();

app.use(express.json());
app.use(express.static("./public"));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/data", itemData);
app.use("/data", customers);

app.listen(5000, () => console.log(`Server is up and running on port 5000!`));
