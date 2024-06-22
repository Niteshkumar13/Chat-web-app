import React, { createContext, useContext,useState } from 'react'
import {changeLocalStorage} from '../hooks/changeItem';
export const AuthUser = createContext(null);
export const useAuth = () =>{ return useContext(AuthUser)};

const AuthUserContext = ({ children }) => {
    const localUser = JSON.parse(localStorage.getItem('demo-chat-user'));
    window.addEventListener('storage',changeLocalStorage)
    const [authuser, setAuthUser] = useState(localUser || null)
    return (
        <AuthUser.Provider value={{ authuser, setAuthUser }}>
            {children}
        </AuthUser.Provider>
    )
}

export default AuthUserContext;
