// import { useAuth } from '../context/AuthUser';
import { jwtDecode } from "jwt-decode";
const url = import.meta.env.VITE_APP_API_URL;
const signupHook = async ({ data, setAuthUser }) => {
    const { fullName, email, password } = data;
    try {
        if (fullName && email && password) {
            if(password.length < 8){
                return alert("password must be 8 characters long")
            }
            const response = await fetch(`${url}/auth/signup`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ fullName, email, password })
            });
            const data = await response.json();
            if (data.error) {
                alert(data.error);
                return;
            }
            setAuthUser({ ...data, ...{ admin: true } });
            localStorage.setItem("demo-chat-user", JSON.stringify({ ...data, ...{ admin: true } }));
        }
        else {
            return alert("All fiels are required")
        }

    }
    catch (e) {
        console.log("internal server error ");

    }
}
// login hooks 
const loginHook = async ({ data, setAuthUser }) => {
    const { email, password } = data;
    console.log(data)
    try {
        if (email && password) {
            const response = await fetch(`${url}/auth/login`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            if (data.error) {
                return alert(data.error)
            }
            console.log(data)
            localStorage.setItem("demo-chat-user", JSON.stringify({ ...data, ...{ admin: true } }));
            setAuthUser({ ...data, ...{ admin: true } });
        }
        else {
            return alert("All fiels are required")
        }

    }
    catch (e) {
        console.log("internal server error ");

    }
}
// logout hooks
const logout = async () => {
    console.log("it works")
    const res = await fetch(`${url}/auth/logout`, {
        method: 'POST',
        credentials: 'include'
    });
    if (res.ok) {
        const resData = await res.json();
        console.log(resData);
        localStorage.removeItem('demo-chat-user');
        localStorage.removeItem('chat-theme');
        window.location.reload();
        setAuthUser(null);

    } else {
        alert("internal server error ");
    }
    localStorage.removeItem('demo-chat-user');

}
// googel auth 
const googleLoginSuccess = async ({ credentialResponse, setAuthUser, type }) => {
    const decoded = jwtDecode(credentialResponse.credential);
    console.log(decoded)
    const fullName = decoded.name;
    const picture = decoded.picture;
    const password = decoded.sub;
    const email = decoded.email;
    if (type === "signup") {
        try {
            if (fullName && email && password) {
                const response = await fetch(`${url}/auth/signup`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify({ fullName, email, password,picture })
                });
                const data = await response.json();
                if (data.error) {
                    alert(data.error);
                    return;
                }
                setAuthUser({ ...data, ...{ admin: true } });
                localStorage.setItem("demo-chat-user", JSON.stringify({ ...data, ...{ admin: true } }));
            }
        }
        catch (e) {
            console.log("internal server error ");
        }
    }
    else if (type === "login") {
        loginHook({data:{email,password},setAuthUser})
    }
}


export { signupHook, loginHook, logout, googleLoginSuccess};
