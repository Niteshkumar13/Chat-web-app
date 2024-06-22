const convertSize = (fileSizeInBytes) => {
        const fileSizeInKB = fileSizeInBytes / 1024;
        const fileSizeInMB = fileSizeInKB / 1024;
        const fileSizeInGB = fileSizeInMB / 1024;
        let size;
        if (fileSizeInKB <= 1024) {
          size = (Math.round(fileSizeInKB) < 1 ? 1 : Math.round(fileSizeInKB)) + 'kb';
        }
        else if (fileSizeInMB <= 1024) {
          size = Math.round(fileSizeInMB) + 'Mb';
        }
        else if (fileSizeInGB <= 1024) {
          size = Math.round(fileSizeInGB) + 'Gb';
        }
        return size;
      
}
const url = import.meta.env.VITE_APP_API_URL;
export const searchUser = async (search) => {
  try{
    const response = await fetch(`${url}/users?search=${search}`,{
      method: 'GET',
      credentials: 'include',
    });
    const data = await response.json();
    if(data.error || !data){
      alert("Something went  wrong!");
      return console.log("Something went  wrong!");
    }
    return  data;
  }
  catch(e){
    console.log("error "+e);
    alert("Something went wrong")
  }
  
} 
export const statusView = async ()=>{
  try{
    const response = await fetch(`${url}/users/statusView`,{
      method: 'GET',
      credentials: 'include',
    });
    const data = await response.json();
    if(data.error || !data){
      alert("Something went  wrong!");
      return console.log("Something went  wrong!");
    }
    return data;
  }
  catch(e){
    console.log("error "+e);
    alert("Something went wrong")
  }
}
export default convertSize
