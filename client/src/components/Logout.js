import fetch from 'node-fetch';

const Logout = props => {

    const submitLogout = event => {

      event.preventDefault();
      fetch(`${process.env.REACT_APP_PATH_TO_SERVER}/logout`, {
        method: 'POST',
		credentials: 'include',
		
      })
	  .then(data => props.changeLoginStateCB(false));
    }

    if (props.loggedIn) {
      return <form onSubmit = { submitLogout }>
        <input type = "submit" value = "Log out" />
      </form>;
    }

    return (
      ''
    );
};

export default Logout;