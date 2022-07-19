import React, { useEffect } from 'react';
import Register from './components/Register';
import Login from './components/Login';
import Logout from './components/Logout';
import "./App.css";
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import HobbyBoard from './components/HobbyBoard';
import { toggleStatus } from './redux/logSlice';
import { useDispatch, useSelector } from 'react-redux';



// const fetch = require('node-fetch');

function App() {
  const showState = state => state;

  const something = useSelector(showState);
  console.log(something, 'beforetoggle');
  const dispatch = useDispatch();
  dispatch(toggleStatus);
  console.log(useSelector(showState), 'aftertoggle');


  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_PATH_TO_SERVER}/login`, {credentials: 'include'})
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
      <Routes>
        <Route path="/" element={ <Login loggedIn = { isLoggedIn } changeLoginStateCB = { changeLoginStateCB } />} />
        <Route path="register" element={ <Register loggedIn = { isLoggedIn } changeLoginStateCB = { changeLoginStateCB } />} />
        <Route path="hobbies" element={ <HobbyBoard loggedIn = { isLoggedIn } changeLoginStateCB = { changeLoginStateCB } />} /> 
        <Route path="logout" element={ <Logout loggedIn = { isLoggedIn } changeLoginStateCB = { changeLoginStateCB } />} />
      </Routes>
	 </>
  );
}

export default App;
