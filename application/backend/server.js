// jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");
const postsRoute = require("./routes/posts");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("application/frontend")); // Serve frontend files

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'application/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

mongoose.connect("mongodb://localhost:27017/blogDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => console.log("Connected to MongoDB"));

// Serve index.html for all frontend routes
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/application/frontend/index.html");
});
app.get("/about", (req, res) => {
  res.sendFile(__dirname + "/application/frontend/index.html");
});
app.get("/contact", (req, res) => {
  res.sendFile(__dirname + "/application/frontend/index.html");
});

// Serve compose.html for creating new posts
app.get("/compose", (req, res) => {
  res.sendFile(__dirname + "/application/frontend/compose.html");
});

// API endpoint for creating new posts
app.post("/api/posts", upload.single('image'), (req, res) => {
  const { title, content } = req.body;
  const imagePath = req.file ? req.file.path : null;

  const newPost = new Post({
    title: title,
    content: content,
    image: imagePath
  });

  newPost.save((err, post) => {
    if (err) return res.status(500).send(err);
    res.status(201).json(post);
  });
});

// API endpoint for fetching posts
app.use("/api/posts", postsRoute);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
