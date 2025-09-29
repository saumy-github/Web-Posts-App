import { deletePost } from "../api/posts.js";

function PostItem({ post, onPostDeleted, onEditClick }) {
  const handleDelete = async () => {
    try {
      await deletePost(post.id);
      onPostDeleted(post.id);
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  const handleEdit = () => {
    onEditClick(post);
  };

  return (
    <div>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default PostItem;
