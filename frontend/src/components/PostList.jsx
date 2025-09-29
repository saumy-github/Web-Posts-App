import PostItem from "./PostItem.jsx";

function PostList({ posts, onPostDeleted, onEditClick }) {
  return (
    <div>
      <h2>All Posts</h2>
      {posts.length > 0 ? (
        posts.map((post) => (
          <PostItem
            key={post.id}
            post={post}
            onPostDeleted={onPostDeleted}
            onEditClick={onEditClick}
          />
        ))
      ) : (
        <p>No posts available</p>
      )}
    </div>
  );
}

export default PostList;
