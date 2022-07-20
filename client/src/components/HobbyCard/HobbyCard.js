import React from 'react';
import "./HobbyCard.css";
import { Link } from 'react-router-dom';

const HobbyCard = ({ hobbyname, hobbydescription }) => {

  const hobbypage = hobbyname.toLowerCase();

  return (

    <Link to={hobbypage}  >
    <div className="hobby">
      <img src="https://picsum.photos/75"/>
      <h3 >{hobbyname}</h3>
    </div>
    </Link>
  )
}

export default HobbyCard

// state={{ data: data }} 

// state={{hobbyname:hobbyname}} 