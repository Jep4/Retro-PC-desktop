
import "./MainWindow.css"


function GameWindow() {

    var answerKey:string[][] =   Array(9).fill(null).map(() => Array(9).fill("0"));
    var sudoku: string[][] =   Array(9).fill(null).map(() => Array(9).fill("0"));


    function createSudoku(){
        for(let i=0; i<9; i++){
            for(let j=0; j<9; j++){
                answerKey[i][j] = String(Math.floor(Math.random()*9));
                sudoku[i][j] = String(Math.floor(Math.random()*9));

                if(Math.random()>0.7){
                    sudoku[i][j] = "";
                }
            }
        }
    }

    function inputControl(col:string){
        if(col===""){
            return <input  className= "sudoku-input" type="number"></input>
        }
        else{
            return col
        }
    }
    createSudoku();

    return (
        <div className='game-window-wrapper'>
        <div className='sudoku'>
            <table className='sudoku-table'>
                {
                sudoku.map((row:string[])=>(
                    <tr>
                        {
                        row.map((col:string)=>(
                            <td>
                                {inputControl(col)}
                            </td>
                        ))}
                    </tr>
               ))}
            </table>
        </div>

        
        <div className='game-text-filed'>
                The window leads you up into darkness ... Lorem ipsum dolor sit amet.
                <br></br>
                <br></br>
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ▼
            </div>
        </div>
        
    );
}

export default GameWindow;