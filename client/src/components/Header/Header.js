import React from 'react';
import Navbar from '../Navbar/Navbar';
import "./Header.css";

const Header = ({loggedIn, changeLoginStateCB}) => {
  return (
    <header className='header'>
      <Navbar loggedIn = {loggedIn} changeLoginStateCB = {changeLoginStateCB}/>
    </header>
  );
};

export default Header;