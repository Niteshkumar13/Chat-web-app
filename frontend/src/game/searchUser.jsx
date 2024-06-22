import React, { useEffect, useState } from 'react'
import '../cssFile/game.css';
import RequestUser from './requestUser';
import { useAuth } from '../context/AuthUser'
const SearchUser = () => {
  const url = import.meta.env.VITE_APP_API_URL;
  const [user, setUser] = useState([]);
  const[text,setTxt] = useState('')
  const { authuser } = useAuth();
  const [sentinvite,setsentinvite] = useState([])
  const updateSent = ({_id})=>{
    if(!sentinvite.includes(_id)){
      setsentinvite((prevSentinvite) => [...prevSentinvite, _id]);
    }
  }
  useEffect(() => {
    const fetch_data = async () => {
      const res = await fetch(`${url}/users/chatData`, {
        method: 'GET',
        credentials: 'include'
      });
      if (res.ok) {
        const resData = await res.json();
        setUser(resData);
      } else {
        alert("internal server error ");
      }
    }
    fetch_data()
  }, []);
  return (
    <div className='search-user-for-game'>
      <input type='text' placeholder='Search user' onChange={e=>setTxt(e.target.value)} value={text}/>
      <div className='name-image-for'>
        {user && user.map((item, index) => (
          <div key={index}>
           {item?.participants?.filter((item) => {
                  return text.toLowerCase() == '' ? item : item.fullName.toLowerCase().includes(text.toLowerCase())
                }).map((data, index) => {
              if (data._id === authuser.id) return;
              return (
                <RequestUser key={index} userData={data} updateSent={updateSent} sentinvite={sentinvite}/>
              )
            })
            }
          </div>
        ))}
      
      </div>
    </div>
  )
}

export default SearchUser
