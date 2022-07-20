import fetch from 'node-fetch';
import "./Logout.css";

const Logout = props => {

  const submitLogout = event => {
    event.preventDefault();
    fetch(`${process.env.REACT_APP_PATH_TO_SERVER}/logout`, {
      method: 'POST',
		  credentials: 'include',
    })
	  .then(() => props.changeLoginStateCB(false));
  }
    
  return (
    props.loggedIn ? 
    <form onSubmit = { submitLogout }>
      <input type = "submit" value = "Log out" />
    </form> : ''
  );
};

export default Logout;