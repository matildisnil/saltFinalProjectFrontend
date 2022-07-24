import React, { useEffect } from 'react';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Logout from './components/Logout/Logout';
import Header from './components/Header/Header'
import "./App.css";
import { useState } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import HobbyBoard from './components/HobbyBoard/HobbyBoard';
import { toggleLoggedIn } from './redux/logSlice';
import HobbyCard from './components/HobbyCard/HobbyCard'
import HobbyPage from './components/HobbyPage/HobbyPage';
import REACT_APP_PATH_TO_SERVER from './environment';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetch(`${REACT_APP_PATH_TO_SERVER}/login`, {credentials: 'include'})
    .then(response => response.json())
    .then(data => {
      if (data.loggedIn === true) {
        setIsLoggedIn(data.user);
      }
    });
  });

  const changeLoginStateCB = (newState) => {
    setIsLoggedIn(newState);
  };
  
  return (
    <>
      <Header loggedIn = { isLoggedIn } changeLoginStateCB = { changeLoginStateCB }/>
      <Routes>
        <Route path="/" element={ <Login loggedIn = { isLoggedIn } changeLoginStateCB = { changeLoginStateCB } />} />
        <Route path="register" element={ <Register loggedIn = { isLoggedIn } changeLoginStateCB = { changeLoginStateCB } />} />
        <Route path="hobbies" element={ <HobbyBoard loggedIn = { isLoggedIn } changeLoginStateCB = { changeLoginStateCB } />} />
        <Route path='hobbies/:hobbyParam' element={ <HobbyPage loggedIn = { isLoggedIn } changeLoginStateCB = { changeLoginStateCB } />} />
        <Route path="logout" element={ <Logout loggedIn = { isLoggedIn } changeLoginStateCB = { changeLoginStateCB } />} />
      </Routes>
	 </>
  );
}


export default App;
