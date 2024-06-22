import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './index.css';
import ThemeContext from './context/themeContext.jsx';
import SelectedChat from './context/selectedChat.jsx';
import AuthUserContextext from './context/AuthUser.jsx';
import UserInfoContext from './context/userInfoContext.jsx';
import SocketIoProvider from './context/socketIo.jsx'
import GameContextProvider from './context/gameContext.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeContext>
      <SelectedChat>
        <AuthUserContextext>
          <UserInfoContext>
            <GoogleOAuthProvider clientId="748402825183-fblvvikkna0aur9cltvrds329ralamdc.apps.googleusercontent.com">
              <SocketIoProvider>
                <GameContextProvider>
                  <App />
                </GameContextProvider>
              </SocketIoProvider>
            </GoogleOAuthProvider>
          </UserInfoContext>
        </AuthUserContextext>
      </SelectedChat>
    </ThemeContext>
  </React.StrictMode>
)
