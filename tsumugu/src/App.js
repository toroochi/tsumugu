import React, { useState, useEffect } from 'react';
import './App.css';
import './style.css';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  getAuth
} from "firebase/auth";
import { auth} from "./FirebaseConfig";
import { Route, Routes, Navigate, Link } from "react-router-dom";

import Main from "./Main"
import User from './User';
import Home from './Main';
import Writting from './Writting';
import Writtingform from "./Writtingform";
import Edit from './Edit';
import About from './About';
import View from './View';
import Aboutwhat from './Whatretale';

import { doc, setDoc } from "firebase/firestore"; 
import { getFirestore } from "firebase/firestore";

function App() {
  return (
    <Routes>
    <Route path={`/register`} element={<LoginForm />} />
    <Route path={`/`} element={<Main />} />
    <Route path={`/user`} element={<User />} />
    <Route path={`/register_new`} element={<RegisterForm />} />
    <Route path={`/home`} element={<Home />} />
    <Route path={`/writting`} element={<Writting />} />
    <Route path="/writtingform/:id?" element={<Writtingform />} />
    <Route path="/edit/:id?" element={<Edit />} />
    <Route path='/about' element={<About />}/>
    <Route path="/view/:id?" element={<View />} />
    <Route path='/whatisretale' element={<Aboutwhat />}/>

  </Routes>
  );
}

function LoginForm() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState();

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
        <p>　みんなと、小説を紡ぐ。</p>
        <span>Re:Tale</span> 
      </h1>
      <p><Link to="/whatisretale">Re:Taleについて</Link></p>
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
              {loginEmail === "" && <label>Email</label>}
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
              {loginPassword === "" && <label>Password</label>}
            </div>
            <button>Login</button>
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
  const [user, setUser] = useState("");
  const [inputValue, setInputValue] = useState('');

  const db = getFirestore();
  const auth = getAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      const uid = userCredential.user.uid;
  
      await setDoc(doc(db, "users", uid), {
        username: inputValue,
      });
  
      setUser(userCredential.user);
    } catch(error) {
      alert("正しく入力してください");
    }
  };
  


  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    user ?
    (
      <Navigate to={`/`} />
    ) : (
    <body>
      <h1>
        <p>　みんなと、小説を紡ぐ。</p>
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
              {registerEmail === ""&&<label>Email</label>}
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
              {registerPassword === ""&& <label>Password</label>}
            </div>
            <p></p>
            <div className='field'>
            <span className='fas fa-lock'></span>
            <input 
              type="text"
              name='text'
              value={inputValue}
              onChange={handleInputChange}
            ></input>
            {inputValue === ''&& <label>UserName</label>}
            </div>
            <button>Sign up</button>
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
