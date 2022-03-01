import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router-dom';
import { Typewriter } from 'react-simple-typewriter'

// Components
import EnterButton from "../../components/EnterButton/EnterButton";
import NavBar from '../../components/NavBar/NavBar';
import FakeTerminal from '../../components/FakeTerminal/FakeTerminal';
import { terminalsObjects } from '../../components/FakeTerminal/terminals';

// Media
import promptVideo from "../../media/dedsec_prompt.mp4";
import bgVideo from "../../media/dedsec_art_only.mp4";

import "./homepage.css";


const HomePage = ({ entered, onEnterClick}) => {

    const videoRef= useRef();

    // State
    //// Rendering Conditionals
    const [ finishedEnter, setFinishedEnter ] = useState(false);
    const [ showLogo, setShowLogo ]  = useState(false);

    //// enter
    const buttonTexts = ["", "_ _ _ _", "J _ _ _", "J _ _ _", "J O _ _", "J O _ _", "J O I _", "J O I _", "J O I N", "J O I N", "J O I N","J O I N","J O I N","J O I N","J O I N","J O I N","J O I N","J O I N","神","の","死","us","us"];

    const [ buttonText, setButtonText ] = useState("J O I N");
    const [ buttonTextIdx, setButtonTextIdx ] = useState(0);

    //// terminals
    const [ terminalsToRender, setTerminalsToRender] = useState([]);

    
    // FakeTerminals
    useEffect( () => {
        if( entered ){
            const feTimeout = setTimeout( () => {
                setFinishedEnter(true)
            }, 10000)

            const nameLogoTimeout = setTimeout( () => {
                setShowLogo(true)
            }, 14000)
            const timeouts = []
            for(let i=0; i < terminalsObjects.length; i++) {
                const { codeLines, fakeTerminalStyle, delay } = terminalsObjects[i];
                const fakeTerminal = <FakeTerminal key={i} codeList={codeLines} style={fakeTerminalStyle}/>
                const timeout = setTimeout( () => {
                    setTerminalsToRender( (prevState) => {
                        return [
                            ...prevState,
                            fakeTerminal
                        ]
                    })
                }, delay)
                timeouts.push(timeout);
            }
            
            return () => {
                clearTimeout(feTimeout);
                clearTimeout(nameLogoTimeout);
                for(let i = 0; i < timeouts.length; i++){
                    clearTimeout(timeouts[i]);
                }
            }
        }
    }, [entered])


    // EnterButton Animation
    useEffect( () => {
        const buttonTextInterval = setInterval( () => {
            if(buttonTextIdx >= buttonTexts.length - 1){
                setButtonTextIdx(0);
            } else {
                setButtonTextIdx(buttonTextIdx + 1);
            }
            
            if(entered){
                setButtonText("");
            } else {
                setButtonText(buttonTexts[buttonTextIdx]);
            }
        },225)
        return () => clearInterval(buttonTextInterval);
    });

    // Background
    const renderBgVideo = () => {
        if(entered){
            return (<video key={1} autoPlay muted className="bgVideo" >
                        <source src={bgVideo} type="video/mp4"/>
                    </video> 
                    );
        } else {
            return (<video key={2} autoPlay muted loop ref={videoRef} className="bgVideo" onCanPlay={() => setPlayBack()}>
                        <source src={promptVideo} type="video/mp4"/>
                    </video>
            );
        }
    }
    const setPlayBack = () => {
        videoRef.current.playbackRate = 0.4;
    };

    // nameLogo
    const nameLogo = (<span id="nameLogo">
        <Typewriter
        words={ ["","MYREAL-EXE"]}
        cursor={true}
        cursorStyle={"_"}
        delaySpeed={200}
        />
    </span>)
    return (
        <div id="HomePage">
            {renderBgVideo()}
            {entered && <NavBar animate={true}/>}
            <EnterButton onClick={onEnterClick} text={buttonText}/>
            {entered && (!finishedEnter) && terminalsToRender}
            {showLogo && nameLogo}
        </div>
    )
}

export default HomePage;