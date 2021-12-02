import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";
import Home from "./components/Home/Home";
import Settings from "./components/Settings/Settings";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useState, useEffect, useRef } from 'react';
import AccountSettings from './components/Settings/SideBar/Pages/AccountSettings'
import ProfileEdit from './components/Settings/SideBar/Pages/ProfileEdit'
import Claim from './components/Settings/SideBar/Pages/Claim'
import Permission from './components/Settings/SideBar/Pages/Permissions';
import Notification from './components/Settings/SideBar/Pages/Notification';
import Privacy from './components/Settings/SideBar/Pages/Privacy';
import CreatePin from './components/createPin/CreatePin';
import Profile from './components/Profile/Profile';
import { Authcontext } from './components/Authentication/Authcontext';
import Login from './components/Authentication/Login/Login';
import Signup from './components/Authentication/Signup/Signup';
import Welcome from './components/Welcome/Welcome';
import axios from 'axios';
import R404 from './components/R404/R404';
// import PinView from './components/History/viewpins';
import PinView from './components/PinView/PinView';
import History from './components/History/History';
// import UserProfile from './components/Profile/UserProfile';
import PassingUserId from './components/Profile/PassingUserId';


const host = "http://localhost:8000";
const frontendhost = "http://localhost:3000"
const media = "http://localhost:8000"; 
// are we in production now ? no   <-- change this accordingly 
// localhost in dev and  "" in production
// const host = "https://removal-favor-overcome-vegetarian.trycloudflare.com";
// const frontendhost = "https://would-unnecessary-quiz-pe.trycloudflare.com"
// const media = "";

const path = "/accounts/api/v1";
localStorage.setItem("host", host);
localStorage.setItem("frontendhost", frontendhost);
localStorage.setItem("media", media);


function App() {

  const endpoint = "/profile";
  let appData = useRef({
    token:  localStorage.getItem("token"),
  })
  appData.current.isValid =  appData.current.token? true: false
  // let token = localStorage.getItem("token");
  // let isValid = token ? true : false;
  const [isUserLogedin, setisUserLogedin] = useState(appData.current.isValid);
  const [currentUser, setCurrentUser] = useState({});
  useEffect(() => {
      if (isUserLogedin){
        appData.current.isValid= true
        appData.current.token = localStorage.getItem('token')
  
        axios({
          method: 'GET',
          url: `${host}${path}${endpoint}`,
          headers: {
            'Content-Type': ' application/json',
            'Authorization': 'token '+ appData.current.token
          }
        }).then((response) => {
          setCurrentUser(response.data)
          try{
            localStorage.setItem("currentUserAvatarURL", response.data.avatar === null ? "" : response.data.avatar )
          }catch{}
        }).catch(err =>{
          if (err.response){
            console.log(err.response)
            appData.current.isValid = false
            appData.current.token = null
            localStorage.removeItem('token')
          }
        }).finally(()=>{
          setisUserLogedin(appData.current.isValid)
        })
      }
      else{
        setCurrentUser({})
        appData.current.isValid =false
        appData.current.token = null
        localStorage.removeItem('token')
      }
    }, [isUserLogedin])
  
  return (  



    <Router>
      <Authcontext.Provider
        value={{ isUserLogedin, setisUserLogedin, currentUser, host, media }}
      >
        <Navbar />
        <Routes>
          {isUserLogedin ? (
            <>
              <Route path='/' exact element={<Home />} />
              <Route path='/home' element={<Home />} />
              <Route path='/create' exact element={<CreatePin />} />
              <Route path='pin/:Id' element={<PinView />} />
              <Route path='user/:Id' element={<PassingUserId />} />
              <Route path='/settings' element={<Settings />}>
                <Route path='/settings/' element={<ProfileEdit />} />
                <Route
                  path='/settings/account-settings'
                  element={<AccountSettings />}
                />
                <Route path='/settings/claim' element={<Claim />} />
                <Route path='/settings/permissions' element={<Permission />} />
                <Route
                  path='/settings/notifications'
                  element={<Notification />}
                />
                <Route path='/settings/privacy' element={<Privacy />} />
              </Route>
              <Route path='/profile' element={<Profile />} />
              <Route path='/edit' element={<History />} />
            </>
          ) : (
            <>
              <Route path='/' exact element={<Welcome />} />
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
            </>
          )}
          <Route path='*' element={<R404 />}></Route>
        </Routes>
      </Authcontext.Provider>
    </Router>
  );
}

export default App;
