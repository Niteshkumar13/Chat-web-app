import React, { lazy, Suspense} from 'react'
import './App.css'
const Login = lazy(() => import('./auth/login'));
const Signup = lazy(() => import('./auth/signup'));
import LeftUserContainer from './home/leftUserContainer';
import RightUserContainer from './home/RightUserContainer';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { selectedChat } from './context/selectedChat'
import BeforeSelectChat from './components/beforeSelectChat'
import { useAuth } from './context/AuthUser';
import Notification from './game/notification';
import Game from './game/game';
import { useGameContext } from './context/gameContext';
function App() {
  const { data2 } = selectedChat();
  const { authuser } = useAuth();
  const {game} = useGameContext()
  return (
    <div className='container'>
      <Suspense>
        <Router>
        {authuser&&game.opponent.name=== null&&<Notification/>}
          <Routes>
            <Route path="/" element={authuser ? <Navigate to="/home" /> : <Login />} />
            <Route path="/signup" element={!authuser ? <Signup /> : <Navigate to="/home" />} />
            <Route path="/home" element={authuser ?
              <div className=' message-for-container'>
                <LeftUserContainer />
                {data2?.fullName ? <RightUserContainer /> : <BeforeSelectChat />}
              </div> : <Navigate to="/" />} />
             <Route path="/game" element={authuser?<Game/>:<Navigate to="/" />}/>
          </Routes>
        </Router>
      </Suspense>
    </div>
  )
}

export default App
