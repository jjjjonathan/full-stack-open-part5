import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Login from './components/Login';
import Create from './components/Create';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

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
      blogService.setToken(newUser.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const newUser = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem(
        'loggedInBlogListUser',
        JSON.stringify(newUser)
      );

      blogService.setToken(newUser.token);

      setUser(newUser);
      setUsername('');
      setPassword('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInBlogListUser');
    setUser(null);
  };

  const handleCreateSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await blogService.create({
        title,
        author,
        url,
      });

      setBlogs([...blogs, response]);

      setTitle('');
      setAuthor('');
      setUrl('');
    } catch (error) {
      console.error(error);
    }
  };

  const mainPage = () => (
    <div>
      <h2>Blogs</h2>
      <Create
        onSubmit={handleCreateSubmit}
        title={title}
        onTitleChange={(event) => {
          setTitle(event.target.value);
        }}
        author={author}
        onAuthorChange={(event) => {
          setAuthor(event.target.value);
        }}
        url={url}
        onUrlChange={(event) => {
          setUrl(event.target.value);
        }}
      />
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
          {mainPage()}
        </div>
      )}
    </div>
  );
};

export default App;
