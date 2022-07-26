import React from 'react';
import "./HobbyCard.css";
import { Link } from 'react-router-dom';

import { Card } from 'primereact/card';

const HobbyCard = ({ hobbyname, hobbydescription }) => {

  const hobbypage = hobbyname.toLowerCase();
  
  // new stuff
  const header = (
    <img alt="Card" src="https://picsum.photos/800" onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} />
);

  return (
    <Link className="hobbycard" to={hobbypage}  >
      <Card title={hobbyname}  style={{ width: '15em' }} header={header} />
    </Link>
  )
}

export default HobbyCard

// state={{ data: data }} 
// state={{hobbyname:hobbyname}} 