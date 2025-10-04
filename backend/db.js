const { Pool } = require("pg");

// Create a new Pool instance with configuration for Render deployment
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  options: "--search_path=web_posts_app_schema",
});

// Get all posts ordered by ID descending
const getAllPosts = async () => {
  const result = await pool.query("SELECT * FROM posts ORDER BY id DESC");
  return result;
};

// Create a new post
const createPost = async (title, content) => {
  const result = await pool.query(
    "INSERT INTO posts (title, content) VALUES ($1, $2) RETURNING *",
    [title, content]
  );
  return result;
};

// Update an existing post
const updatePost = async (id, title, content) => {
  const result = await pool.query(
    "UPDATE posts SET title = $1, content = $2 WHERE id = $3 RETURNING *",
    [title, content, id]
  );
  return result;
};

// Delete a post
const deletePost = async (id) => {
  const result = await pool.query(
    "DELETE FROM posts WHERE id = $1 RETURNING *",
    [id]
  );
  return result;
};

module.exports = {
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
};
