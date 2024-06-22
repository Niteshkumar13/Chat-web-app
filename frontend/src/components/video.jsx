import React, {useState,useRef,useEffect } from 'react';
import '../cssFile/rightMessage.css';
import VideoFile from './videoFile';
import { Seen } from './svg';
// 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4'
const Video = ({ videoLink, time,admin,seen }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [videoUrl, setVideoUrl] = useState(videoLink);
  const [thumbnail, setThumbnail] = useState(null);
  const[show,setShow] = useState(false);
  const seekAndCapture = () => {
    videoRef.current.currentTime = 2;
    const captureTimeout = setTimeout(() => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        setThumbnail(canvas.toDataURL('image/png'));
      }
    }, 100);
    return () => clearTimeout(captureTimeout);
  };
useEffect(()=>{
  seekAndCapture()
},[videoLink]);
function chnageShow(){
  setShow(!show)
}
  return (
    <>
    
    {show&&<div style={{position:'absolute',top:'0',left:'0'}}><VideoFile link={videoUrl} show={chnageShow}/></div>}
    <div className='video-container'>
      <div style={{position:'relative'}}>
      <div  style={{position:'absolute',top:'45%',left:'50%',transform:'translateX(-50%)',backgroundColor:'rgba(11,20,26,0.35)',borderRadius:'50%',width:'50px',height:'50px',display:'grid',placeItems:'center'}}>
      <svg  viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" version="1.1"><title>media-play</title><path d="M19.5,10.9 L6.5,3.4 C5.2,2.7 4.1,3.3 4.1,4.8 L4.1,19.8 C4.1,21.3 5.2,21.9 6.5,21.2 L19.5,13.7 C20.8,12.8 20.8,11.6 19.5,10.9 Z" fill="white"></path></svg>
      </div>
      <video onClick={e=>chnageShow()} ref={videoRef} src={videoUrl} onChange={seekAndCapture} />
      <div className='icon-of-video-time'>
      <svg style={{marginLeft:'5px'}} viewBox="0 0 16 14" height="14" width="16" preserveAspectRatio="xMidYMid meet" class="" version="1.1" x="0px" y="0px" enable-background="new 0 0 16 14"><title>msg-video</title><path fill="white" d="M14.987,2.668l-3.48,3.091v-2.27c0-0.657-0.532-1.189-1.189-1.189H1.689C1.032,2.3,0.5,2.832,0.5,3.489 v7.138c0,0.657,0.532,1.189,1.189,1.189h8.629c0.657,0,1.189-0.532,1.189-1.189V8.328l3.48,3.09 C14.987,11.418,14.987,2.668,14.987,2.668z"></path></svg>
       <div>
        <span style={{ fontSize: '12px',color:'white',marginRight:'5px' }}>{time}</span>
        {admin&&<Seen seen={seen}/>}
        </div>
        </div>
        </div>
    </div>
    </>
  )
}

export default Video;
