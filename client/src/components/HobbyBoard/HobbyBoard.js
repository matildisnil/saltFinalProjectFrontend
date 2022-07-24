import React from 'react';
import { useEffect, useState } from 'react';
import HobbyCard from '../HobbyCard/HobbyCard';
import "./HobbyBoard.css";
import REACT_APP_PATH_TO_SERVER from '../../environment'

const HobbyBoard = () => {
  const [hobbies, setHobbies] = useState([]);

  const fetchHobbies = async () => {
    const data = await fetch(`${REACT_APP_PATH_TO_SERVER}/api/hobbies`, {
      credentials: 'include'
    });
    return await data.json();
  }

   useEffect(() => {
    fetchHobbies().then(data => setHobbies(data.hobbies));
    }, []);

  return (
    <div> {
    hobbies && hobbies.length !== 0 ? 
    <div className="hobbyBoard">{hobbies.map(
      (hobby, index) => <HobbyCard hobbyname={hobby.hobbyname} hobbydescription={hobby.hobbydescription} key={index}/>
    )}</div> : 
    <div>Loading...</div>}
    </div>
  )
}

export default HobbyBoard