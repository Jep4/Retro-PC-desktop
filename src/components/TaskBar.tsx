import React from 'react';
import './MainWindow.css'; 

function TaskBar({appData, openWindows, onToggle}:any) {


    return (
        <footer className='taskbar-wrapper'>
            <div className='taskbar-menu'>MENU</div>
            {appData.map(({id}:any)=>(
                <div key={id}
                className={`taskbar-apps ${openWindows.includes(id) ? 'active-taskbar':""}`}
                    onClick={()=>onToggle(id)}>
                    {id}
                </div>
            ))}
        </footer>
    );
}

export default TaskBar;
