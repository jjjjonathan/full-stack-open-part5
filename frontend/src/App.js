import React, { useState, useEffect, useRef } from 'react';
import Notification from './components/Notification';
import Blog from './components/Blog';
import Login from './components/Login';
import Create from './components/Create';
import Togglable from './components/Togglable';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [message, setMessage] = useState('');
  const [msgIsError, setMsgIsError] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const newBlogRef = useRef();

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

  const successMessage = (text) => {
    setMsgIsError(false);
    setMessage(text);
    setTimeout(() => {
      setMessage('');
    }, 3000);
  };

  const errorMessage = (text) => {
    setMsgIsError(true);
    setMessage(text);
    setTimeout(() => {
      setMessage('');
    }, 3000);
  };

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
      successMessage(`Successfully logged in as ${newUser.username}`);
    } catch (error) {
      console.log({ error });
      if (error.response.status === 401) {
        errorMessage('Invalid username or password');
      } else {
        errorMessage('Connection error');
      }
    }
  };

  const handleLogout = () => {
    successMessage(`Successfully logged out ${user.username}`);
    window.localStorage.removeItem('loggedInBlogListUser');
    setUser(null);
  };

  const handleCreateSubmit = async (event) => {
    event.preventDefault();

    try {
      newBlogRef.current.toggleVisibility();
      const response = await blogService.create({
        title,
        author,
        url,
      });

      setBlogs([...blogs, response]);

      setTitle('');
      setAuthor('');
      setUrl('');
      successMessage(`Successfully added ${response.title} to list!`);
    } catch (error) {
      console.log({ error });
      errorMessage('Error adding blog to list!');
    }
  };

  const mainPage = () => (
    <div>
      <h2>Blogs</h2>
      <Togglable buttonLabel="Add new" ref={newBlogRef}>
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
      </Togglable>
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
      <Notification message={message} isError={msgIsError} />
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
