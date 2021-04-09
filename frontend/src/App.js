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

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem(
      'loggedInBlogListUser'
    );
    if (loggedInUserJSON) {
      const newUser = JSON.parse(loggedInUserJSON);
      setUser(newUser);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    console.log('Logging in with', username, password);

    try {
      const newUser = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem(
        'loggedInBlogListUser',
        JSON.stringify(newUser)
      );

      setUser(newUser);
      setUsername('');
      setPassword('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('LoggedInBlogListUser');
    setUser(null);
  };

  const blogList = () => (
    <div>
      <h2>Blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );

  const loginForm = () => (
    <div>
      <h2>Login</h2>
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
    </div>
  );

  return (
    <div>
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>Logged in as {user.name}</p>
          <button onClick={handleLogout}>Logout</button>
          {blogList()}
        </div>
      )}
    </div>
  );
};

export default App;
