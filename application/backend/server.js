// jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const postsRoute = require("./routes/posts");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("application/frontend")); // Serve frontend files

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
app.get("/compose", (req, res) => {
  res.sendFile(__dirname + "/application/frontend/index.html");
});

app.use("/api/posts", postsRoute);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
