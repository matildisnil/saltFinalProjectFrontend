import { Link } from 'react-router-dom';
import "./Navbar.css";
import REACT_APP_PATH_TO_SERVER from '../../environment'

const Navbar = ({ loggedIn, changeLoginStateCB }) => {

  const clickedLogout = event => {
    fetch(`${REACT_APP_PATH_TO_SERVER}/logout`, {
      method: 'POST',
		  credentials: 'include',
    })
	  .then(() => {
      changeLoginStateCB(false)
      console.log('hello there');
    });
  }
    
    return (
        <div className='navbar'>
        <h1>Hobby Hippo</h1>
        { loggedIn ? 
          <div>
            <Link className='navbar__element' to='./hobbies'>Hobbies</Link>
            <Link onClick={clickedLogout} className='navbar__element' to='/'>Logout</Link>
          </div>
          :
          <div>
          <Link className='navbar__element' to='/'>Login</Link>
          <Link className='navbar__element' to='./register'>Register</Link>
        </div>
        }
        </div>
    )
}

export default Navbar;