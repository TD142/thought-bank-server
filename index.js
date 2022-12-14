const dbConnect = require("./db/dbConnect");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const registerRoutes = require("./routes/register");
const loginRoutes = require("./routes/login");
const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");
const multer = require("multer");
const bp = require("body-parser");
const auth = require("./db/auth");

const port = process.env.PORT || 8080;
const app = express();
app.use(cors());
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use("/register", registerRoutes);
app.use("/login", loginRoutes);
app.use("/posts", postsRoutes);
app.use("/user", userRoutes);
app.use("/public", express.static("./public"));

dbConnect();

// app.get("/free-endpoint", (request, response) => {
//   response.json({ message: "You are free to access me anytime" });
// });

// app.get("/auth-endpoint", auth, (request, response) => {
//   response.json({ message: "You are authorized to access me" });
// });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

app.listen(port, () => {
  console.log("Listening on 8080");
});

module.exports = app;
