import React, { useState } from 'react';
import '../cssFile/rightTopName.css';
import { selectedChat } from '../context/selectedChat';
import { useUserContext } from '../context/themeContext';
const RightTopName = () => {
  const { data, setdata } = useUserContext();
  const { data2 } = selectedChat();
  const change_theme = (e) => {
    if (data.image === 'https://cdn-icons-png.freepik.com/512/6714/6714978.png') {
      setdata({
        ...data, leftBg: '#6B7280',
        rightTop: '#374151',
        rightMessage: 'rgb(51, 65, 85)',
        rightBottom: '#374151',
        image: 'https://png.pngtree.com/png-clipart/20190517/original/pngtree-vector-sun-icon-png-image_4224147.jpg',
        beforeColor:'#575e6c'
      });
      localStorage.setItem("chat-theme",JSON.stringify({
        ...data, leftBg: '#6B7280',
        rightTop: '#374151',
        rightMessage: 'rgb(51, 65, 85)',
        rightBottom: '#374151',
        image: 'https://png.pngtree.com/png-clipart/20190517/original/pngtree-vector-sun-icon-png-image_4224147.jpg',
        beforeColor:'#575e6c'
      }))
    }
    else {
      setdata({
        ...data,
        leftBg: '#F9F7F3',
        rightTop: '#f0f2f5',
        rightMessage: '#e3d1b4',
        rightBottom: '#f0f2f5',
        image: 'https://cdn-icons-png.freepik.com/512/6714/6714978.png',
        beforeColor:'#E5E5E5'
      });
      localStorage.setItem("chat-theme",JSON.stringify({
        ...data,
        leftBg: '#F9F7F3',
        rightTop: '#f0f2f5',
        rightMessage: '#e3d1b4',
        rightBottom: '#f0f2f5',
        image: 'https://cdn-icons-png.freepik.com/512/6714/6714978.png',
        beforeColor:'#E5E5E5'
      }))
    }
  }
  return (
    <div className='right-top-container' style={{ backgroundColor: data.rightTop }}>
      <div style={{ display: 'flex', alignItems: 'center', marginLeft: '20px', gap: '10px' }}>
        <img src={data2.profilePic} className='profile-pic-for-right' alt="Profile Picture" />
        <span className="name" style={{ color: data.rightTop === '#374151' && 'white' }}>{data2.fullName}</span>

      </div>
      <div style={{ marginRight: '15px' }}>
        <img onClick={change_theme} src={data.image} className='dark-light-mood' />
      </div>
    </div>
  )
}

export default RightTopName