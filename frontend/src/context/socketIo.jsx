import React, { createContext, useContext, useEffect, useState } from "react"
import { useAuth } from './AuthUser';
import  io  from 'socket.io-client'
export const SocketIo = createContext()
export const usesocketIoContext = () => {
    return useContext(SocketIo);
}

const SocketIoProvider = ({ children }) => {
    const [socket, setSocket] = useState();
    const [onlineUser, setOnlineUser] = useState([])
    const { authuser } = useAuth();
    useEffect(() => {
        if (authuser) {
            const socket = io(import.meta.env.VITE_APP_API_URL, {
                query: {
                    userId: authuser.id
                }
            });
            setSocket(socket);
            socket.on("getOnlineUsers", (users) => {
                setOnlineUser(users)
            })
        return ()=>socket?.close()
        }
        else {
            if (socket) {
                socket.close()
                setSocket(null)
            }
        }

    }, [authuser?.id])
    return (
        <SocketIo.Provider value={{ socket, onlineUser }}>
            {children}
        </SocketIo.Provider>
    )
}

export default SocketIoProvider
