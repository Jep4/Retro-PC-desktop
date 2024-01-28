import React, { useEffect, useState } from 'react';
import './MainWindow.css';

function GameWindow() {
  const [answerKey, setAnswerKey] = useState(Array(9).fill(null).map(() => Array(9).fill('0')));
  const [sudoku, setSudoku] = useState(Array(9).fill(null).map(() => Array(9).fill('0')));
  const [seeRank, setRank] =useState(false);
  useEffect(() => {
    createSudoku();
  }, []); 

  function createSudoku() {
    const newAnswerKey = Array(9).fill(null).map(() => Array(9).fill('0'));
    const newSudoku = Array(9).fill(null).map(() => Array(9).fill('0'));

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        newAnswerKey[i][j] = String(Math.floor(Math.random() * 9));
        newSudoku[i][j] = String(Math.floor(Math.random() * 9));

        if (Math.random() > 0.7) {
          newSudoku[i][j] = '';
        }
      }
    }

    setAnswerKey(newAnswerKey);
    setSudoku(newSudoku);
  }

  function inputControl(col: string) {
    if (col === '') {
      return <input className="sudoku-input" type="number"></input>;
    } else {
      return col;
    }
  }

  class MainSudoku extends React.Component{
    render(){
      return(
        <div className="game-window-wrapper">
          <div className="sudoku">
            <table className="sudoku-table">
              {sudoku.map((row: string[], rowIndex: number) => (
                <tr key={rowIndex}>
                  {row.map((col: string, colIndex: number) => (
                    <td key={colIndex}>{inputControl(col)}</td>
                  ))}
                </tr>
              ))}
            </table>
          </div>
    
          <div className="game-text-filed">
            User1 / / / Time Passed 0:12/ / / Current Score: 237
            <br></br>
            <br></br>
            <button className="btn" onClick={()=>setRank(true)}>
              See Ranking
            </button>
          </div>
        </div>)
    }
  }
  
  const sampleRank=[{Rank:1, username: "User1", score:1000},{Rank:2, username: "User2", score:900}];
  class Ranking extends React.Component{

    render(){
      return(
        <div className="ranking-wrapper">
            <table className="sudoku-table">
              {sampleRank.map(({Rank, username, score}) => (
                <tr key={Rank}>
                  <span>Rank {Rank} ::: {username} / / Score::: {score}</span>
                </tr>
              ))}
            </table>
    
            <button className="btn" onClick={()=>setRank(false)}>
              Back to the Game
            </button>
          </div>
      )
    }
  }

  return (
    seeRank?<Ranking></Ranking>:<MainSudoku></MainSudoku>
  );
}

export default GameWindow;
