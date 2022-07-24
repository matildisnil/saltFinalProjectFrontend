import fetch from 'node-fetch';
import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom'
import Logout from '../Logout/Logout';
import "./Login.css";
import REACT_APP_PATH_TO_SERVER from '../../environment'

const Login = props => {
	
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const submitLogin = event => {

      const formData = JSON.stringify({
        name: event.target.childNodes[0].value,
        password: event.target.childNodes[1].value
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
	  .catch(error => setErrorMessage('Failed network request! The server might be down.'));
    }
    // we still use the logout-component here, which we maybe shouldn't. in some wierd scenarios when we shut down the server you end up here
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
      {/* Different message depending on if the user was navigated here after registering on the registering page or just came the regular way. The ?. operator is like the . chaining operator, except that instead of causing an error if a reference is nullish*/}
      {location.state?.justRegistered ? <p>You have registered, you can now log in.</p> : <p> If you don't have an account, please <Link to='./register'> register </Link></p>}
      <p>{errorMessage}</p>
      </>
    );
};

// location.state && location.state.justRegistered

export default Login;