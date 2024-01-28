import MainWindow from './components/MainWindow';
import GameWindow from './components/GameWindow';
import ChatWindow from './components/ChatWindow';
import FileWindow from './components/FileWindow';
import LoginWindow from './components/LoginWindow';
import TaskBar from './components/TaskBar';
import MusicWindow from './components/MusicWindow';
import './App.css';
import { useState } from 'react';
function App() {
  const [openWindows, setOpenWindows] = useState(["Sudoku", "File-Explorer", "Messenger", "Login", "Music-Player"]);


  const appData = [
    {
      id: 'Sudoku',
      title: 'SUDOKU CHALLENGE',
      component: <GameWindow />,
      initialPosition: { left: '30px', top: '17px', width: '600px', height: '600px' },
    },
    {
      id: 'File-Explorer',
      title: 'FILE EXPLORER',
      component: <FileWindow />,
      initialPosition: { left: '330px', top: '230px', width: '500px', height: '270px' },
    },
    {
      id: 'Messenger',
      title: 'MESSANGER',
      component: <ChatWindow />,
      initialPosition: { left: '550px', top: '480px', width: '300px', height: '370px' },
    },
    {
      id: 'Login',
      title: 'LOGIN',
      component: <LoginWindow />,
      initialPosition: { left: '700px', top: '100px', width: '500px', height: '200px' },
    },
    {
      id: 'Music-Player',
      title: 'MUSIC PLAYER',
      component: <MusicWindow />,
      initialPosition: { left: '100px', top: '600px', width: '500px', height: '200px' },
    },
  ];

  const handleWindow = (id: string) => {
    setOpenWindows((prevWindows) => {
      const isWindowOpen = prevWindows.includes(id);
      return isWindowOpen
        ? prevWindows.filter((windowId) => windowId !== id)
        : [...prevWindows, id];
    });
  };
  

  return (
    
    <div className="App">
      {appData.map(({id, title, component, initialPosition})=>(
        <MainWindow
        classname={id}
        key={id}
        title={title}
        isOpen ={openWindows.includes(id)}
        onToggle={()=>handleWindow(id)}
        {...initialPosition}
        >
          {component}
        </MainWindow>
      ))}
      <TaskBar
      appData={appData}
      openWindows={openWindows}
      onToggle={handleWindow}
      ></TaskBar>
    </div>
  );
}
export default App;
