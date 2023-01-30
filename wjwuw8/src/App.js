import { useState } from "react"; 

function Square({value , onSquareClick}) {
  return (
    <button className="square" onClick={onSquareClick}>{value}</button>
  );
}


function Board ({Xisnext , squares , onplay} ) {

  function handleClick(i) {
    if (calculatewinner(squares) || squares[i]) {
        return;
    }
    const nextSquares = squares.slice();
    if (Xisnext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onplay(nextSquares);
   
   
 }


  const winner = calculatewinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (Xisnext ? 'X' : 'O');
  }

  return(
      <>  
          <div className="status">{status}</div>
          <div className="board-row">
            <Square value={squares[0]} onSquareClick={() =>handleClick(0)}/>
            <Square value={squares[1]} onSquareClick={() =>handleClick(1)}/>
            <Square value={squares[2]} onSquareClick={() =>handleClick(2)}/>
          </div>
          <div className="board-row">
            <Square value={squares[3]} onSquareClick={() =>handleClick(3)}/>
            <Square value={squares[4]} onSquareClick={() =>handleClick(4)}/>
            <Square value={squares[5]} onSquareClick={() =>handleClick(5)}/>
          </div>
          <div className="board-row">
            <Square value={squares[6]} onSquareClick={() =>handleClick(6)}/>
            <Square value={squares[7]} onSquareClick={() =>handleClick(7)}/>
            <Square value={squares[8]} onSquareClick={() =>handleClick(8)}/>
          </div>
      </> 
  );

}

export default function game() {
  const [history, sethistory] = useState([Array(9).fill(null)]);
  const [currentmove,setcurrentmove] = useState(0)
  const Xisnext = currentmove % 2 === 0;
  const currentsquares = history[currentmove];

  function handlePlay(nextSquares) {
    const nextHistory= [...history.slice(0,currentmove+1),nextSquares];
    sethistory(nextHistory);
    setcurrentmove(nextHistory.length-1);

  }

  function JumpTo(nextmove) {
    setcurrentmove(nextmove)

  }

  const moves = history.map((squares,move) => {
    let description;
    if (move>0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to Game start';
    }
    return (
      <li key={move}>
        <button onClick={() => JumpTo(move)}>{description}</button>
      </li>
    );
  });
  
  return(
    <div className="game">
      <div className="game-board">
        <Board Xisnext = {Xisnext} squares = {currentsquares} onplay = {handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
    }

function calculatewinner(squares) {
  const lines= [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i=0; i<lines.length; i++) {
    const[a,b,c] =lines[i];
    if (squares[a] && squares[a] == squares[b] && squares[a] == squares[c] ) {
      return squares[a];
    }
  }
  return null;
}
