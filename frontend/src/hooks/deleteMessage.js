const url = import.meta.env.VITE_APP_API_URL;
import { selectedChat } from '../context/selectedChat';
const DeletingTheMessage = () => {
  const { data2, setdata2 } = selectedChat();
  const deleteMessage = async ({ messageId }) => {

    try {
      const response = await fetch(`${url}/change/deleteMessage/${data2._id}`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ messageId }),
        credentials: 'include'
      });
      const data = await response.json();
      if (data.error) {
        return alert(data.error);
      }
      setdata2((prevData2) => {
        const messageIndex = prevData2.message.findIndex(item => item._id === messageId);
        if (messageIndex !== -1) {
            return ({
                ...prevData2,
                message: prevData2.message.slice(0, messageIndex).concat(prevData2.message.slice(messageIndex + 1)),
            });
        }
    })
        
      
      
    }
    
    catch (e) {
      alert("something went wrong");
      console.log("Error: ", e.message);
    }
  }
  return { deleteMessage }
}
export default DeletingTheMessage
