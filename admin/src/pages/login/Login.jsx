import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./login.css";
import { login } from "../../redux/apiCalls";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
  };
  return (
    <div className="login">
      <h1>Login</h1>
      <form className="loginForm">
        <input
          type="text"
          placeholder="username"
          className="loginInput"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          className="loginInput"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="loginButton" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
