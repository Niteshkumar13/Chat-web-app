import { useState} from 'react'
import { selectedChat } from '../context/selectedChat'
const url = import.meta.env.VITE_APP_API_URL;
const getConversation = () => {
    const { data2, setdata2 } = selectedChat();
    const [loading, setLoading] = useState(false);
    const linkRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    const conversation = async ({ files, datas }) => {
        const type = files?.type;
        const document = type === "document" ? files : false;
        const audio = type === "audio" ? files : false;
        const video = type === "video" ? files : false;
        const image = type === "image" ? files :false;
        try {
            const response = await fetch(`${url}/api/messages/send/${data2?._id}`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify({
                    message: (datas&&!linkRegex.test(datas.trim()))&&datas.trim(),
                    document,
                    audio,
                    video,
                    image,
                    link: (datas&&linkRegex.test(datas.trim()))?datas:false,
                })

            });
            const data = await response.json();
            if (data.error) throw new Error(data.error);
            await setdata2({ ...data2, message: [...data2.message, data] });

        }
        catch(e) {
            alert("internal server error")
            console.log(e.message)
        }
    }
    const getconversation = async () => {
      
        setLoading(true);
        try {
         
            const response = await fetch(`${url}/api/messages/${data2?._id}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include'
            });
            const data = await response.json()
            if (data.error) throw new Error(data.error);
            await setdata2({ ...data2, message: [...data]});
            
        }
        catch (e) {
            alert("internal server error")
            console.log(e.message)
        }
        finally {
            setLoading(false);
        }
    }
    return { conversation, getconversation, loading, data2 }
}

export default getConversation
