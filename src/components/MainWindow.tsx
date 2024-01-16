import React, { useState, useEffect } from 'react';
import "./MainWindow.css"



function MainWindow({ children, left, top, width, height, title }: any) {

    left = Number(left.replace(/[^0-9]/g, ""))
    top = Number(top.replace(/[^0-9]/g, ""))
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({ left: left, top: top });
    const [startDragPosition, setStartDragPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleDrag = (e: MouseEvent) => {
            if (isDragging) {
                setPosition(position => ({
                    left: position.left + (e.clientX - startDragPosition.x),
                    top: position.top + (e.clientY - startDragPosition.y)
                }));
                setStartDragPosition({ x: e.clientX, y: e.clientY });
            }
        };

        const handleMouseUp = () => setIsDragging(false);
        if (isDragging) {
            document.addEventListener('mousemove', handleDrag);
            document.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleDrag);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, startDragPosition]);
    
    const handleMouseDown = (e:React.MouseEvent<HTMLDivElement>) => {
        setIsDragging(true);
        setStartDragPosition({ x: e.clientX, y: e.clientY });
    };


    return (
        <div className='window-wrapper' style={{ left: position.left, top: position.top, width: width, height: height }}>
            <div className='nav-bar' onMouseDown={handleMouseDown}>
                <div className='title-area' >{title}</div>
                <div className='minimize nav-btn'>_</div>
                <div className='maximize nav-btn'>◻</div>
                <div className='close nav-btn'>X</div>
            </div>

            <div className='main-window'>
                {children}
            </div>

        </div>
    );
}

export default MainWindow;