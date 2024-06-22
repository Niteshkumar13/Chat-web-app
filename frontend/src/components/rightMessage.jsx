import React, { useEffect, useRef, lazy, Suspense, useState } from 'react';
import '../cssFile/rightMessage.css';
import Svg from './svg';
import DeletingTheMessage from '../hooks/deleteMessage';
const Document = lazy(() => import('./document'));
import { usesocketIoContext } from '../context/socketIo';
const Image = lazy(() => import('./image'));
const TextMessage = lazy(() => import('./textMessage'));
const Link = lazy(() => import('./Link'));
const Video = lazy(() => import('./video'));
const Audio = lazy(() => import('./audio'));
import getConversation from '../hooks/getConversation';
import { useUserContext } from '../context/themeContext';
import { selectedChat } from '../context/selectedChat';
import { convertTime, convertDate } from '../hooks/convertTime'
const NoMessage = lazy(() => import('./noMessage'));
const Loading = lazy(() => import('./loading'));
import socketReceive, { deleteMessageEvent,inChat,messageSeen } from '../hooks/socketReceive'
const RightMessage = () => {
  socketReceive();
  inChat();
  messageSeen();
  deleteMessageEvent();
  const { socket } = usesocketIoContext();
  const { deleteMessage } = DeletingTheMessage()
  const { data } = useUserContext();
  const { data2} = selectedChat();
  const [msgid,setMsgId] = useState([])
  const chatContainerRef = useRef(null);
  const { getconversation, loading } = getConversation();
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }



  // scroll to bottom when new page is reload
  useEffect(() => {

    scrollToBottom()
    if (data2?._id) {
      getconversation();
    }
  }, [data2._id]);
  // scroll to bottom when new  message is added 
  useEffect(() => {
    scrollToBottom()
  }, [data2.message])

  // deleting the message
  const handleDelete = ({ _id }) => {
    deleteMessage({ messageId: _id })
  }
  socket?.on("seeMessage", ({ messageId}) => {
    setMsgId(messageId)
})
  return (
    <div className='Message-container' style={{ backgroundColor: data.rightMessage }} ref={chatContainerRef}>
      <Suspense>
        {loading && <Loading />}
        {!loading && !data2.message.length && <NoMessage />}
        {data2.message.length != 'undefined' && !loading && (data2.message.map((item, index) => {
          const time = convertTime({ time: item.createdAt });
          const reverse = item.senderId != data2._id;
          const date = convertDate({ time: item.createdAt });
          const lastMessage = data2.message.length==index+1;
          const isLastDate = date != convertDate({ time:data2.message[index-1]?.createdAt});
          const isUserOnline = msgid.includes(item._id);
          if(isUserOnline){
            item.seen = true
          }
          return (
            <div style={{paddingBottom:lastMessage&&10}}>
             {isLastDate&& <div key={item._id+index} className='after-hover-property-of-main-container' style={{textAlign:'center',margin:'10px 0'}}><span style={{backgroundColor:'rgba(255, 255, 255, .95)',padding:'0 15px',borderRadius:'5px'}}>{date}</span></div>}
              {item?.message&& item.link === "false"  && <div key={item._id} className='after-hover-property-of-main-container' style={{ marginTop: '5px', display: 'flex', flexDirection: reverse && 'row-reverse', gap: '5px' }}><TextMessage text={item.message} time={time} admin={reverse} seen={item.seen} /><span className='three-dot' onClick={e => handleDelete({ _id: item._id })}>{reverse && <Svg />}</span></div>}
              {item?.image?.name != null && <div key={item._id} className='after-hover-property-of-main-container' style={{ marginTop: '5px', display: 'flex', flexDirection: reverse && 'row-reverse', gap: '5px' }}><Image image={item.image} time={time} admin={reverse} seen={item.seen} /><span className='three-dot' onClick={e => handleDelete({ _id: item._id })}>{reverse && <Svg />}</span></div>}
              {item?.video?.name != null && <div key={item._id} className='after-hover-property-of-main-container' style={{ marginTop: '5px', display: 'flex', flexDirection: reverse && 'row-reverse', gap: '5px' }}><Video videoLink={item.video.url} time={time} admin={reverse} seen={item.seen} /><span className='three-dot' onClick={e => handleDelete({ _id: item._id })}>{reverse && <Svg />}</span></div>}
              {item?.audio?.name != null && <div key={item._id} className='after-hover-property-of-main-container' style={{ marginTop: '5px', display: 'flex', flexDirection: reverse && 'row-reverse', gap: '5px' }}><Audio link={item.audio.url} time={time} admin={reverse} seen={item.seen} /><span className='three-dot' onClick={e => handleDelete({ _id: item._id })}>{reverse && <Svg />}</span></div>}
              {item?.document?.name != null && <div key={item._id} className='after-hover-property-of-main-container' style={{ marginTop: '5px', display: 'flex', flexDirection: reverse && 'row-reverse', gap: '5px' }}><Document data={item.document} time={time} admin={reverse} seen={item.seen} /><span className='three-dot' onClick={e => handleDelete({ _id: item._id })}>{reverse && <Svg />}</span></div>}
              {(item.link !== "false"&&item.link) && <div key={item._id} className='after-hover-property-of-main-container' style={{ marginTop: '5px', display: 'flex', flexDirection: reverse && 'row-reverse', gap: '5px' }}><Link link={item.link} time={time} admin={reverse} seen={item.seen} /><span className='three-dot' onClick={e => handleDelete({ _id: item._id })}>{reverse && <Svg />}</span></div>}
            </div>
          )
        })

        )
        }
      </Suspense>

    </div>
  )
}

export default RightMessage
