// application/backend/routes/posts.js

const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Route to fetch all posts
router.get('/', (req, res) => {
  Post.find()
    .then(posts => res.json(posts))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Route to create a new post
router.post('/', (req, res) => {
  const { title, content } = req.body;
  const newPost = new Post({ title, content });

  newPost.save()
    .then(() => res.json('Post added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
