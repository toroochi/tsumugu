import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./FirebaseConfig.js";
import './App.css';
import {Link, Navigate, useNavigate} from "react-router-dom";
import book from "./blue.png";
import {collection,addDoc,doc,getDoc, updateDoc,onSnapshot} from "firebase/firestore"
import db from "./FirebaseConfig"

const getStrTime = (time) => {
    let t = new Date(time);
    return (`${t.getFullYear()}/${t.getMonth()+1}/${t.getDate()} ${t.getHours()}:${t.getMinutes()}:${t.getSeconds()}`);
}

const Main = () => {
    const [user, setUser] = useState("");
    const [looding, setLoading] = useState(true);
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [isCompleted, setIsCompleted] = useState(true);

    const fetchPosts = (isCompleted) => {
        onSnapshot(collection(db, 'posts'), (snapshot) => {
            setPosts(
                snapshot.docs
                    .map((post) => ({ ...post.data(), id: post.id }))
                    .filter((post) => post.isCompleted === isCompleted)
                    .sort((a,b) => b.created_at - a.created_at)
            )
        })
    }

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        setLoading(false);
        fetchPosts(isCompleted);
    });
    }, [isCompleted]);
        
    const handlePostClick = (post) => {
        navigate(`/edit/${post.id}`);
    }

    return (
        !looding && (
        !user ? (
            <Navigate to={`/register`} />
        ) : (
        <body>
        <div className="App">
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
            <h2><p>みんなの小説</p></h2>
            <hr></hr>
            {posts.map((post) => (
                <div className='post' style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', margin: '10px 0', paddingLeft: '20px' }}>
                    <img src={book} className='booksize' onClick={() => handlePostClick(post)} style={{ marginRight: '20px' }}></img>
                    <div>
                        <p className='not'>{post.title}</p>
                        <div className='created_at'>投稿日：{getStrTime(post.created_at)}</div>
                    </div>
                </div>
            ))}

    </div>
    </body>
        )
        )
    );
}


export default Main;