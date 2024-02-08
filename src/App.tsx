import React, { useState } from 'react';
import MainWindow from './components/MainWindow';
import GameWindow from './components/GameWindow';
import ChatWindow from './components/ChatWindow';
import FileWindow from './components/FileWindow';
import LoginWindow from './components/LoginWindow';
import TaskBar from './components/TaskBar';
import MusicWindow from './components/MusicWindow';
import './App.css';

function App() {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [openWindows, setOpenWindows] = useState(["Sudoku", "File-Explorer", "Messenger", "Login", "Music-Player"]);
  const [windowZIndex, setWindowZIndex] = useState<{ [key: string]: number }>({});

  const appData = [
    {
      id: 'Sudoku',
      title: 'SUDOKU CHALLENGE',
      component: <GameWindow token={token} setToken={setToken} />,
      initialPosition: { left: '30px', top: '17px', width: '600px', height: '600px' },
    },
    {
      id: 'File-Explorer',
      title: 'FILE EXPLORER',
      component: <FileWindow token={token} setToken={setToken} />,
      initialPosition: { left: '330px', top: '230px', width: '500px', height: '270px' },
    },
    {
      id: 'Messenger',
      title: 'MESSANGER',
      component: <ChatWindow token={token} setToken={setToken} />,
      initialPosition: { left: '550px', top: '480px', width: '300px', height: '370px' },
    },
    {
      id: 'Login',
      title: 'LOGIN',
      component: <LoginWindow token={token} setToken={setToken} />,
      initialPosition: { left: '700px', top: '100px', width: '500px', height: '200px' },
    },
    {
      id: 'Music-Player',
      title: 'MUSIC PLAYER',
      component: <MusicWindow token={token} setToken={setToken} />,
      initialPosition: { left: '100px', top: '600px', width: '500px', height: '200px' },
    },
  ];

  const handleWindow = (id: string) => {
    setWindowZIndex((prevZIndex) => {
      const currentMaxZIndex = Math.max(...Object.values(prevZIndex), 0);
      return {
        ...prevZIndex,
        [id]: currentMaxZIndex + 1,
      };
    });

    setOpenWindows((prevWindows) => {
      const isWindowOpen = prevWindows.includes(id);
      return isWindowOpen ? prevWindows.filter((windowId) => windowId !== id) : [...prevWindows, id];
    });
  };

  return (
    <div className="App">
      {appData.map(({ id, title, component, initialPosition }) => (
        <MainWindow
          classname={id}
          key={id}
          title={title}
          isOpen={openWindows.includes(id)}
          onToggle={() => handleWindow(id)}
          zIndex={windowZIndex[id]}
          {...initialPosition}
        >
          {React.cloneElement(component, { token, setToken })}
        </MainWindow>
      ))}
      <TaskBar appData={appData} openWindows={openWindows} onToggle={handleWindow} />
    </div>
  );
}

export default App;
