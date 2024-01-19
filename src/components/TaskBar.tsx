import React, { useState } from 'react';
import './MainWindow.css'; 

function TaskBar({ props }: { props: string[] }) {
    const [openWindows, setOpenWindows] = useState<string[]>([]);

    const handleOpen = (item: string) => {
        setOpenWindows((prevWindows) => {
            const isWindowOpen = prevWindows.includes(item);
            return isWindowOpen ? prevWindows.filter((window) => window !== item) : [...prevWindows, item];
        });
    };

    return (
        <footer className='taskbar-wrapper'>
            <div className='taskbar-menu'>MENU</div>
            {props.map((item) => (
                <div
                    key={item}
                    className={`taskbar-apps ${openWindows.includes(item) ? 'active-taskbar' : ''}`}
                    onClick={() => handleOpen(item)}
                >
                    {item}
                </div>
            ))}
        </footer>
    );
}

export default TaskBar;
