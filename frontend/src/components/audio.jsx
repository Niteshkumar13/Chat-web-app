import React from 'react';
import '../cssFile/rightMessage.css';
import { Seen } from './svg';
const Audio = ({link,admin,seen}) => {
  return (
    <div className='audio-container' style={{position:'relative'}}>
      <audio controls src={link} type="audio/mp3"/>
      <div style={{position:'absolute',bottom:'5px',right:'10px'}} className='time-for-text'><span style={{ fontSize: '12px' }}>12:10 pm</span>{admin&&<Seen seen={seen}/>}</div>
      </div>
  )
}

export default Audio;
