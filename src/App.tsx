import MainWindow from './components/MainWindow';
import GameWindow from './components/GameWindow';
import ChatWindow from './components/ChatWindow';
import FileWindow from './components/FileWindow';
import LoginWindow from './components/LoginWindow';
import TaskBar from './components/TaskBar';
import MusicWindow from './components/MusicWindow';
import './App.css';
function App() {

  const appNames = ["Sudoku", "File-Explorer", "Messanger", "Login", "Music-Player"]

  return (
    
    <div className="App">
      <MainWindow left="30px" top="17px" width="600px" height="600px" title="SUDOKU CHALLENGE">
        <GameWindow />
      </MainWindow>

      <MainWindow left="330px" top="230px" width="500px" height="370px" title="FILE EXPLORER">
        <FileWindow></FileWindow>
      </MainWindow>

      <MainWindow left="550px" top="480px" width="300px" height="370px" title="MESSANGER">
        <ChatWindow></ChatWindow>
      </MainWindow>

      <MainWindow left="700px" top="100px" width="500px" height="200px" title="LOGIN">
        <LoginWindow></LoginWindow>
      </MainWindow>
      <MainWindow className="Music-Player" left="100" top="600px" width="500px" height="200px" title="MUSIC PLAYER">
        <MusicWindow></MusicWindow>
      </MainWindow>

      <TaskBar props={appNames}></TaskBar>

    </div>
  );
}
export default App;
