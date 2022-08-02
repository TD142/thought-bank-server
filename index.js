const dbConnect = require("./db/dbConnect");
const User = require("./db/userModel");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const port = process.env.PORT || 8080;

const app = express();
app.use(cors());

app.post("/register", (request, response) => {});

app.listen(port, () => {
  console.log("Listening on 8080");
});

dbConnect();
