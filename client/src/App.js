import React, { useEffect } from 'react';
import Register from './components/Register';
import Login from './components/Login';
import Logout from './components/Logout';
import "./App.css";
import { useState } from 'react';

const fetch = require('node-fetch');

function App() {

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
      <Register loggedIn = { isLoggedIn } changeLoginStateCB = { changeLoginStateCB }>
	  </Register>
      <Login loggedIn = { isLoggedIn } changeLoginStateCB = { changeLoginStateCB }>
	  </Login>
	  <Logout loggedIn = { isLoggedIn } changeLoginStateCB = { changeLoginStateCB }>
	  </Logout>
	</>
  );
}

export default App;
