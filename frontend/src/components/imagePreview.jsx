import React from 'react'
import '../cssFile/rightMessage.css';
import { Cross } from './svg';
const imagePreview = ({name,url,show}) => {
  return (
    <div className='image-previewer-container'>
        <div className='download-undo-redo'>
        <a href={url} download={`MERN-chat-${name}`}><svg fill='white' id="Layer_1" data-name="Layer 1" height="30"  viewBox="0 0 122.88 120.89"><title>download-file</title><path d="M84.58,47a7.71,7.71,0,1,1,10.8,11L66.09,86.88a7.72,7.72,0,0,1-10.82,0L26.4,58.37a7.71,7.71,0,1,1,10.81-11L53.1,63.12l.16-55.47a7.72,7.72,0,0,1,15.43.13l-.15,55L84.58,47ZM0,113.48.1,83.3a7.72,7.72,0,1,1,15.43.14l-.07,22q46,.09,91.91,0l.07-22.12a7.72,7.72,0,1,1,15.44.14l-.1,30h-.09a7.71,7.71,0,0,1-7.64,7.36q-53.73.1-107.38,0A7.7,7.7,0,0,1,0,113.48Z"/></svg></a>
        <label onClick={show}><Cross height={30} width={34}/></label>
        </div>
      <img className='image' src={url}/>
    </div>
  )
}

export default imagePreview
