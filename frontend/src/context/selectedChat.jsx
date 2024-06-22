import {createContext,useContext,useState} from 'react'

export const SelectedConversation = createContext(null);


export const selectedChat = ()=>{
  return useContext(SelectedConversation);
}
const SelectedChat = ({children}) => {
  const [data2,setdata2] = useState({
      fullName:'',
      profilePic:'',
      _id:'',
      message:[null],
      status:[]
  });
  return (
   <SelectedConversation.Provider value={{data2,setdata2}}>
    {children}
   </SelectedConversation.Provider>
  )
}

export default SelectedChat;