import { useState } from "react";
import Player from "./assets/components/Player.jsx";
import GameBoard from "./assets/components/GameBoard.jsx";
import Log from "./assets/components/Log.jsx";
import GameOver from "./assets/components/GameOver.jsx";
import { WINNING_COMBINATIONS } from "./assets/winning-combinations.js";


const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

function deriveActivePlayer(gameTurns){

  let currentPlayer = 'X';

      if(gameTurns.length > 0 && gameTurns[0].player === 'X'){
        currentPlayer = 'O';
      }
      return currentPlayer
}



function App() {
  const [players, setPlayers]= useState([
    {X: 'Player1', O: 'Player2'}
  ])
  const [gameTurns, setGameTurns] = useState([]);
  // const [activePlayer, setActivePlayer] = useState('X');

  const activePlayer = deriveActivePlayer(gameTurns);
  let gameBoard = [...initialGameBoard.map(array => [...array])];
  for(const turn of gameTurns){
    const {square, player} = turn;
    const {row, col} = square;
    gameBoard[row][col]=player;
  }
  let winner;
  
  for(const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol){
      winner = players[firstSquareSymbol];
    }
  }

  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex){


    // setActivePlayer((curActivePlayer)=> curActivePlayer === 'X' ? "O" : 'X');
    setGameTurns(prevTurns =>{
      let currentPlayer = deriveActivePlayer(prevTurns);

      if(prevTurns.length > 0 && prevTurns[0].player === 'X'){
        currentPlayer = 'O';
      }

      const updatedTurns = [{ square: {row: rowIndex, col: colIndex}, player: activePlayer },...prevTurns];
    
      return updatedTurns;
    });
  }

  function handleRestart(){
    setGameTurns([])
  }

  function handlePlayerNameChange(symbol, newName){
    setPlayers(prevPlayers =>{
      return{
        ...prevPlayers,
        [symbol]: newName
      };
    })
  }
  return <main><div id="game-container">
    <ol id='players' className="highlight-player">
      <Player name = 'Player 1' symbol="X" isActive={activePlayer === 'X'} onChangeName={handlePlayerNameChange}/>
      <Player name = 'Player 2' symbol="O" isActive={activePlayer === 'O'} onChangeName={handlePlayerNameChange}/>
    </ol>
    {(winner || hasDraw) && <GameOver winner={winner} ondRestart = {handleRestart}/>}
    <GameBoard onSelectSquare={handleSelectSquare} activePlayerSymbol={activePlayer} board={gameBoard}/>
    </div>
    <Log turns={gameTurns}/>
    </main>
}

export default App
