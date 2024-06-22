import React, { useState } from 'react';
import '../cssFile/profileViewer.css';
import StatusTypes from './statusTypes';
import { getURL } from '../firebase/firebase';
import { statusView } from '../hooks/convertSize';
import { addStatus, deleteStatus } from '../hooks/convertTime';
const Status = ({ status, showAndHide, admin }) => {
    const [seenUser, setSeenUser] = useState([]);
    const [showTheUser, setshowTheUser] = useState(null)
    // hook context for adding the status for admin user
    const [data, setDataForStatus] = useState({
        text: '',
        url: '',
        type: ''
    })

  
    const AddSeenUser = async () => {
            const x = await statusView();
            setSeenUser(x[0].status);
            setshowTheUser(true)
    }
    // adding the status for the admin user
    const addStatuss = () => {
      if(data.type){
        addStatus({ text: data.text, url: data.url, type: data.type })
      }
        
    }

    // add status either video and image and converts into base64 data
    const handleImageUploads = async (event) => {
        const file = event.target.files[0];
        const size_in_mb = file.size / (1024 * 1024);
        if (size_in_mb > 10) {
            return alert("please select file upto 10mb")
        }

        if (file) {
            alert("please wait few seconds");
            const url = await getURL({ name: file.name, file })
            setDataForStatus({ ...data, type: file.type.split("/")[0], url })

        }
    };

    return (
        <>
        {/* see the total number of user who has seen your staus */}
         {showTheUser && <div className='after-total-user-seen'>
            <div style={{display:'grid',placeItems:'center',backgroundColor:'#FFFFFF',paddingBottom:3}}>
                <div style={{display:'flex',alignItems:'center',gap:10,height:'40px',backgroundColor:'#25D366',color:'white',width:'300px',padding:'5px 5px'}}>
                <svg onClick={e=>setshowTheUser(false)} style={{marginLeft:'10'}} aria-label="Close" class="x1lliihq x1n2onr6 x5n08af"  height="34" role="img" viewBox="0 0 24 24" width="24"><title>Close</title><line  stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="21" x2="3" y1="3" y2="21"></line><line  stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="21" x2="3" y1="21" y2="3"></line></svg>
                <span style={{fontSize:20}}>Viewed by</span>
                </div>
                <div style={{maxHeight:300,minHeight:0,overflow:'auto'}}>
                    {seenUser?.userSeen?.map((item) => (<div className='User-profile-container' style={{marginLeft:0}}>
                        <img loading='lazy' src={item.profilePic} />
                        <div className='User-profile-container-name-last-message'>
                            <span className='name'>{item.fullName}</span>
                        </div>
                    </div>))}
                    </div>
                    </div>
                </div>}



       {/* show || add your status  */}
        <div className='profile-viewer' style={{ zIndex: 2}}>
            <div className='cross-icon-for-profile-viewer' onClick={showAndHide}>
                <svg aria-label="Close" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Close</title><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="21" x2="3" y1="3" y2="21"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="21" x2="3" y1="21" y2="3"></line></svg>
            </div>

            <div style={{ height: '100%' }}>
                {/* this is calling two times */}
                {status?.type != null && (<StatusTypes AddSeenUser={AddSeenUser} key={`a +${'dd'}}`} content={status} showSeen={true}/>)}
                {data.type && admin && <StatusTypes AddSeenUser={AddSeenUser} key={`b +${admin}`} content={data} showSeen={false}/>}
                {(status.type === null || status.type === 'undefined') && admin &&
                    <div className='input-file-select-add-icon'>
                        <label for="file-inputs" style={{ cursor: 'pointer', width: '35px' }}><svg viewBox="0 0 30 22" height="30px" preserveAspectRatio="xMidYMid meet" class="" fill="none"><title>attach-menu-plus</title><path fill-rule="evenodd" clip-rule="evenodd" d="M20.5 13.2501L20.5 10.7501L13.25 10.7501L13.25 3.5L10.75 3.5L10.75 10.7501L3.5 10.7501L3.5 13.2501L10.75 13.2501L10.75 20.5L13.25 20.5L13.25 13.2501L20.5 13.2501Z" fill="currentColor"></path></svg></label>
                        <input type='file' accept="image/*,video/*" id="file-inputs" style={{ display: 'none' }} onChange={handleImageUploads} />
                        <input className='text-input' type='text' placeholdser='Type message' value={data.text} onChange={e => setDataForStatus({ ...data, text: e.target.value, type: 'text' })} />
                        <button onClick={addStatuss} className='add-the-status'>add</button>

                    </div>}
               
                
                {admin && status.type != null &&
                    <div className='input-file-select-add-icon' style={{ justifyContent: 'space-between' }}>
                        <span className='delete-the-status'>Delete the status</span>
                        <button onClick={deleteStatus} className='delete-the-status-button'><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 100 100">
                            <path fill="#f37e98" d="M25,30l3.645,47.383C28.845,79.988,31.017,82,33.63,82h32.74c2.613,0,4.785-2.012,4.985-4.617L75,30"></path><path fill="#f15b6c" d="M65 38v35c0 1.65-1.35 3-3 3s-3-1.35-3-3V38c0-1.65 1.35-3 3-3S65 36.35 65 38zM53 38v35c0 1.65-1.35 3-3 3s-3-1.35-3-3V38c0-1.65 1.35-3 3-3S53 36.35 53 38zM41 38v35c0 1.65-1.35 3-3 3s-3-1.35-3-3V38c0-1.65 1.35-3 3-3S41 36.35 41 38zM77 24h-4l-1.835-3.058C70.442 19.737 69.14 19 67.735 19h-35.47c-1.405 0-2.707.737-3.43 1.942L27 24h-4c-1.657 0-3 1.343-3 3s1.343 3 3 3h54c1.657 0 3-1.343 3-3S78.657 24 77 24z"></path><path fill="#1f212b" d="M66.37 83H33.63c-3.116 0-5.744-2.434-5.982-5.54l-3.645-47.383 1.994-.154 3.645 47.384C29.801 79.378 31.553 81 33.63 81H66.37c2.077 0 3.829-1.622 3.988-3.692l3.645-47.385 1.994.154-3.645 47.384C72.113 80.566 69.485 83 66.37 83zM56 20c-.552 0-1-.447-1-1v-3c0-.552-.449-1-1-1h-8c-.551 0-1 .448-1 1v3c0 .553-.448 1-1 1s-1-.447-1-1v-3c0-1.654 1.346-3 3-3h8c1.654 0 3 1.346 3 3v3C57 19.553 56.552 20 56 20z"></path><path fill="#1f212b" d="M77,31H23c-2.206,0-4-1.794-4-4s1.794-4,4-4h3.434l1.543-2.572C28.875,18.931,30.518,18,32.265,18h35.471c1.747,0,3.389,0.931,4.287,2.428L73.566,23H77c2.206,0,4,1.794,4,4S79.206,31,77,31z M23,25c-1.103,0-2,0.897-2,2s0.897,2,2,2h54c1.103,0,2-0.897,2-2s-0.897-2-2-2h-4c-0.351,0-0.677-0.185-0.857-0.485l-1.835-3.058C69.769,20.559,68.783,20,67.735,20H32.265c-1.048,0-2.033,0.559-2.572,1.457l-1.835,3.058C27.677,24.815,27.351,25,27,25H23z"></path><path fill="#1f212b" d="M61.5 25h-36c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h36c.276 0 .5.224.5.5S61.776 25 61.5 25zM73.5 25h-5c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h5c.276 0 .5.224.5.5S73.776 25 73.5 25zM66.5 25h-2c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h2c.276 0 .5.224.5.5S66.776 25 66.5 25zM50 76c-1.654 0-3-1.346-3-3V38c0-1.654 1.346-3 3-3s3 1.346 3 3v25.5c0 .276-.224.5-.5.5S52 63.776 52 63.5V38c0-1.103-.897-2-2-2s-2 .897-2 2v35c0 1.103.897 2 2 2s2-.897 2-2v-3.5c0-.276.224-.5.5-.5s.5.224.5.5V73C53 74.654 51.654 76 50 76zM62 76c-1.654 0-3-1.346-3-3V47.5c0-.276.224-.5.5-.5s.5.224.5.5V73c0 1.103.897 2 2 2s2-.897 2-2V38c0-1.103-.897-2-2-2s-2 .897-2 2v1.5c0 .276-.224.5-.5.5S59 39.776 59 39.5V38c0-1.654 1.346-3 3-3s3 1.346 3 3v35C65 74.654 63.654 76 62 76z"></path><path fill="#1f212b" d="M59.5 45c-.276 0-.5-.224-.5-.5v-2c0-.276.224-.5.5-.5s.5.224.5.5v2C60 44.776 59.776 45 59.5 45zM38 76c-1.654 0-3-1.346-3-3V38c0-1.654 1.346-3 3-3s3 1.346 3 3v35C41 74.654 39.654 76 38 76zM38 36c-1.103 0-2 .897-2 2v35c0 1.103.897 2 2 2s2-.897 2-2V38C40 36.897 39.103 36 38 36z"></path>
                        </svg></button>
                    </div>
                }

            </div>
        </div>
        </>
    )
}

export default Status;
