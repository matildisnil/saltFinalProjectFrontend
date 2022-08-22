import React from 'react';
import "./HobbyCard.css";
import { Link } from 'react-router-dom';
import { Card } from 'primereact/card';

const HobbyCard = ({ hobbyname, hobbyimage }) => {

  const hobbypage = hobbyname.toLowerCase();
  
  const header = (
    <img 
      className="hobbycard__image" 
      alt={hobbyname}
      src={hobbyimage} 
      onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} />
);

  return (
    <Link className="hobbycard" to={hobbypage}  >
      <Card title={hobbyname}  style={{ width: '15em' }} header={header} />
    </Link>
  );
};

export default HobbyCard;