const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../db/userModel");
router.post("/", async (request, response) => {
  const userDetails = await User.findOne({ username: request.body.username });
  const userEmail = await User.findOne({ email: request.body.email });

  const errors = {};

  if (userDetails) {
    if (userDetails.username === request.body.username) {
      errors.userError = "User already exists";
    }
  }

  if (userEmail) {
    if (userEmail.email === request.body.email) {
      errors.emailError = "Email already exists";
    }
  }

  if (errors.userError || errors.emailError) {
    return response.status(409).send(errors);
  }

  bcrypt
    .hash(request.body.password, 10)
    .then((hashedPassword) => {
      const user = new User({
        username: request.body.username,
        email: request.body.email,
        password: hashedPassword,
      });

      user
        .save()
        .then((result) => {
          response.status(201).send({
            message: "User Created Successfully",
            result,
          });
        })
        .catch((error) => {
          response.status(500).send({
            message: "Error creating user",
            error,
          });
        });
    })
    .catch((e) => {
      response.status(500).send({
        message: "Password was not hashed successfully",
        e,
      });
    });
});

module.exports = router;
