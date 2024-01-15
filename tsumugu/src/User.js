
import './style.css'
import {Link, useNavigate} from "react-router-dom";
import React, { useState, useEffect } from "react";
import {
    onAuthStateChanged,
    signOut
} from "firebase/auth";
import { auth } from "./FirebaseConfig.js";

const User = () => {

    const [user, setUser] = useState("");
    /* ↓ログインしているかどうかを判定する */
    useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        });
    }, []);

    const navigate = useNavigate();
    const logout = async () => {
        await signOut(auth);
        navigate("/register");
    };
    
    return (
        <body>
            <h1>マイページ</h1>
            <p>{user?.email}aaa</p>
            {/* ↓「onClick」を追加 */}
            <button onClick={logout}>ログアウト</button>
        </body>
    );
}

export default User;