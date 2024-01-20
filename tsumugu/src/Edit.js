import {React, useState, useEffect} from 'react';
import './style.css';
import {Link, useNavigate, useLocation, useParams} from "react-router-dom";
import { Editor, EditorState, ContentState} from 'draft-js';
import 'draft-js/dist/Draft.css';
import firebase from "./FirebaseConfig.js";
import {collection,addDoc,doc,getDoc, updateDoc,onSnapshot} from "firebase/firestore"
import db from "./FirebaseConfig"
import { auth} from "./FirebaseConfig";

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Edit = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [postId, setPostId] = useState(null);
    const location = useLocation();
    const {id} = useParams();

    useEffect(() => {
        const fetchPosts = async () =>{
            if (id) {
                const postDox = await getDoc(doc(db,'posts', id));
                if (postDox.exists()){
                    const postData = postDox.data();
                    setTitle(postData.title);
                    setContent(postData.content);
                    setPostId(id);
    
                    // postData.contentをエディターに反映
                    const contentState = ContentState.createFromText(postData.content);
                    const newEditorState = EditorState.createWithContent(contentState);
                    setEditorState(newEditorState);
                }
            }
        };
        fetchPosts();
        if (location.pathname === "/writting"){
            setPostId(null);
        }
    }, [location, postId]);
    

    const onSubmit = async (e) => {
        e.preventDefault();
        const userId = auth.currentUser.uid;
        try {
            if (postId) {
                //既存の投稿を更新
                await updateDoc(doc(db, "posts", postId),{
                    title: title,
                    content: content,
                });
            }else{
                //新しい投稿を作成
                const docRef = await addDoc(collection(db, "posts"),{
                    title: title,
                    content: content,
                    createBy: userId,
                    isCompleted: false,
                    created_at:new Date().getTime()
                });
                setPostId(docRef.id)//新しく作成した投稿のIDを保存
            }
            toast.success("保存しました！")
        } catch (error) {
            console.log(error);
            toast.error("保存に失敗しました。")
        }
    };
    const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
    );
    const handlePost = async () => {
        const yesNoFlg = window.confirm("投稿してもよろしいですか？");
        if (yesNoFlg) {
            // contentとtitleが空でないことを確認
            if (!content || !title) {
                toast.error("内容を入力してください。");
                return;
            }
    
            const userId = auth.currentUser.uid;
            try {
                if (postId) {
                    // 既存の投稿を更新
                    await updateDoc(doc(db, "posts", postId),{
                        title: title,
                        content: content,
                        isCompleted: true,
                        created_at:new Date().getTime()
                    });
                } else {
                    // 新しい投稿を作成
                    const docRef = await addDoc(collection(db, "posts"),{
                        title: title,
                        content: content,
                        createBy: userId,
                        isCompleted: true,
                        created_at:new Date().getTime()
                    });
                    setPostId(docRef.id) // 新しく作成した投稿のIDを保存
                }
                toast.success("投稿しました！");
    
                // contentとtitleを空にし、postIdをnullに設定
                setContent("");
                setTitle("");
                setPostId(null);
            } catch (error) {
                console.log(error);
                toast.error("保存に失敗しました。")
                await updateDoc(doc(db, "posts", postId),{
                    isCompleted: false,
                });
            }
        }
    }
    
    return (
        <body>
            <ToastContainer />
            <form onSubmit={onSubmit}>
            <div className='boxmargin'>
                <div class="fixed">
                <font size="6"><Link to="/home">◁</Link></font>
                </div>
                <p><h2>小説を書き始める</h2></p>
                
                <div className='centering_parent'>
                <div className='editor'>
                <div class="box29">
                <Editor
                    editorState={editorState}
                    onChange={(editorState) => {
                        setEditorState(editorState);
                        const contentState = editorState.getCurrentContent();
                        const newContent = contentState.getPlainText();
                        setContent(newContent);
                    }}
                    placeholder="本文を入力してください"
                />

                </div>
                </div>
                </div>
                
            </div>
            <div className='post-btn' onClick={handlePost}>
                <button className='circle'>
                    <p>投稿</p>
                </button>
            </div>
            </form>
        </body>
    )
}

export default Edit;
