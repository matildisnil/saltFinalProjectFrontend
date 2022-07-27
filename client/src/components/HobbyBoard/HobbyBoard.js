import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HobbyCard from '../HobbyCard/HobbyCard';
import "./HobbyBoard.css";
import REACT_APP_PATH_TO_SERVER from '../../environment'

const HobbyBoard = () => {
  const navigate = useNavigate();
  const [hobbies, setHobbies] = useState([]);

  const fetchHobbies = async () => {
    const data = await fetch(`${REACT_APP_PATH_TO_SERVER}/api/hobbies`, {
      credentials: 'include'
    });
    // if the status is 403, it means the user is not logged in, so will be sent back to login page
    if (data.status === 403) {
      navigate('/');
    }
    return await data.json();
  }

   useEffect(() => {
    fetchHobbies()
      .then(data => {
        // if (data.loggedIn === false)
        return data;
      })
      .then(data => {
        const sortedHobbies = data.hobbies.sort((a, b) => a.hobbyname.localeCompare(b.hobbyname));
        setHobbies(sortedHobbies)});
    }, []);

  return (
    <div className='hobby-board-wrap'> {
    hobbies && hobbies.length !== 0 ? 
    <div className="hobbyBoard">{hobbies.map(
      (hobby, index) => <HobbyCard hobbyname={hobby.hobbyname} hobbydescription={hobby.hobbydescription} hobbyimage={hobby.hobbyimage} key={index}/>
    )}</div> : 
    <div>Loading...</div>}
    </div>
  )
}

export default HobbyBoard