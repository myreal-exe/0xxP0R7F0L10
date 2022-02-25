import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';

import EnterButton from "../../components/EnterButton/EnterButton";
import NavBar from '../../components/NavBar/NavBar';
import FakeTerminal from '../../components/FakeTerminal/FakeTerminal';
import { terminalsObjects } from '../../components/FakeTerminal/terminals';
// Media
import promptVideo from "../../media/dedsec_prompt.mp4";
import bgVideo from "../../media/dedsec_art_only.mp4";

import "./homepage.css";


const HomePage = () => {

    const videoRef= useRef();

    // State
    const [ entered, setEntered ] = useState(false);
    const buttonTexts = ["", "_ _ _ _", "J _ _ _", "J _ _ _", "J O _ _", "J O _ _", "J O I _", "J O I _", "J O I N", "J O I N", "J O I N","J O I N","J O I N","J O I N","J O I N","J O I N","J O I N","J O I N","神","の","死","us","us"];
    const [ buttonText, setButtonText ] = useState("J O I N");
    const [ buttonTextIdx, setButtonTextIdx ] = useState(0);
    const [ terminalsToRender, setTerminalsToRender] = useState([]);

    
    // FakeTerminals
    useEffect( () => {
        if( entered ){
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

    // Enter
    const handleEnterClick = (e) => {
        e.preventDefault()
        setEntered(true);
    }

    // Background
    const renderBgVideo = () => {
        if(entered){
            return (<video key={1} autoPlay muted className="bgVideo">
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

    
    return (
        <div id="HomePage">
            {renderBgVideo()}
            <EnterButton onClick={handleEnterClick} text={buttonText}/>
            {entered && <NavBar/>}
            {entered && terminalsToRender.map( (item) => item)}
        </div>
    )
}

export default HomePage;