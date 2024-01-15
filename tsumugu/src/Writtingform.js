import React from 'react';
import './style.css';
import {Link} from "react-router-dom";

const Writtingform = () => {
    return (
        <body>
            <div className='boxmargin'>
                <font size="6"><Link to="/writting">◁</Link></font>
                <p><h2>小説を書く</h2></p>
            </div>
        </body>
    )
}

export default Writtingform;