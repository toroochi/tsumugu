import React, { useState, useEffect } from 'react';
import './App.css';
import './style.css';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword
} from "firebase/auth";
import { auth } from "./FirebaseConfig.js";
import { Route, Routes, Navigate, Link } from "react-router-dom";

import Main from "./Main"
import User from './User';

function App() {
  return (
    <Routes>
    <Route path={`/register`} element={<LoginForm />} />
    <Route path={`/`} element={<Main />} />
    <Route path={`/user`} element={<User />} />
    <Route path={`/register_new`} element={<RegisterForm />} />
  </Routes>
  );
}

function LoginForm() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
    } catch(error) {
      alert("メールアドレスまたはパスワードが間違っています");
    }
  };

  const [user, setUser] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  });

  return (
    user ? (
      <Navigate to={`/`} />
    ) : (
    <body>
      <h1>
        <p>　みんなと、小説を紡ぐ</p>
        <span>Re:Tale</span> 
      </h1>
      <div className="right">
        <div class="content">
          <form class="login-form" onSubmit={handleSubmit}>
            <div class="text">Re:Tale Login</div>
            <div class="field">
              <span class="fas fa-user"></span>
              <input 
                type="email"
                name='email'
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              ></input>
              <label>Email</label>
            </div>
            <p></p>
            <div class="field">
              <span class="fas fa-lock"></span>
              <input 
                type="password"
                name='password'
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              ></input>
              <label>Password</label>
            </div>
            <div class="forgot-pass"><a href="#">Forgot Password?</a></div>
            <button><p>Login</p></button>
            <div class="signup">Not a member?
            <Link to="/register_new">sign up now</Link>
            </div>
          </form>
        </div>
      </div>
    </body>
    )
  );
}

function RegisterForm() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
    } catch(error) {
      alert("正しく入力してください");
    }
  };

  const [user, setUser] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  return (
    user ?
    (
      <Navigate to={`/`} />
    ) : (
    <body>
      <h1>
        <p>　みんなと、小説を紡ぐ</p>
        <span>Re:Tale</span> 
      </h1>
      <div className="right">
        <div class="content">
          <form class="register-form" onSubmit={handleSubmit}>
            <div class="text">Re:Tale Sign up</div>
            <div class="field">
              <span class="fas fa-user"></span>
              <input 
                type="email"
                name="email"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
              ></input>
              <label>Email</label>
            </div>
            <p></p>
            <div class="field">
              <span class="fas fa-lock"></span>
              <input 
                type="password"
                name='password'
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
              ></input>
              <label>Password</label>
            </div>

            <button><p>Sign up</p></button>
            <div class="signup">
            <Link to="/register">login now</Link>
            </div>
          </form>
        </div>
      </div>
    </body>
    )
  );
}

export default App;
