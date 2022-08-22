import { Link } from 'react-router-dom';
import "./Navbar.css";
import REACT_APP_PATH_TO_SERVER from '../../environment';
import { Button } from 'primereact/button';
import { GiKnot } from 'react-icons/gi';

const Navbar = ({ loggedIn, changeLoginStateCB }) => {

  const clickedLogout = event => {
    fetch(`${REACT_APP_PATH_TO_SERVER}/logout`, {
      method: 'POST',
		  credentials: 'include',
    })
	  .then(() => {
      changeLoginStateCB(false)
    });
  };
    
    return (
      <div className='navbar'>
        <h1 className='navbar__heading'>Activity<GiKnot  size={20} />knot</h1>
        { loggedIn ? 
          <div className="navbar__buttons">
            <Link className='navbar__element' to='./hobbies'>
              <Button label="Hobbies" className="p-button-raised" />
            </Link>
            <Link onClick={clickedLogout} className='navbar__element' to='/'>
              <Button label="Logout" className="p-button-raised navbar__right-button" style={{ marginLeft: '1em' }} />
            </Link>
          </div>
          :
          <div>
          <Link className='navbar__element' to='/'>
            <Button label="Login" className="p-button-raised" />
          </Link>
          <Link className='navbar__element' to='./register'> 
            <Button label="Register" className="p-button-raised" style={{ marginLeft: '1em' }} />
          </Link>
        </div>
        }
      </div>
  );
};

export default Navbar;