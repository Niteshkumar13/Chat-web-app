import React from 'react';
import { Seen } from './svg';
const Document = ({ data, time,admin,seen }) => {
  return (
    <div className='document-container'>
      <div className='document-section'>
        <img src='https://icones.pro/wp-content/uploads/2021/06/icone-fichier-document-orange.png' draggable="flase" />
        <div className='name-and-size'>
          <span className='name'>{data.name}</span>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 'max-content', gap: '10px' }}>
            <span className='size'>• {data.size}</span>
            <span className='size'>• {data.extension}</span>
            {admin&&<span className='size'>• <Seen seen={seen}/></span>}
          </div>
        </div>
        <div style={{display:'grid',height:'50px',width:'max-content',placeItems:'center',gap:'5px'}}>
        <a href={data.url} download={`${data.name}`} style={{height:'30px'}}>
          <img style={{objectFit:'cover',height:'30px'}}  src='https://static.thenounproject.com/png/3554029-200.png' draggable="flase" />
        </a>
        <span className='time-for-document'>{time}</span>
      </div>
      </div>
      
    </div>
  )
}

export default Document;
