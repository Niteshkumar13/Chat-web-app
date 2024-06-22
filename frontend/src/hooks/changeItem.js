const url = import.meta.env.VITE_APP_API_URL;
const changeItem = async ({ fullName, dp }) => {
    try {
        if (fullName && dp) {
            const response = await fetch(`${url}/change`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ fullName, profilePic:dp})
            });
            const data = await response.json();
            localStorage.setItem("demo-chat-user", JSON.stringify({ ...data, ...{ admin: true } }));
            location.reload();
        }
    }
    catch {

    }
}
const changeLocalStorage = async () => {
    const localUser = JSON.parse(localStorage.getItem('demo-chat-user'));
    const {email,fullName, profilePic,id} = localUser;
    try {
        if (fullName &&profilePic&&email&&id) {
            
            const response = await fetch(`${url}/change/changeLocalStorage`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({email,fullName, profilePic,id})
            });
            const data = await response.json();
            if(data.error){
                alert("invalid data")
                localStorage.removeItem("demo-chat-user");
                localStorage.removeItem("chat-theme");
                return location.reload();
            }
        }
        else{
            alert("invalid data")
            localStorage.removeItem("demo-chat-user");
            localStorage.removeItem("chat-theme");
            location.reload();
            
        }
    }
    catch {

    }
}
export {changeItem,changeLocalStorage};