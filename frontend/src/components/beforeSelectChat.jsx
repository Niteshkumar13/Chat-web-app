import React from 'react';
import '../cssFile/beforeSelectChat.css';
import {useUserContext} from '../context/themeContext'
const BeforeSelectChat = () => {
  const {data} = useUserContext()
  return (
    <div className='before-selected-chat' style={{backgroundColor:data.beforeColor}}>
        <div className='before-selected-chat-bg-image-text'>
      <div className='bg-for-before-selected-chat'></div>
      <span>select the chat for conversation</span>
      </div>
    </div>
  )
}

export default BeforeSelectChat;
