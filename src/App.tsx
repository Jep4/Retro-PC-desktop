import MainWindow from './components/MainWindow';
import GameWindow from './components/GameWindow';
import ChatWindow from './components/ChatWindow';
import FileWindow from './components/FileWindow';
import LoginWindow from './components/LoginWindow';
import TaskBar from './components/TaskBar';
import './App.css';
function App() {

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

      <TaskBar></TaskBar>

      {/* Issue: not working after refresh
          Thought: Might be an rendering issue
          Todo: add loading bar to check
          <MouseLight>
          </MouseLight> */}

    </div>
  );
}
export default App;
