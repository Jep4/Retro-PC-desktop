import React from 'react';
import "./MainWindow.css"


function GameWindow() {

    return (
        <div className='game-window-wrapper'>
        <div className='window-graphic'>
            <div className='upper-window'></div>
            <div className='bottom-window'>
            <img src="https://media4.giphy.com/media/riw3K0D2h4klG/giphy.gif?cid=ecf05e47kqvjlkze9ula9ak9j50ecj10epgiguwyuh5uwa12&ep=v1_gifs_related&rid=giphy.gif&ct=g" width="100%" height="100%"/>
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