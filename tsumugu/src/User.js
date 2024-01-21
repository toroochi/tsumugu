import './style.css'
import {Link, useNavigate} from "react-router-dom";
import React, { useState, useEffect } from "react";
import {
    onAuthStateChanged,
    signOut,
    deleteUser,
} from "firebase/auth";
import { auth } from "./FirebaseConfig.js";
import { doc, getDoc } from "firebase/firestore";
import db from "./FirebaseConfig" // Firestoreの設定をインポート

const User = () => {
    const [user, setUser] = useState("");
    const [username, setUsername] = useState(""); 
    /* ↓ログインしているかどうかを判定する */
    useEffect(() => {
    onAuthStateChanged(auth, async(currentUser) => {
        setUser(currentUser);
        if (currentUser) {
            const userDoc = doc(db, 'users', currentUser.uid); // usersコレクションから現在のユーザーのドキュメントを取得
            const userDocData = await getDoc(userDoc); // ドキュメントのデータを取得
            setUsername(userDocData.data().username); // ユーザー名をstateに保存
        }
        });
    }, []);

    const deleteAccount = async () => {
        if(window.confirm("アカウントを削除してもよろしいですか？")) {
            await deleteUser(auth.currentUser);
            navigate("/register");
        }
    };

    const navigate = useNavigate();
    const logout = async () => {
        await signOut(auth);
        navigate("/register");
    };
    
    return (
        <body>
            <div class="navigation">
                <ul>
                <li class="button">
                    <p><Link to="/">ホーム</Link></p>
                </li>
                <li class="button">
                    <p><Link to="/about">概要</Link></p>
                </li>
                <li class="button">
                    <p><Link to="/writting">執筆</Link></p>
                </li>
                <li class="button">
                    <p><Link to="/user">ユーザー設定</Link></p>
                </li>
                <li class="button">
                    <p><a href='https://forms.gle/UL6gNuatsDH2mb7p6'>バグ報告</a></p>
                </li>
                </ul>
            </div>
            <div className='boxpadding'></div>
            <h2><p>マイページ</p></h2>
            <hr></hr>
            <p>ユーザーネーム : {username}</p>
            <p>メールアドレス : {user?.email}</p>
            {/* ↓「onClick」を追加 */}
            <div className='centering_parent'>
            <div className='centering_item'>
            <button onClick={logout} className='buttonsize'>ログアウト</button>
            <button onClick={deleteAccount} className='buttonsize'>アカウント削除</button>
            </div></div>
        </body>
    );
}

export default User;