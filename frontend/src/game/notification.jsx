import React, { useEffect} from 'react';
import '../cssFile/notification.css';
import {useGameContext} from '../context/gameContext';
import { Cross } from '../components/svg';
import {startgame} from '../hooks/startgame';
import { usesocketIoContext } from '../context/socketIo';
const Notification = () => {
  const {game,setGame} = useGameContext();
 const {isAcceptORCancel,hideShow,isCancel} = startgame()
  const { socket } = usesocketIoContext();
  useEffect(() => {
    if (game.opponent.name == null){
      socket?.on("isrequest", async ({ name, profilePic, id }) => {
        setGame(prevState => ({ ...prevState, notification:true, notifiyUser: [...game.notifiyUser, ...[{ name, profilePic, id }]] }));
      })
    return () => {
      socket?.off("isrequest")
    }
  }
  }, [socket,game])
  return (
    <>
      <div className='main-container-for-animation'>
        {game.notification && game.notifiyUser.length !== 0 && <div className='notification-container'>
          <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
            <span style={{ fontSize: 20, marginLeft: 5, color: 'white' }}>Ask to join Game</span>
            <label style={{ display: 'flex' }} onClick={e => hideShow({ which: "parent" })}><Cross height={20} width={20} /></label>
          </div>
          <div className='notify-child-container'>
            {game.notifiyUser && game.notifiyUser.map((item, index) => (<div className='notify-child'>
              <div className='first-notify-child'>
                <div className='User-profile-container-name-last-message'>
                  <img src={item.profilePic} />
                  <span className='last-message' style={{ fontSize: 17, width: 110, color: 'black' }}>{item.name}</span>
                  <label onClick={e => isCancel({isyes:"No",requesteduserid: item.id})}><Cross height={15} width={15} /></label>
                </div>
              </div>
              <div className='button-container'>
                <button onClick={e => isAcceptORCancel({ isyes: "yes", requesteduserid: item.id,opponentName:item.name})}>Yes</button>
                <button onClick={e => isCancel({isyes:"No",requesteduserid: item.id})}>No</button>
              </div>
            </div>))}
          </div>
        </div>}
      </div>
    </>
  )
}

export default Notification
