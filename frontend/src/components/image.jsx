import React, { useState } from 'react';
import Preview from './imagePreview';
import { Seen } from './svg';
const Image = ({ image, time,index,admin,seen }) => {
    const { url,name } = image;
    const[show,setshow] = useState(false)
    const shows = ()=>{
        setshow(!show)
    }
    return (
        <>
            {show&&<Preview url={url} name={name} show={shows} key={index}/>}
            <div className='image-container-for-user'>
                <div style={{ position: 'relative' }}>
                    <div className='image-for-user' onClick={shows}>
                        <img src={url} loading='lazy' alt="User Post" />
                    </div>
                    <div className='time'>{admin&&<Seen seen={seen}/>}<span style={{ marginRight: '5px' }}>{time}</span></div>
                </div>
            </div>
        </>
    )
}

export default Image;
