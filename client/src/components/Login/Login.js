import fetch from 'node-fetch';
import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import Logout from '../Logout/Logout';
import "./Login.css";
import REACT_APP_PATH_TO_SERVER from '../../environment';
import React from 'react';
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

const Login = props => {
    // Prime react needs these
    const [value2, setValue2] = useState('');
    const [value3, setValue3] = useState('');

    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const submitLogin = event => {

      const formData = JSON.stringify({
        name: event.target.username.value,
        password: event.target.password.value
      });

      event.preventDefault();
      fetch(`${REACT_APP_PATH_TO_SERVER}/login`, {
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
          navigate('hobbies');
        }
      })
	    .catch(() => setErrorMessage('Failed network request! The server might be down.'));
    }
    // we still use the logout-component here, which we maybe shouldn't.
    // in some wierd scenarios when we shut down the server you end up here
    if (props.loggedIn) {
      return (
      <div className="loggedin__container">
        <p>You are logged in as {props.loggedIn}</p>
        <Logout loggedIn = { props.loggedIn } changeLoginStateCB = { props.changeLoginStateCB } />
      </div>
      );
    }

    return (
      <div className='login'>
        <form className='login-form' onSubmit = { submitLogin }>
          <span className="p-float-label">
            <InputText name='username' id="username" value={value2} onChange={(e) => setValue2(e.target.value)} />
            <label htmlFor="username">Username</label>
          </span> 
          <span className="p-float-label">
            <Password value={value3} name='password' onChange={(e) => setValue3(e.target.value)}  feedback={false} />
            <label htmlFor="password">Password</label>
          </span>
          <Button type='submit' label="Log in" className="p-button-raised" />
          {location.state?.justRegistered ? 
            <p>You have registered, you can now log in.</p> :
            <p className='login__text'> If you don't have an account, please 
              <Link to='./register'> register </Link>
            </p>}
          <p>{errorMessage}</p>
        </form> 
    </div>
  );
};

export default Login;