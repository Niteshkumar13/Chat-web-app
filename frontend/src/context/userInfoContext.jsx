import React,{useContext,createContext,useState} from 'react'
export const SelectUserId = createContext(null);

export const useSelectUserId = ()=>{
    return useContext(SelectUserId);
  }
const UserInfoContext = ({children}) => {
    const [data4,setdata4] = useState();
  return (
    <SelectUserId.Provider value={{data4,setdata4}}>
    {children}
   </SelectUserId.Provider>
  )
}

export default UserInfoContext
