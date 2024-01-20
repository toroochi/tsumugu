import React, { useEffect, useState } from 'react';
import './style.css';
import {Link, useNavigate} from "react-router-dom";
import pen from "./pen.png";
import book from "./blue.png";
import {collection,addDoc,doc,getDoc, updateDoc,onSnapshot} from "firebase/firestore"
import db, { auth } from "./FirebaseConfig"
import {getAuth, useAuthState} from "firebase/auth";


const getStrTime = (time) => {
    let t = new Date(time);
    return (`${t.getFullYear()}/${t.getMonth()+1}/${t.getDate()} ${t.getHours()}:${t.getMinutes()}:${t.getSeconds()}`);
}

const Writting = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [isCompleted, setIsCompleted] = useState(false);

    const fetchPosts = (isCompleted) => {
        onSnapshot(collection(db, 'posts'), (snapshot) => {
            setPosts(
                snapshot.docs
                    .map((post) => ({ ...post.data(), id: post.id }))
                    .filter((post) => post.isCompleted === isCompleted && post.createBy === user.uid)
                    .sort((a,b) => b.created_at - a.created_at)
            )
        })
    }
    useEffect(() => {
        fetchPosts(isCompleted);
    }, [isCompleted]);
    
    const handlePostClick = (post) => {
        if (post.isCompleted) {
            navigate(`/appreciation/${post.id}`);
        } else {
            navigate(`/writtingform/${post.id}`);
        }
    }

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
                </ul>
            </div>
            <div className='boxpadding'></div>
            <div className='centering_parent'>
            <div className='centering_item'>
            <button className='buttonsize' onClick={() => setIsCompleted(false)}><p>編集中の物語</p></button>
            <button className='buttonsize' onClick={() => setIsCompleted(true)}><p>始めた物語</p></button>
            <button className='buttonsize'><p>続いた物語</p></button>
            </div>
            </div>
            <hr></hr>
            {posts.map((post) => (
                <div className='post'>
                    <div className='title'>
                        <p className='not'>{post.title}</p>
                        <img src={book} className='booksize' onClick={() => handlePostClick(post)}></img>
                    </div>
                    <div className='created_at'>投稿日：{getStrTime(post.created_at)}</div>
                </div>
            ))}
            <hr></hr>
            <div className='post-btn'>
            <Link to="/writtingform" className="not">
                <button className='circle'>
                    <img src={pen} className='pensize'></img>
                </button>
            </Link>
            </div>
        </body>
    );
}

export default Writting;
