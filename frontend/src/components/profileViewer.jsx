import React, { useState,useRef } from 'react';
import '../cssFile/profileViewer.css';
import {logout} from '../hooks/authHook'
import myImage from '../image/logout.png';
import {changeItem} from '../hooks/changeItem';
import { useSelectUserId  } from '../context/userInfoContext';
import Status from './status';
import { Check, Pencil } from './svg';
const ProfileViewer = ({chnage_show}) => {
  const profileViewer = useRef(null)
  const {data4} = useSelectUserId();
  const [change,setChange] = useState(false);
  const[status,setStatus] = useState(false)
  const [dp,chnageDp] = useState(data4?.admin&&data4?.profilePic)
  const [name,setName] = useState(data4?.fullName);
  const userOriginalName = data4?.admin&&data4?.fullName;
  const userOriginalPic = data4?.admin&&data4?.profilePic
  const chnage_name = ()=>{
    setChange(!change)
  }
  const showStatus = ()=>{
    setStatus(!status)
    if (status === false){
      if(data4?.status.type!=null){
        profileViewer.current.style.display='none'
      }
      else if(data4?.status.type===null &&data4?.admin ===true){
        profileViewer.current.style.display='none'
      }
       
    }
    else{
      profileViewer.current.style.display='flex'
    }
    
  }

  

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageBase64 = reader.result;
        chnageDp(imageBase64);
      };
      reader.readAsDataURL(file);
    }
  };

  const dpWill = ()=>{
    setChange(false)
    if(userOriginalName != name || userOriginalPic != dp){
      return changeItem({fullName:name,dp})
    }
    
    alert("everything is same");
    
  }
  return (
    <>
    {(data4?.status?.type!=null||data4?.admin)&&status&&<Status admin={data4?.admin} status={data4?.status} showAndHide={showStatus}/>}
    <div className='profile-viewer' ref={profileViewer}>
      <div className='cross-icon-for-profile-viewer' style={{marginTop:'5px'}} onClick={chnage_show}>
      <svg aria-label="Close"  fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Close</title><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="21" x2="3" y1="3" y2="21"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="21" x2="3" y1="21" y2="3"></line></svg>
      </div>
     <div className='top-for-profile-viewer'>
        <img onClick={showStatus} src={data4?.admin?dp:data4?.profilePic}/>
        <div className='name-email-profile-viewer' style={{marginTop:'20px'}}>
        {!change&&<div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}><span className='common_class'>• {name}</span>{data4?.admin&&<button onClick={chnage_name} style={{padding:'5px',marginRight:5,border:'none',background:'none'}}><Pencil/></button>}</div>}
            {data4.admin&&change&&<span className='common_class'><input type="text" cl value={name} onChange={e=>change&&setName(e.target.value)}  className='change-name-profile-viewer'/><button onClick={chnage_name} style={{padding:'5px',marginRight:5,border:'none',background:'none'}}><Check/></button></span>}
        </div>
        <div className='name-email-profile-viewer'>
            <span  style={{width:'300px'}}>• {data4?.email}</span>
        </div>
        {data4?.admin&&<><div className='name-email-profile-viewer' style={{display:'flex',justifyContent:'space-between'}}>
          <label for='file-input' style={{paddingLeft:'15px',cursor:'pointer'}}>• change Picture</label>
          <input type='file' id="file-input" style={{display:'none'}} accept="image/*" onChange={ handleImageUpload }/>
        </div>
        <button onClick={dpWill} style={{width:'100%',fontSize:'20px',padding:'5px 0',borderRadius:'5px'}}>Change</button>
        </>}
     </div>
    {data4?.admin&&<div className='bottom-for-profile-viewer'>
        <span>logout</span>
        <img onClick={logout} src={myImage} className='logout-image'/>
     </div>}
    </div>
    </>
  )
}

export default ProfileViewer;
