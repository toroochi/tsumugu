import React from 'react';
import './App.css';
import {Link} from "react-router-dom";
import woman from './j158_9_10.png';
import otaku from './j158_9_13.png';
import boy from './j158_7_11.png';


const Aboutwhat = () => {
    return(
        <body>
    <div className='boxpadding'></div>
    <h2><p>Re:Taleについて</p></h2>
    <hr></hr>
    <p>Re:Taleは、昔のオタク文化でもあった、リレー小説をWebサービスで表現したものとなります。</p>
    <p>リレー小説とは、小説をみんなで少しずつ完成させていく共同作業となります。</p>
    <p>当サイト制作者も紛れもないオタクであり、懐かしくなって制作してみました。</p>
    <p>個人制作サービスなため、まだ至らぬ点は多々あるかと思いますが、皆様の良きオタライフ/小説ライフを願っております。</p>
    <p>当サイト制作者 : toroochi</p>
    <div className='boxpadding'></div>
    <div className="image-container">
    <img src={woman} className="centered-and-small"></img>
    <img src={boy} className="centered-and-small"></img>
    <img src={otaku} className="centered-and-small"></img>
    
    </div>

    </body>
    )
}

export default Aboutwhat;