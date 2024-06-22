import React, { useEffect, useRef} from 'react';
import '../cssFile/profileViewer.css';
import { useSelectUserId } from '../context/userInfoContext';
import { usesocketIoContext } from '../context/socketIo';
import { useAuth } from '../context/AuthUser';
import { SeenStatus } from './svg';
const StatusTypes = ({ content, AddSeenUser, showSeen }) => {
    const { data4 } = useSelectUserId();
    const { socket } = usesocketIoContext();
    const { authuser } = useAuth()
    const prevData4IdRef = useRef(null);
    useEffect(() => {
        const callAtOnce = async () => {
            if (data4.id !== authuser.id && data4.id !== prevData4IdRef.current) {
                console.log("this is calling two times")
                socket.emit("seenStatus", { Adder: data4._id, seen: authuser.id });
            }
            prevData4IdRef.current = data4.id;
            return () => {
                socket.off("seenStatus", { Adder: data4._id, seen: authuser.id });
            };
        }
        callAtOnce()
    }, [data4.id])
    return (
        <div className='status-container'>
            {content.type === 'image' && <img src={content.url} />}
            {content.type === 'video' && <video className='status-video' autoPlay controls controlslist="nofullscreen nodownload  noplaybackrate"><source src={content.url} /></video>}
            {content.type == 'text' && <span style={{ textAlign: 'center' }}>{content.text}</span>}
            {showSeen && data4?.admin && <div onClick={AddSeenUser} style={{ display: 'flex', gap: '10px' }}><SeenStatus /></div>}
        </div>
    )
}

export default StatusTypes
