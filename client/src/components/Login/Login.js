import fetch from 'node-fetch';
import { useState } from 'react';
import Logout from '../Logout/Logout';
import "./Login.css";

const Login = props => {
	
    const [errorMessage, setErrorMessage] = useState('');

    const submitLogin = event => {

      const formData = JSON.stringify({
        name: event.target.childNodes[0].value,
        password: event.target.childNodes[1].value
      });

      event.preventDefault();
      fetch(`${process.env.REACT_APP_PATH_TO_SERVER}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: formData,
    	  credentials: 'include'
      })
      .then(response => response.json())
      .then(data => {
       if ('error' in data) {
        setErrorMessage(data.error);
        }
    	
        if ('user' in data) {
          props.changeLoginStateCB(data.user);
        }
      })
	  .catch(error => setErrorMessage('Failed network request! The server might be down.'));
    }

    if (props.loggedIn) {
      return (
      <>
        <p>You are logged in as {props.loggedIn}</p>
        <Logout loggedIn = { props.loggedIn } changeLoginStateCB = { props.changeLoginStateCB } />
      </>
      )
    }

    return (
	  <>
      <form onSubmit = { submitLogin }>
        <input type = "text" placeholder = "Username" required/>
        <input type = "password" placeholder = "Password" required/>
        <input type = "submit" value = "Log in" />
      </form>
      <p>If you don't have an account, please register</p>
      <p>{errorMessage}</p>
      </>
    );
};

export default Login;