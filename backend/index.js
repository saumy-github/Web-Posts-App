require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { getAllPosts, createPost, updatePost, deletePost } = require("./db.js");

const app = express();
const PORT = process.env.PORT || 3000;

// Apply middleware
app.use(cors()); // Allows requests from all origins
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

// Get all posts
app.get("/api/posts", async (req, res) => {
  try {
    const result = await getAllPosts();
    return res.json(result.rows);
  } catch (err) {
    console.error("Error fetching posts:", err);
    return res.status(500).json({ error: "Failed to fetch posts" });
  }
});

// Create a new post
app.post("/api/posts", async (req, res) => {
  try {
    const { title, content } = req.body;
    const result = await createPost(title, content);
    return res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error creating post:", err);
    return res.status(500).json({ error: "Failed to create post" });
  }
});

// Update a post
app.put("/api/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const result = await updatePost(id, title, content);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Post not found" });
    }
    return res.json(result.rows[0]);
  } catch (err) {
    console.error("Error updating post:", err);
    return res.status(500).json({ error: "Failed to update post" });
  }
});

// Delete a post
app.delete("/api/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deletePost(id);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Post not found" });
    }
    return res.json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error("Error deleting post:", err);
    return res.status(500).json({ error: "Failed to delete post" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
