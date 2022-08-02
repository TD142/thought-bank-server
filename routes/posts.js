const express = require("express");
const router = express.Router();
const Post = require("../db/postModel");

router.post("/", async (req, res) => {
  console.log(req.body);
  const newPost = new Post(req.body);
  try {
    const SavedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
