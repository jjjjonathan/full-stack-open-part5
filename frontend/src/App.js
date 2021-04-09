import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Login from './components/Login';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const handleLogin = async (event) => {
    event.preventDefault();

    console.log('Logging in with', username, password);

    try {
      const newUser = await loginService.login({
        username,
        password,
      });
      setUser(newUser);
      setUsername('');
      setPassword('');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  return (
    <div>
      <Login
        onLogin={handleLogin}
        username={username}
        onUsernameChange={(event) => {
          setUsername(event.target.value);
        }}
        password={password}
        onPasswordChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
