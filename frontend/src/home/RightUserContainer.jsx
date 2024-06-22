import React from 'react'
import RightTopName from '../components/rightTopName';
import '../cssFile/RightuserContainer.css'
import RightMessage from '../components/rightMessage'
import RightBottom  from '../components/rightBottom';
const RightUserContainer = () => {

  return (
    <div className='Right-container'>
        <RightTopName />
        <RightMessage />
        <RightBottom />
    </div>
  )
}

export default RightUserContainer;
