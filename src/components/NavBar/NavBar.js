import React, { useEffect, useState, useRef } from 'react';
import {  NavLink } from "react-router-dom";

import "./NavBar.css";


const NavBar = ( {animate} ) => {
    const style = {
        margin: "0 auto",
        height: "3em",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "black",
        position: "sticky",
        width: "100%",
        animation: animate ? "fading 3.5s forwards" : "none",
    }
    
    return (
        <div style={style} className="NavBar">
            <li>
                <NavLink to="/prxjects" className="underline">/prxjects</NavLink>
            </li>
            <li>
                <NavLink to="/4bout_me" className="underline">/4bout_me</NavLink>
            </li>
            <li>
                <NavLink to="/cont4cts" className="underline">/cont4cts</NavLink>
            </li>
        </div>
    )
}

export default NavBar;
