const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

// Retrieve all posts
router.get("/", (req, res) => {
  Post.find({}, (err, posts) => {
    if (err) {
      console.error("Error fetching posts:", err);
      res.status(500).send("Internal Server Error");
    } else {
      res.json(posts);
    }
  });
});

// Create a new post
router.post("/", (req, res) => {
  const { title, content } = req.body;

  const newPost = new Post({
    title,
    content
  });

  newPost.save()
    .then(post => res.json(post))
    .catch(err => {
      console.error("Error saving post:", err);
      res.status(500).send("Internal Server Error");
    });
});

module.exports = router;

