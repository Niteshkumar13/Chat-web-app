import React from 'react';
import '../cssFile/rightMessage.css';
import { Seen } from './svg';
const TextMessage = ({text,time,admin,seen}) => {
    return (
        <div className='text-message-user-info'>
            <div className='child-text-message-user-info'>
                <span className='Message'>{text}</span>
                <div className='time-for-text'><span className='time'>{time}</span>{admin&&<Seen seen={seen}/>}
                </div>
            </div>
        </div>
    )
}
export default TextMessage;