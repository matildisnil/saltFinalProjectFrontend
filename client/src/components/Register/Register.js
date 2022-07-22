import fetch from 'node-fetch'
import { useState } from 'react';
import "./Register.css";

const Register = props => {

  const submitRegistration = event => {
    event.preventDefault();
    if (event.target.childNodes[1].value !== event.target.childNodes[2].value) {
      setMessageToUser('The passwords do not match!');
	  return;
    }

    const formData = JSON.stringify({
      name: event.target.childNodes[0].value,
	  password: event.target.childNodes[1].value
    });

	fetch(`${process.env.REACT_APP_PATH_TO_SERVER}/register`, {
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
        console.log(data);
        setMessageToUser(data.message.toString());
	  }
    });
  }
  
  const [messageToUser, setMessageToUser] = useState('');
  
  if (props.loggedIn) {
    return '';
  }
  
  return (
    <>
      <form onSubmit = { submitRegistration } >
	      <input type = "text" placeholder = "Username" required />
	      <input type = "password" placeholder = "Password" required />
	      <input type = "password" placeholder = "Repeat password" required />
	      <input type = "submit" value = "Register" />
	    </form>
	    <p>{messageToUser}</p>
	</>
  );
}

export default Register;