import React, { useState, useEffect } from 'react';
import './MainWindow.css';

interface MainWindowProps {
  left: string;
  top: string;
  width: string;
  height: string;
  title: string;
  classname: string;
  isOpen: boolean;
  onToggle: any;
  children?: React.ReactNode;
}

const MainWindow: React.FC<MainWindowProps> = ({
  left,
  top,
  width,
  height,
  title,
  classname,
  isOpen,
  onToggle,
  children,
}) => {
  const initialLeft = Number(left.replace(/[^0-9]/g, ''));
  const initialTop = Number(top.replace(/[^0-9]/g, ''));
  const initialWidth = parseInt(width);
  const initialHeight = parseInt(height);

  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ left: initialLeft, top: initialTop });
  const [startDragPosition, setStartDragPosition] = useState({ x: 0, y: 0 });
  const [isResizing, setResizing] = useState(false);
  const [resizeStart, setResizeStart] = useState<{ x: number; y: number; direction: string | null }>({
    x: 0,
    y: 0,
    direction: null,
  });
  const [size, setSize] = useState({ width: initialWidth, height: initialHeight });

  const MIN_WIDTH = Math.max(1, Math.floor(initialWidth / 10));
  const MIN_HEIGHT = Math.max(1, Math.floor(initialHeight / 10));

  useEffect(() => {

    const handleDrag = (e: MouseEvent) => {
      if (isDragging) {
        setPosition((position) => ({
          left: position.left + (e.clientX - startDragPosition.x),
          top: position.top + (e.clientY - startDragPosition.y),
        }));
        setStartDragPosition({ x: e.clientX, y: e.clientY });
      }


      if (isResizing) {
        const deltaX = e.clientX - resizeStart.x;
        const deltaY = e.clientY - resizeStart.y;


        switch (resizeStart.direction) {
          case 'top':
            setSize((prevSize) => ({
              width: prevSize.width,
              height: Math.max(MIN_HEIGHT, prevSize.height - deltaY),
            }));
            if (size.height !== MIN_HEIGHT) {
              setPosition((prevPosition) => ({
                left: prevPosition.left,
                top: prevPosition.top + deltaY,
              }));
            }
            break;
          case 'top-right':
            setSize((prevSize) => ({
              width: Math.max(MIN_WIDTH, prevSize.width + deltaX),
              height: Math.max(MIN_HEIGHT, prevSize.height - deltaY),
            }));
            if (size.height !== MIN_HEIGHT) {
              setPosition((prevPosition) => ({
                left: prevPosition.left,
                top: prevPosition.top + deltaY,
              }));
            }
            break;
          case 'right':
            setSize((prevSize) => ({
              width: Math.max(MIN_WIDTH, prevSize.width + deltaX),
              height: prevSize.height,
            }));
            break;
          case 'bottom-right':
            setSize((prevSize) => ({
              width: Math.max(MIN_WIDTH, prevSize.width + deltaX),
              height: Math.max(MIN_HEIGHT, prevSize.height + deltaY),
            }));
            break;
          case 'bottom':
            setSize((prevSize) => ({
              width: prevSize.width,
              height: Math.max(MIN_HEIGHT, prevSize.height + deltaY),
            }));
            break;
          case 'bottom-left':
            setSize((prevSize) => ({
              width: Math.max(MIN_WIDTH, prevSize.width - deltaX),
              height: Math.max(MIN_HEIGHT, prevSize.height + deltaY),
            }));
            if (size.width !== MIN_WIDTH) {
              setPosition((prevPosition) => ({
                left: prevPosition.left + deltaX,
                top: prevPosition.top,
              }));
            }
            break;
          case 'left':
            setSize((prevSize) => ({
              width: Math.max(MIN_WIDTH, prevSize.width - deltaX),
              height: prevSize.height,
            }));
            if (size.width !== MIN_WIDTH) {
              setPosition((prevPosition) => ({
                left: prevPosition.left + deltaX,
                top: prevPosition.top,
              }));
            }
            break;
          case 'top-left':
            setSize((prevSize) => ({
              width: Math.max(MIN_WIDTH, prevSize.width - deltaX),
              height: Math.max(MIN_HEIGHT, prevSize.height - deltaY),
            }));
            if (size.width !== MIN_WIDTH && size.height !== MIN_HEIGHT) {
              setPosition((prevPosition) => ({
                left: prevPosition.left + deltaX,
                top: prevPosition.top + deltaY,
              }));
            }
            break;
          default:
            break;
        }

        setResizeStart({ x: e.clientX, y: e.clientY, direction: resizeStart.direction });
      }
    };


    const handleMouseUp = () => {
      setIsDragging(false);
      setResizing(false);
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleDrag);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleDrag);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, startDragPosition, isResizing, resizeStart, MIN_WIDTH, MIN_HEIGHT]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const targetElement = e.target as HTMLElement;

    if (targetElement.classList.contains('nav-bar') || targetElement.closest('.nav-bar')) {
      setIsDragging(true);
      setStartDragPosition({ x: e.clientX, y: e.clientY });
    } else if (targetElement.classList.contains('resizer') || targetElement.closest('.resizer')) {
      const resizerDirection = targetElement.getAttribute('data-direction');
      setResizing(true);
      setResizeStart({ x: e.clientX, y: e.clientY, direction: resizerDirection });
    }
  };

  const handleMinimize = () => {
    onToggle(classname);
  };

  const [maxed, setMaxed] = useState(false);

  const handleMaximize = () => {
    if(maxed){
      

  
    setPosition({ left: parseInt(left), top: parseInt(top) });
    setSize({ width: parseInt(width), height: parseInt(height) });
    setMaxed(false);
    }
    else{
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
    
      setPosition({ left: 0, top: 0 });
      setSize({ width: screenWidth, height: screenHeight });
      setMaxed(true)

    }
  }

  return (
    <div
      className={`window-wrapper  ${isOpen ? 'showing' : 'minimized'}`}
      style={{ left: position.left, top: position.top, width: size.width, height: size.height }}
      onMouseDown={handleMouseDown}
    >
      <div className="nav-bar" onMouseDown={handleMouseDown}>
        <div className="title-area">{title}</div>
        <div className="minimize nav-btn" onClick={handleMinimize}>
          _
        </div>
        <div className="maximize nav-btn" onClick={handleMaximize}>◻</div>
        <div className="close nav-btn" onClick={handleMinimize}>
          X
        </div>
      </div>

      <div className="main-window">{children}</div>

      <div className="resizer" data-direction="top" />
      <div className="resizer" data-direction="top-right" />
      <div className="resizer" data-direction="right" />
      <div className="resizer" data-direction="bottom-right" />
      <div className="resizer" data-direction="bottom" />
      <div className="resizer" data-direction="bottom-left" />
      <div className="resizer" data-direction="left" />
      <div className="resizer" data-direction="top-left" />
    </div>
  );
};

export default MainWindow;
