import { useState, useEffect } from "react";
import { createPost, updatePost } from "../api/posts.js";

function PostForm({ onPostCreated, postToEdit, onPostUpdated }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (postToEdit) {
      setTitle(postToEdit.title);
      setContent(postToEdit.content);
    } else {
      setTitle("");
      setContent("");
    }
  }, [postToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (postToEdit) {
        // Update existing post
        const updatedPost = await updatePost(postToEdit.id, { title, content });
        onPostUpdated(updatedPost);
      } else {
        // Create new post
        const newPost = await createPost({ title, content });
        onPostCreated(newPost);
        // Reset form
        setTitle("");
        setContent("");
      }
    } catch (error) {
      console.error("Failed to save post:", error);
    }
  };

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <h2>{postToEdit ? "Edit Post" : "Create a New Post"}</h2>
      <div>
        <input
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <textarea
          placeholder="Post Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <button type="submit">
        {postToEdit ? "Save Changes" : "Create Post"}
      </button>
    </form>
  );
}

export default PostForm;
