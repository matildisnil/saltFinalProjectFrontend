import React from 'react';
import "./Footer.css";
import { IoMdBug } from 'react-icons/io';

const Footer = () => {
  return (
    <footer className="footer">
      <h5>Made by the Bug<IoMdBug size={10}/>Busters</h5>
    </footer>
  );
};

export default Footer;