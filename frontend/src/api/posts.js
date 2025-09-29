// API URL for posts endpoint
const API_URL = "https://web-posts-app-hs5n.onrender.com/api/posts";

/**
 * Fetch all posts from the backend API
 * @returns {Promise<Array>} Array of post objects
 */
export const fetchPosts = async () => {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

/**
 * Create a new post via the backend API
 * @param {Object} postData - Object containing title and content
 * @returns {Promise<Object>} The created post object
 */
export const createPost = async (postData) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

/**
 * Delete a post via the backend API
 * @param {string} id - The ID of the post to delete
 * @returns {Promise<void>}
 */
export const deletePost = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
};

/**
 * Update a post via the backend API
 * @param {string} id - The ID of the post to update
 * @param {Object} updateData - Object containing title and content
 * @returns {Promise<Object>} The updated post object
 */
export const updatePost = async (id, updateData) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
};
