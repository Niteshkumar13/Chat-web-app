import React, { createContext, useContext,useState } from 'react'

export const GameContext = createContext(null);
export const useGameContext = () =>{ return useContext(GameContext)};

const GameContextProvider = ({ children }) => {
    const [game, setGame] = useState({
        board:Array(9).fill(''),
        move:"X",
        winner:null,
        show:true,
        notification:true,
        notifiyUser:[],
        opponent:{name:null,id:null},
        isYourtime:true
    })
  
    return (
        <GameContext.Provider value={{ game,setGame}}>
            {children}
        </GameContext.Provider>
    )
}

export default GameContextProvider;
