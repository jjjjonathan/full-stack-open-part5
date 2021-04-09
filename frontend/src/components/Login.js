import React from 'react';

const Login = ({
  onLogin,
  username,
  onUsernameChange,
  password,
  onPasswordChange,
}) => {
  return (
    <form onSubmit={onLogin}>
      <div>
        <label htmlFor="username" style={{ marginRight: 5 }}>
          Username:
        </label>
        <input
          type="text"
          value={username}
          name="username"
          id="username"
          onChange={onUsernameChange}
        />
      </div>
      <div style={{ marginTop: 10 }}>
        <label htmlFor="password" style={{ marginRight: 5 }}>
          Password:
        </label>
        <input
          type="password"
          value={password}
          name="password"
          id="password"
          onChange={onPasswordChange}
        />
      </div>
      <button type="submit" style={{ marginTop: 10 }}>
        Login
      </button>
    </form>
  );
};

export default Login;
