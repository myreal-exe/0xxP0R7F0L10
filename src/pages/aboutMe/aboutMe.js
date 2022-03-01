import React, { useEffect, useState} from 'react';
import NavBar from '../../components/NavBar/NavBar.js';

import "./aboutMe.css";


const AboutMe = () => {
    return (
        <div className="AboutMe">
            <NavBar animate={false}/>
            <h1>4bout_me</h1>
        </div>
    )
}

export default AboutMe;
