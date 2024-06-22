import React from 'react'
import '../cssFile/userProfile.css';
import { selectedChat } from '../context/selectedChat';
import { useSelectUserId } from '../context/userInfoContext';
import { usesocketIoContext } from '../context/socketIo'
const UserProfile = ({ userData, chnage_show,lastMessage }) => {
  const { setdata4 } = useSelectUserId()
  const { onlineUser } = usesocketIoContext()
  const chhange_user_info = () => {
    
    setdata4(userData)
    chnage_show();
  }
  const { data2, setdata2 } = selectedChat();

  // prevent from clicking again on profile
  const changeRight = () => {
    if (data2?._id != userData._id) {
      setdata2({ fullName: userData.fullName, profilePic: userData.profilePic, _id: userData._id, message: [], status: userData?.status })
    }
  }

  const isUserOnline = onlineUser.includes(userData._id);
  return (
    <div className='User-profile-container' onClick={e => changeRight()} style={{ backgroundColor: (data2?._id === userData?._id) && '#334560' }}>
      {isUserOnline && <div className='online'></div>}
      <img loading='lazy' style={{ outline: userData?.status?.type && '3px solid #a855f7' }} src={userData.profilePic} onClick={chhange_user_info} />
      <div className='User-profile-container-name-last-message'>
        <span className='name'>{userData.fullName}</span>
        {lastMessage !== "false"&&<span className='last-message'>{lastMessage}</span>}
      </div>
      <span className='rocket'>🚀</span>
    </div>
  )
}

export default UserProfile;
