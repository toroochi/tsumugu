import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./FirebaseConfig.js";
import './App.css';
import {Link, Navigate} from "react-router-dom";


const Main = () => {
    const [user, setUser] = useState("");
    const [looding, setLoading] = useState(true);

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        setLoading(false);
    });
    }, []);

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
                <p><Link to="/">Home</Link></p>
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
    </div>
    </body>
        )
        )
    );
}

export default Main;