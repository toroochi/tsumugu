import {React, useState} from 'react';
import './style.css';
import {Link} from "react-router-dom";
import { Editor, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';
import firebase from "./FirebaseConfig.js";
import {collection,addDoc,doc,getDoc} from "firebase/firestore"
import db from "./FirebaseConfig"

const Writtingform = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, "posts"), {
                title:title,
                content:content,
                created_at:new Date().getTime()
            });
            setTitle('')
            setContent('')
        } catch (error) {
            console.log(error);
        }
    };

    const onRead = async (e) => {
        
    };
    
    const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
    );
    
    return (
        <body>
            <form onSubmit={onSubmit}>
            <div className='boxmargin'>
                <div class="fixed">
                <font size="6"><Link to="/writting">◁</Link></font>
                </div>
                <div className='savebutton'>
                <button type='submit'>
                    <p>保存</p>
                </button>
                </div>
                <p><h2>小説を書く</h2></p>
                
                <div className='centering_parent'>
                <div className='editor'>
                <div class="cp_iptxt">
                    <label class="ef">
                    <input 
                    type="text" 
                    value={title}
                    placeholder="タイトルを入力してください" 
                    className='centering_item' 
                    onChange={(e) => setTitle(e.target.value)}
                    />
                    </label>
                </div>
                <div class="box29">
                <Editor
                    editorState={editorState}
                    onChange={(newEditorState) => {
                        setEditorState(newEditorState);
                        const newContent = newEditorState.getCurrentContent().getPlainText();
                        setContent(newContent);
                    }}
                    placeholder="本文を入力してください"
                />

                </div>
                </div>
                </div>
                
            </div>
            <div className='post-btn'>
                <button className='circle'>
                    <p>投稿</p>
                </button>
            </div>
            </form>
        </body>
    )
}



export default Writtingform;