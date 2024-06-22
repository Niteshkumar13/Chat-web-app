import React, { useState } from 'react';
import { Emoji, FileIcon, GameIcon } from './svg';
import { useNavigate } from 'react-router-dom';
import '../cssFile/rightBottom.css';
import { useUserContext } from '../context/themeContext';
import EmojiPicker from "emoji-picker-react";
import getConversation from '../hooks/getConversation';
import convertSize from '../hooks/convertSize';
import { getURL } from '../firebase/firebase';
const RightBottom = () => {
  // all hooks are ...
  const { data } = useUserContext();
  const { conversation } = getConversation()
  const [datas, setDatas] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const [showthemedia, setShowthemedia] = useState(false)

  //add emoji to input box
  const onEmojiClick = (event, emojiObject) => {
    setDatas((prevInput) => prevInput + event.emoji);
  };

  const navigate = useNavigate();
  // set data of input box to null
  const send_data = () => {
    if (datas != '') {
      conversation({ datas });
      setDatas('');
      setShowPicker(false);
    }

  }


  // enter key for sending msg
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      send_data();
    }
  };


  // base 64 data
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const size = convertSize(file.size)
    const extension = file.name.split('.')[1]
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const imageBase64 = reader.result;
        let type = file.type.split("/");
        let types = (type[0] === 'application' || type[0] === 'text' || type[0] === '') ? 'document' : type[0];
        let url = file.size > 20971520 ? await getURL({ name: file.name, file }) : imageBase64;
        conversation({ files: { url, type: types, name: file.name, extension, size } });
        setShowthemedia(false)
      };
      reader.readAsDataURL(file);
      event.target.files[0] = null;
      
    }
  };


  return (
    <div className='bottom-right-container' style={{ backgroundColor: data.rightBottom }}>
      <span className='emoji' onClick={() => setShowPicker((val) => !val)}><Emoji /></span>
      {showthemedia && <div className='type-icon-main-container'>
        <div className='type-icon-container'>
          <label for="file-input2"><FileIcon />Media </label>
          <label onClick={e=> navigate('/game')}><GameIcon />Start Game</label>
        </div>
      </div>}
      <label onClick={e => setShowthemedia(!showthemedia)} style={{ cursor: 'pointer', width: '35px' }}>
        <svg width="30" height="30" viewBox="0 0 24.01 24.01" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 1.714c5.68 0 10.286 4.605 10.286 10.286 0 5.68-4.605 10.286-10.286 10.286C6.32 22.286 1.714 17.68 1.714 12 1.714 6.32 6.32 1.714 12 1.714zm0 1.715a8.571 8.571 0 100 17.143 8.571 8.571 0 000-17.143zm0 3.428c.473 0 .857.384.857.857v3.429h3.429a.857.857 0 010 1.714h-3.429v3.429a.857.857 0 11-1.714 0v-3.429H7.714a.857.857 0 110-1.714h3.429V7.714c0-.473.384-.857.857-.857z" fill="CurrentColor"></path></svg>
      </label>
      <input type='file' id="file-input2" style={{ display: "none" }} onChange={handleImageUpload} onClick={(event) => { event.target.value = null }} />
      <div className='pickerStyle-container'> {showPicker && (
        <EmojiPicker onEmojiClick={onEmojiClick} />
      )}
      </div>
      <input type='text' onChange={e => setDatas(e.target.value)} onKeyDown={handleKeyDown} placeholder="Type Message..." value={datas} className='input-for-message' />
      <div className='send-msg-icon' onClick={send_data}>
        <svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" version="1.1" x="0px" y="0px" enable-background="new 0 0 24 24"><title>send</title><path fill="currentColor" d="M1.101,21.757L23.8,12.028L1.101,2.3l0.011,7.912l13.623,1.816L1.112,13.845 L1.101,21.757z"></path></svg>
      </div>
    </div>
  )
}


export default RightBottom;
