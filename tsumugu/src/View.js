import {React, useState, useEffect} from 'react';
import './style.css';
import {Link, useNavigate, useLocation, useParams} from "react-router-dom";
import { Editor, EditorState, ContentState} from 'draft-js';
import 'draft-js/dist/Draft.css';
import firebase from "./FirebaseConfig.js";
import {collection,addDoc,doc,getDoc, updateDoc,getDocs, query, where} from "firebase/firestore"
import db from "./FirebaseConfig"
import { auth} from "./FirebaseConfig";

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const About = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [postId, setPostId] = useState(null);
    const location = useLocation();
    const {id} = useParams();
    const [contributionContent, setContributionContent] = useState("");
    const [contributionContents, setContributionContents] = useState([]);
    const [userIds, setUserIds] = useState([]);
    const [contributionId, setContributionId] = useState(null);
    const [username, setUsername] = useState("");
    const [usernames, setUsernames] = useState([]);
    const [authorName, setAuthorName] = useState("");
    const [authorId, setAuthorId] = useState("");

    useEffect(() => {
        const fetchPosts = async () =>{
            if (id) {
                const postDoc = await getDoc(doc(db,'posts', id));
                if (postDoc.exists()){
                    const postData = postDoc.data();
                    setTitle(postData.title);
                    setContent(postData.content);
                    setPostId(id);
                }
            }
    
            const querySnapshot = await getDocs(query(collection(db, 'contributions'), where('postId', '==', id)));
            // ドキュメントが存在する場合
            if (!querySnapshot.empty) {
                const docSnapshot = querySnapshot.docs[0];
                const postData = docSnapshot.data();
    
                const usernames = await Promise.all(postData.userIds.map(async (userId) => {
                    const userDoc = await getDoc(doc(db, 'users', userId));
                    if (userDoc.exists()) {
                        return userDoc.data().username;
                    } else {
                        console.error(`No document found for userId: ${userId}`);
                        return null;
                    }
                }));
    
                setContributionContents(postData.contributionContents);
            }
        }
    
        fetchPosts();
        if (location.pathname === "/home"){
            setPostId(null);
        }
    }, [location, postId]);
    
    const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
    );

    // EditorStateからテキストを抽出し、それをcontributionContentに設定する関数
    const handleEditorChange = (editorState) => {
        setEditorState(editorState);
        const text = editorState.getCurrentContent().getPlainText();
        setContributionContent(text);
    };

    const handlePost = async (e) => {
        e.preventDefault();
        const yesNoFlg = window.confirm("投稿してもよろしいですか？");
        if (yesNoFlg) {
            console.log("動けごま！");
            // contentとtitleが空でないことを確認
            if (!contributionContent) {
                toast.error("内容を入力してください。");
                return;
            }
            const userId = auth.currentUser.uid;
            try {
                // contributionsコレクションからpostIdがuseParamsのidと一致するドキュメントを取得
                const querySnapshots = await getDocs(query(collection(db, 'contributions'), where('postId', '==', id)));
    
                // ドキュメントが存在する場合
                if (!querySnapshots.empty) {
                    const docSnapshot = querySnapshots.docs[0];
                    const postData = docSnapshot.data();
                    await updateDoc(doc(db, 'contributions', docSnapshot.id), {
                        contributionContents: [...postData.contributionContents, contributionContent],
                        userIds: [...postData.userIds, userId]
                    });

                    const usernames = await Promise.all(postData.userIds.map(async (userId) => {
                        const userDoc = await getDoc(doc(db, 'users', userId));
                        if (userDoc.exists()) {
                            return userDoc.data().username;
                        } else {
                            console.error(`No document found for userId: ${userId}`);
                            return null;
                        }
                    }));
                    
                    
                // 投稿とユーザー名を表示
                let newContributionContents = [];
                let newUsernames = [];
                for (let i = 0; i < postData.contributionContents.length; i++) {
                    newUsernames.push(usernames[i]);
                    newContributionContents.push(postData.contributionContents[i]);
                    console.log(`<p>${usernames[i]}: ${postData.contributionContents[i]}</p>`);
                }
                setUsernames(newUsernames);
                setContributionContents(newContributionContents);

                    
                    
                } else {
                    // 新しい投稿を作成
                    const docRef = await addDoc(collection(db, "contributions"),{
                        userIds: [userId],
                        contributionContents: [contributionContent],
                        postId: id,
                    });
                    console.log("保存！");
                    setContributionId(docRef.id) // 新しく作成した投稿のIDを保存
                }
                toast.success("投稿しました！")
                setEditorState(EditorState.createEmpty());
    
                // contentとtitleを空にし、postIdをnullに設定
                setContributionContent("");
                setContributionId(null);
                // 投稿後にデータを再取得
                const querySnapshot = await getDocs(query(collection(db, 'contributions'), where('postId', '==', id)));
                if (!querySnapshot.empty) {
                    const docSnapshot = querySnapshot.docs[0];
                    const postData = docSnapshot.data();

                    const usernames = await Promise.all(postData.userIds.map(async (userId) => {
                        const userDoc = await getDoc(doc(db, 'users', userId));
                        if (userDoc.exists()) {
                            return userDoc.data().username;
                        } else {
                            console.error(`No document found for userId: ${userId}`);
                            return null;
                        }
                    }));

                    setUsernames(usernames);
                    setContributionContents(postData.contributionContents);
                }

            } catch (error) {
                console.log(error);
                toast.error("投稿に失敗しました。")
            }
        }else{
            console.log("falseだよ！");
        }
    }
    
    return (
        <body>
            <ToastContainer />
            <form　onSubmit={handlePost}>
            <div className='boxmargin'>
                <div class="fixed">
                <font size="6"><Link to="/writting">◁</Link></font>
                </div>
                <p><h2>小説をつなげる</h2></p>
                <p>{title}</p>
                <p>{content}</p>
                <hr></hr>
                <div>
                    {usernames.map((username,index) =>(
                        <p key={index}>{username} : {contributionContents[index]}</p>
                    ))}
                </div>
                
                <div className='centering_parent'>
                <div className='editor'>
                <div class="box29">
                <Editor
                    editorState={editorState}
                    onChange={handleEditorChange}
                    placeholder="ここから入力を行ってください。"
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

export default About;