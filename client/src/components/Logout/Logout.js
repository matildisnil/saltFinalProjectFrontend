import fetch from 'node-fetch';
import "./Logout.css";
import REACT_APP_PATH_TO_SERVER from '../../environment';

const Logout = props => {

  const submitLogout = event => {
    event.preventDefault();
    fetch(`${REACT_APP_PATH_TO_SERVER}/logout`, {
      method: 'POST',
		  credentials: 'include',
    })
	  .then(() => props.changeLoginStateCB(false));
  };
    
  return (
    props.loggedIn ? 
    <form onSubmit = { submitLogout }>
      <input type = "submit" value = "Log out" />
    </form> : 'You are logged out'
  );
};

export default Logout;