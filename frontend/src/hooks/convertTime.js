const apiUrl = import.meta.env.VITE_APP_API_URL;
const convertTime = ({time}) => {
    const dateObject = time.split(" ");
    const hr = dateObject[1].split(":")[0];
    const sec = dateObject[1].split(":")[1]
    return `${hr}:${sec} ${dateObject[2]}`;
}
const convertDate = ({time})=> {
    const dateObject = time?.split(", ")[0].split("/") || "";
    const day =  dateObject[1];
    const mont =  dateObject[0];
    const year =  dateObject[2];
    return `${day}/${mont}/${year}`
  }
const addStatus = async({type,url,text})=>{
    try{
       
        const response = await fetch(`${apiUrl}/change/addStatus`,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({type,url,text})
        })
        const  data = await response.json();
        if (data.error) throw new Error(data.error);
        localStorage.setItem("demo-chat-user", JSON.stringify({ ...data, ...{ admin: true } }));
        location.reload();
    }
    catch (e){
        alert('Something went wrong');
        console.log(e.message);
    }
}
const deleteStatus = async({type,url,text})=>{
    try{
       
        const response = await fetch(`${apiUrl}/change/deleteStatus`,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        })
        const  data = await response.json();
        if (data.error) throw new Error(data.error);
        localStorage.setItem("demo-chat-user", JSON.stringify({ ...data, ...{ admin: true } }));
        location.reload();
    }
    catch (e){
        alert('Something went wrong');
        console.log(e.message);
    }
}
export {convertTime,addStatus,deleteStatus,convertDate} ;
