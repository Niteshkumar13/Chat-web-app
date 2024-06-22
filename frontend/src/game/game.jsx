import React, {useEffect, useState } from 'react';
import '../cssFile/game.css';
import { startgame } from "../hooks/startgame";
import { useGameContext } from '../context/gameContext'
import { useNavigate } from 'react-router-dom';
import { usesocketIoContext } from '../context/socketIo';
import SearchUser from './searchUser';
const Game = () => {
    const { clicked, isDisabled, setIsDisabled, resetgame, fullName, changeMove} = startgame()
    const { game,setGame} = useGameContext()
    const navigate = useNavigate();
    const { socket } = usesocketIoContext();
    useEffect(() => {
        if(socket){
        socket.on("startplay", async ({ name,id}) => {
            localStorage.setItem("ftm","X")
            localStorage.setItem("opp",JSON.stringify({name,id,turn:false}))
            await setGame(prevState => ({ ...prevState,board:Array(9).fill(""), opponent: {name,id} ,show:false,notification:false,isYourtime:true}))
        }) 
        socket.on("moveposition", ({move}) => {
            setGame(prev=>({...prev,isYourtime:true}))
            clicked(move,true);
        })
        socket.on("isDrawWin", async ({data})=>{
            if(data.draw === "yes"){
                resetgame();
            }
            else if(data.winner){
                    setGame(prev=>({...prev,winner:data.winner}))
            }
        })
    }
        return () => {
            socket?.off("startplay");
            socket?.off("moveposition");
        }
    }, [socket])
    return (
        <>
            {game.show && <SearchUser />}
            <div className='container-for-game'>
                <div className='child-container-for-game'>
                    <span className='tic-tac-toe'>Tic-Tac-Toe</span>
                    {game.winner &&
                        <div className='after-winning-the-game'>
                            <span style={{ fontSize: 20 }}>{game.winner} won the match</span>
                            <div style={{ display: 'flex', gap: 10 }}>
                                <button onClick={e => navigate('/home')}>Go to Chat</button>
                                <button onClick={resetgame}>Start new game</button>
                            </div>
                        </div>}
                    {!game.winner && <>
                        {game.opponent.name&&<div className='name-for-game'>
                            <span style={{ marginRight: 10,border:game.isYourtime&&'2px solid salmon'}}>You: {fullName}</span>
                            <span style={{border:!game.isYourtime&&'2px solid salmon'}}>Opp.: {game.opponent.name}</span>
                        </div>}
                        <div className='turn-for-game'>
                            <span>You are playing as <select onClick={e => { isDisabled.one % 2 === 0 ? setIsDisabled({ ...isDisabled, two: true }) : setIsDisabled({ ...isDisabled, one: 2 }) }} disabled={isDisabled.two} onChange={e => { changeMove(e.target.value) }}>
                                <option value="X">X</option>
                                <option value="O">O</option>
                            </select></span>
                            <span>{game.move}'s Turn</span>
                        </div>
                        <div className='child-game'>
                            <div className='row'>
                                <div onClick={e => game.isYourtime&&clicked(0)}>{game.board[0]}</div>
                                <div onClick={e => game.isYourtime&&clicked(1)}>{game.board[1]}</div>
                                <div onClick={e => game.isYourtime&&clicked(2)}>{game.board[2]}</div>
                            </div>
                            <div className='row'>
                                <div onClick={e => game.isYourtime&&clicked(3)}>{game.board[3]}</div>
                                <div onClick={e => game.isYourtime&&clicked(4)}>{game.board[4]}</div>
                                <div onClick={e => game.isYourtime&&clicked(5)}>{game.board[5]}</div>
                            </div>
                            <div className='row'>
                                <div onClick={e => game.isYourtime&&clicked(6)}>{game.board[6]}</div>
                                <div onClick={e => game.isYourtime&&clicked(7)}>{game.board[7]}</div>
                                <div onClick={e => game.isYourtime&&clicked(8)}>{game.board[8]}</div>
                            </div>
                        </div>
                    </>}
                </div>

            </div>
        </>
    )
}

export default Game
