import React, { useState } from 'react';

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div style={{ border: '1px solid black', margin: 10, padding: 10 }}>
      <strong>{blog.title}</strong> by {blog.author}
      <button style={hideWhenVisible} onClick={toggleVisibility}>
        Show details
      </button>
      <div style={showWhenVisible}>
        <ul>
          <li>{blog.url}</li>
          <li>
            Likes: {blog.likes}
            <button>Like</button>
          </li>
        </ul>
        <button onClick={toggleVisibility}>Hide details</button>
      </div>
    </div>
  );
};

export default Blog;
