import fetch from 'node-fetch';
import "./Logout.css";
import REACT_APP_PATH_TO_SERVER from '../../environment';
import { Button } from 'primereact/button';

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
    <div className="logout">
    {props.loggedIn ? 
      <form onSubmit = { submitLogout }>
        <Button className="p-button-raised" type = "submit" value = "Log out" label="Log out"  />
      </form> : 'You are logged out'}
    </div>
  );
};

export default Logout;