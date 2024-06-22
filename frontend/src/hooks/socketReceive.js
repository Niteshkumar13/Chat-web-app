import { usesocketIoContext } from '../context/socketIo';
import { selectedChat } from '../context/selectedChat';
import { useEffect} from 'react';
import { useAuth } from '../context/AuthUser'
const socketReceive = () => {
    const { data2, setdata2 } = selectedChat();
    const { socket } = usesocketIoContext();
    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            if (data2._id === newMessage.senderId) {
                setdata2({ ...data2, message: [...data2.message, newMessage] });
            }
        })
        return () => {
            socket?.off("newMessage");
        };
    }, [socket, setdata2.message, data2.message])
}
export const deleteMessageEvent = () => {
    const { data2, setdata2 } = selectedChat();
    const { socket } = usesocketIoContext();
    useEffect(() => {
        socket?.on('updateMessage', ({ messageId, senderId }) => {
            console.log({ messageId, senderId })
            if (data2._id === senderId) {
                setdata2((prevData2) => {
                    const messageIndex = prevData2.message.findIndex(item => item._id === messageId);
                    console.log(messageIndex)
                    if (messageIndex !== -1) {
                        return ({
                            ...prevData2,
                            message: prevData2.message.slice(0, messageIndex).concat(prevData2.message.slice(messageIndex + 1)),
                        });
                    }
                })
            }
        })
        return () => {
            socket?.off("updateMessage");
        };
    }, [data2.message])
}
export const messageSeen = () => {
    const { data2, setdata2 } = selectedChat();
    const { socket } = usesocketIoContext();
    const { authuser } = useAuth()
    useEffect(() => {
        if (data2.message.length) {
            const unseenMessageId = data2.message.filter(item => item.seen === false).map(item => item._id);
            const senderid = data2.message.filter(item => item.seen === false)[0]?.senderId;
            const receiverid = data2.message.filter(item => item.seen === false)[0]?.receiverId;
            if (authuser.id === receiverid) {
                if (data2._id === senderid) {
                    socket.emit("markSeen", { messageId: unseenMessageId, senderid });
                }
                
            }
        }
        return () => {
            socket?.off("markSeen");
        };
    }, [data2.message])
}
export const inChat = () => {
    const { data2 } = selectedChat();
    const { authuser } = useAuth()
    const { socket } = usesocketIoContext();
    useEffect(() => {
            const senderid = authuser.id
            const receiverid = data2._id;
            socket.emit("online", { senderid, receiverid });
        return () => {
            socket?.off("online");
        };
    }, [data2.message])
}
export default socketReceive
