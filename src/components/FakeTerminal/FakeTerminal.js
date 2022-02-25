import React, { useEffect, useState, useRef } from 'react';

import "./FakeTerminal.css";
import { Typewriter } from 'react-simple-typewriter'

const getLinearSpace = (n, gap=200 ) => {
    const res = [0];
    for (let i = 1; i < n ; i++){
        res.push( res[i - 1] + gap);
    }
    return res;
}
const FakeTerminal = ( {codeList, style} ) => {
    const n = codeList.length;
    const linesTimeouts = getLinearSpace(n);
    const [ codeLines, ] = useState(codeList);
    const [ linesToRender, setLinesToRender ] = useState(Array(n).fill(null));

    // Building Typewriters
    let typewriters = [];
    for(let i=0; i < codeLines.length; i++){
        typewriters.push((
            <span className="code">
                <Typewriter
                key={i}
                words={codeLines[i]}
                typeSpeed={20} 
                cursor={true}
                cursorStyle={"❚"}
                delaySpeed={100}
                />
                <br/>
            </span>
        ))
    }

    
    useEffect( () => {
        const timeouts = [];
        for(let i=0; i < linesTimeouts.length; i++){
            const timeoutId = setTimeout( () => {
                setLinesToRender( (prevState) => {
                    return prevState.map( (item,idx) => {
                        if (idx === i){
                            return typewriters[i];
                        } else {
                            return item
                        }
                    })
                })
            }, linesTimeouts[i]);
            timeouts.push(timeoutId);
        }

        return () => {
            for( let i = 0; i < timeouts.length; i++){
                clearTimeout(timeouts[i]);
            }
        }
    },[])


    // Style
    const terminalStyle = {
        position: "absolute",
        backgroundColor: "black",
        opacity: 0.74,
        border: "5px solid green",
        overflow: "hidden",
        ...style
    }

    return (
        <div style={terminalStyle}>
            <div className="windowBar">
                <div className="windowBarButtons">
                    <span>¯ </span>
                    <span>▣ </span>
                    <span>☠️</span>
                </div>
            </div>
            {linesToRender}
        </div>
    )
}

export default FakeTerminal;
