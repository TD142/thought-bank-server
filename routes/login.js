const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../db/userModel");
const jwt = require("jsonwebtoken");

router.post("/", (request, response) => {
  console.log(request.body.password);
  User.findOne({ email: request.body.email })

    .then((user) => {
      bcrypt
        .compare(request.body.password, user.password)
        .then((passwordCheck) => {
          if (!passwordCheck) {
            return response.status(400).send({
              message: "Passwords does not match",
              error,
            });
          }
          const token = jwt.sign(
            {
              userId: user._id,
              userEmail: user.email,
            },
            "RANDOM-TOKEN",
            { expiresIn: "24h" }
          );
          response.status(200).send({
            message: "Login Successful",
            user: user.username,
            email: user.email,
            id: user._id,
            token,
          });
        })
        .catch((error) => {
          response.status(400).send({
            message: "Passwords does not match",
            error,
          });
        });
    })
    .catch((e) => {
      response.status(404).send({
        message: "Email not found",
        e,
      });
    });
});

module.exports = router;
