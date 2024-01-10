import React from 'react';
import MainWindow from './components/MainWindow';
import GameWindow from './components/GameWindow';
import './App.css';

function App() {
  return (
    <div className="App">
        <MainWindow left="30px" top="17px" width="400px" height="600px" title="GAME WINDOW">
          <GameWindow/>
        </MainWindow>
{
        <MainWindow left="330px" top="230px" width="500px" height="300px" title="CHAT WINDOW">

        </MainWindow> }

        

        
    </div>
  );
}

export default App;
