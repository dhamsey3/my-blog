// application/backend/models/Post.js

const mongoose = require('mongoose');

// Define schema for Post
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create a model based on the schema
const Post = mongoose.model('Post', postSchema);

module.exports = Post;

