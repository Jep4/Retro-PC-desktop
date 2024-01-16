import React from 'react';

function TaskBar() {

    const applications = ["Chat", "Files", "Sudoku", "Login"];

    return (
        <footer className='taskbar-wrapper'>
            <div className='taskbar-menu'>MENU</div>
            {
                applications.map(item => (
                    <div key={item} className='taskbar-apps'>
                        {item}
                    </div>
                ))
            }
        </footer>
    );
}

export default TaskBar;