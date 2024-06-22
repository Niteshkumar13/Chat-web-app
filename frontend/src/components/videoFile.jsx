import React from 'react'
import '../cssFile/rightMessage.css';
import { Cross } from './svg';
const VideoFile = ({link,show}) => {
  return (
    <div style={{height:'100vh',width:'100vw',backgroundColor:'rgba(30,41,59,1)',zIndex:'10',position:'absolute',left:'0',top:'0',display:'grid',placeItems:'center'}}>
        <div style={{position:'absolute',right:'10px',top:'0',fontSize:'50px',color:'white'}} onClick={e=>show()}>
          <Cross height={30} width={25}/>
        </div>
      <div className='video-container-watcher'><video   controls autoPlay  className='video'>
        <source src={link}/>
      </video>
      </div>
    </div>
  )
}

export default VideoFile
