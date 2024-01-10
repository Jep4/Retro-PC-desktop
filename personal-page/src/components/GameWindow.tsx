import React from 'react';
import glitch from "../img/glitch.gif"
import "./MainWindow.css"


function GameWindow() {

    return (
        <div className='game-window-wrapper'>
        <div className='window-graphic'>
            <div className='upper-window'></div>
            <div className='bottom-window'>
            <img src={glitch} alt='glitch' width="100%" height="100%"/>
            </div>

        </div>

        
        <div className='game-text-filed'>
                The window leads you up into darkness ... Lorem ipsum dolor sit amet.
                <br></br>
                <br></br>
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ▼
            </div>
        </div>
        
    );
}

export default GameWindow;