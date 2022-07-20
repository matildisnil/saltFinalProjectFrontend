import { Link } from 'react-router-dom';
import "./Navbar.css";


const Navbar = () => {
    return (
        <div className='navbar'>
        <h1>"NAMEPLACEHOLDER"</h1>
        <Link className='navbar__element' to='/'>Login</Link>
        <Link className='navbar__element' to='./register'>Register</Link>
        <Link className='navbar__element' to='./logout'>Logout</Link>
        <Link className='navbar__element' to='./hobbies'>Hobbies</Link>
        </div>
    )
}

export default Navbar;