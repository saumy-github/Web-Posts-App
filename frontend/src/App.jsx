// function App() {
//   return (
//     <div>
//       <h1>Web Posts App</h1>
//     </div>
//   );
// }

// export default App;

// In App.jsx
import React, { useState, useEffect } from "react";
import PostForm from "./components/PostForm.jsx";
import PostList from "./components/PostList.jsx";
import { fetchPosts } from "./api/posts.js";

function App() {
  const [posts, setPosts] = useState([]);
  const [postToEdit, setPostToEdit] = useState(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const fetchedPosts = await fetchPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    loadPosts();
  }, []);

  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const handlePostDeleted = (deletedPostId) => {
    setPosts(posts.filter((post) => post.id !== deletedPostId));
  };

  const handleEditClick = (post) => {
    setPostToEdit(post);
  };

  const handlePostUpdated = (updatedPost) => {
    setPosts(
      posts.map((post) => (post.id === updatedPost.id ? updatedPost : post))
    );
    setPostToEdit(null);
  };

  return (
    <div>
      <h1>Web Posts App</h1>
      <PostForm
        onPostCreated={handlePostCreated}
        postToEdit={postToEdit}
        onPostUpdated={handlePostUpdated}
      />
      <hr />
      <PostList
        posts={posts}
        onPostDeleted={handlePostDeleted}
        onEditClick={handleEditClick}
      />
    </div>
  );
}

export default App;
