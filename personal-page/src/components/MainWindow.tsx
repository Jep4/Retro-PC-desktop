import React from 'react';
import "./MainWindow.css"

  

function MainWindow({children, left, top, width, height}:any) {

    return (
        <div className='window-wrapper' style={{left: left, top:top, width:width, height:height}}>
            <div className='nav-bar'>
                <div className='title-area'>RUNNING...</div>
                <div className='minimize btn'>_</div>
                <div className='maximize btn'>◻</div>
                <div className='close btn'>X</div>
            </div>

            <div className='main-window'>
            {children}
            </div>

        </div>
    );
}

export default MainWindow;