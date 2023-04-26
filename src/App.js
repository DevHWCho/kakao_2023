import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Friends from './routes/Friends';
import Chats from './routes/Chats';
import Find from './routes/Find';
import More from './routes/More';
import Profile from './routes/Profile';
import Chatting from './routes/Chatting';
import profile from './data/profiles.json';
import myProfile from './data/myProfile.json';
import Auth from './routes/Auth';
import { onAuthStateChanged } from 'firebase/auth';
import { authService } from './fireB';
import MyProfile from './components/MyProfile';


function App() {
  // const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  console.log('authService.currentUser ->',authService.currentUser) 

  const [userObj, setUserObj] = useState(null);
  // console.log("userObj->",userObj)

  useEffect(() => {// 
    onAuthStateChanged(authService, (user) => {
      // console.log('user->',user);
      if (user) {
        setIsLoggedIn(user);
        setUserObj(user);
       
      } else {
        setIsLoggedIn(false)
      }
      // setInit(true);
    });
  },[]);
  
  return (
   <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Routes>
      {isLoggedIn ? (
        <>
        <Route path='/' element={<Friends profile= {profile} userObj={userObj} />} />
        <Route path='/chats' element={<Chats profile={profile} userObj={userObj} myProfile={myProfile} />} />
        <Route path='/find' element={<Find />} />
        <Route path='/more' element={<More userObj={userObj} />} />
        {profile.map((prof) => (
              <Route
                key={prof.id}
                path={`/profile/${prof.id}`} 
                element={<Profile profId={prof.id} profName={prof.name} profPhoto={prof.photo} profEmail={prof.email} profBack={prof.background} />}
              />
            ))}
        <Route path='/myprofile' element={<MyProfile userObj={userObj} />} />
        {profile.map((prof) => (
              <Route
                key={prof.id}
                path={`/chatting/${prof.id}`}
                element={<Chatting userObj={userObj} profId={prof.id} profName={prof.name} profPhoto={prof.photo} profEmail={prof.email} profBack={prof.background} />}
              />
            ))}
        </>
      ) : (
        <Route path='/' element={<Auth />} />
      )}
    </Routes>
   </BrowserRouter>
  );
}

export default App;
