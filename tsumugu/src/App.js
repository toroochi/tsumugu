import React, { useState, useEffect } from 'react';
import './App.css';
import './components/style.css';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged
} from "firebase/auth";
import { auth } from "./FirebaseConfig.js";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import Register from "./App";
import Main from "./components/Main"

function App() {
  /*firebase auth新規登録変数*/
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  /*firebase authログイン変数*/
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

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

  /* ↓ログインしているかどうかを判定する */
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={`/register`} element={<Register />} />
        <Route path={`/`} element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}

function LoginForm() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  return (
    <body>
      <h1>
        <p>　みんなと、小説を紡ぐ</p>
        <span>Re:Tale</span> 
      </h1>
      <div className="right">
        <div class="content">
          <form class="login-form">
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
            <button><p>Sign in</p></button>
            <div class="signup">Not a member?
              <a href="/register">signup now</a>
            </div>
          </form>
        </div>
      </div>
    </body>
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

  return (
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
              <a href="/login">login now</a>
            </div>
          </form>
        </div>
      </div>
    </body>
  );
}

export default App;
