// function App() {
//   return (
//     <div>
//       <h1>Web Posts App</h1>
//     </div>
//   );
// }

// export default App;

// In App.jsx
import React from 'react';
import PostForm from './components/PostForm'; // <-- Correctly imported
import PostList from './components/PostList';

function App() {
  return (
    <div>
      <h1>Web Posts App</h1>
      <PostForm /> {/* <-- Correctly used */}
      <hr />
      <PostList />
    </div>
  );
}

export default App;