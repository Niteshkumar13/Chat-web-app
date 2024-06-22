import {createContext,useContext,useState} from 'react'

export const UserContext = createContext();


export const useUserContext = ()=>{
  return useContext(UserContext);
}
const ThemeContext = ({children}) => {
  const {leftBg,rightTop,rightMessage,rightBottom,image,beforeColor} = JSON.parse(localStorage.getItem('chat-theme'))||{};
  const [data,setdata] = useState({
    leftBg:leftBg||'#F9F7F3',
    rightTop:rightTop||'#f0f2f5',
    rightMessage:rightMessage||'#e3d1b4',
    rightBottom: rightBottom||'#f0f2f5',
    image:image||'https://cdn-icons-png.freepik.com/512/6714/6714978.png',
    beforeColor:beforeColor||'#E5E5E5'
  }); 
  return (
   <UserContext.Provider value={{data,setdata}}>
    {children}
   </UserContext.Provider>
  )
}

export default ThemeContext

