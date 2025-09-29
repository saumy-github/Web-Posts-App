function PostForm() {
return (
    <form>
    <h2>Create a New Post</h2>
    <div>
        <input type="text" placeholder="Post Title" />
    </div>
    <div>
        <textarea placeholder="Post Content" />
    </div>
    <button type="submit">Submit</button>
    </form>
);
}

export default PostForm;
