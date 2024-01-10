import React from 'react';
import MainWindow from './components/MainWindow';
import GameWindow from './components/GameWindow';
import './App.css';

function App() {
  return (
    <body className="App">
        <MainWindow left="30px" top="17px" width="400px" height="600px">
          <GameWindow/>
        </MainWindow>

        <MainWindow left="330px" top="230px" width="500px" height="300px">

        </MainWindow>

        

        
    </body>
  );
}

export default App;
