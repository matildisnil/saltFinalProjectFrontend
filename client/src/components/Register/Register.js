import fetch from 'node-fetch'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Register.css";
import REACT_APP_PATH_TO_SERVER from '../../environment'
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

const Register = props => {
  // Prime react component
  const [value2, setValue2] = useState('');
  const [value3, setValue3] = useState('');
  const [value4, setValue4] = useState('');

  const navigate = useNavigate();
  const submitRegistration = event => {
    event.preventDefault();
    if (event.target.password.value !== event.target.repeatPassword.value) {
      setMessageToUser('The passwords do not match!');
	  return;
    }

    const formData = JSON.stringify({
      name: event.target.username.value,
	    password: event.target.password.value
    });

	fetch(`${REACT_APP_PATH_TO_SERVER}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      if ('error' in data) {
        setMessageToUser(data.error.toString());
      }
	  
	  if ('message' in data) {
        setMessageToUser(data.message.toString());
        navigate('/',{state:{justRegistered: true}});
	  }
    });
  }
  
  const [messageToUser, setMessageToUser] = useState('');
  
  if (props.loggedIn) {
    return '';
  }
  
  return (
    <>
      <div className='register'>
      <form className='register-form' onSubmit = { submitRegistration }>
        <span className="p-float-label">
          <InputText name='username' id="username" value={value2} onChange={(e) => setValue2(e.target.value)} />
          <label htmlFor="username">Username</label>
        </span> 
        <span className="p-float-label">
          <Password value={value3} name='password' onChange={(e) => setValue3(e.target.value)} feedback={false} />
          <label htmlFor="password">Password</label>
        </span>
        <span className="p-float-label">
          <Password value={value4} name='repeatPassword' onChange={(e) => setValue4(e.target.value)} feedback={false} />
          <label htmlFor="repeatPassword">Repeat Password</label>
        </span>
        <Button type='submit' label="Register" className="p-button-raised" />
        <p>{messageToUser}</p>
      </form> 
      </div>
	</>
  );
}

export default Register;