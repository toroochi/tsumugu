import React from 'react';
import './style.css';
import {Link} from "react-router-dom";
import pen from "./pen.png"


const Writting = () => {
    return (
        <body>
            <div class="navigation">
                <ul>
                <li class="button"
                ><p><Link to="/">Home</Link></p>
                </li>
                <li class="button">
                    <p><Link to="/about">About</Link></p>
                </li>
                <li class="button">
                    <p><Link to="/writting">Writting</Link></p>
                </li>
                <li class="button">
                    <p><Link to="/user">User</Link></p>
                </li>
                </ul>
            </div>
            <p>
                <span class="simpleBackgroundImage">あなたが始めた物語一覧</span>
            </p>
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