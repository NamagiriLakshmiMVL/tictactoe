import './App.css';
import { useState } from 'react';
import useWindowSize from "react-use/lib/useWindowSize"
import Confetti from 'react-confetti'

function App() {
  const {width, height} = useWindowSize();
  const [board,setBoard] = useState([
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
   ] )

const [isXTurn,setIsXTurn]=useState(true)

const decideWinner = (board) =>{
  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ]

  for (let i = 0 ; i< lines.length;i++){
    const [a,b,c]=lines[i]
    console.log(board[a],board[b],board[c])
    if(board[a]!==null && board[a]===board[b] && board[b]===board[c])
      {
       
        return board[a]
      }
    }
      return null
     


  
}
const winner = decideWinner(board)
console.log("Winner",winner)

   const handleClick=(index)=>{
    if(winner===null && !board[index]){
      const boardCopy = [...board]
      boardCopy[index] = isXTurn?"X":"O"
      console.log(boardCopy)
      setBoard(boardCopy)
      setIsXTurn(!isXTurn)
  
    }
    
   }
  return (
    <div className='full-name'>
      <h1>Tic Tac Toe </h1>
     {winner &&  <Confetti>
        width={width}
        height={height}
        </Confetti>}
      {winner && <h1>Winner:{winner}</h1>}
     
      <div className='board'>

      {board.map((val,index)=>(<Gamebox key={index} val={val} onPlayerClick={()=>handleClick(index)}/>))}
      </div>
    </div>
  );
}


function Gamebox({val,onPlayerClick}){

  const styles = {
    color:(val==='X')?"green":"red"
  }
  return(
    <div className='game-box' onClick={onPlayerClick} style={styles}>
      {val}
    </div>
  )
}
export default App;
