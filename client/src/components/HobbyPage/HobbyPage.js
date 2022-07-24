import React from 'react';
import "./HobbyPage.css";
import EventBoard from '../EventBoard/EventBoard';
import { useParams, useNavigate, Link } from 'react-router-dom';
//import { useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';
import AddEvent from '../AddEvent/AddEvent';
import REACT_APP_PATH_TO_SERVER from '../../environment'

const HobbyPage = () => {
    const { hobbyParam } = useParams();

    const [hobby, setHobby] = useState(null);
    const [toggle, setToggle] = useState(false);

    const fetchHobby = async () => {
      const data = await fetch(`${REACT_APP_PATH_TO_SERVER}/api/hobbies/${hobbyParam}`, {
        credentials: 'include'
      });
      return await data.json();
    }
  
     useEffect(() => {
      fetchHobby().then(data => setHobby(data.hobby));
      }, []);

    const showForm = (e) => {
      e.stopPropagation();
      setToggle(true);
    };
    
    return (
      <>
        <div className='hobby-page-header'>  
        <Link to='../hobbies'>Back</Link>
          <h1>{hobby ? hobby.hobbyname : 'Loading'}</h1>
          <p>{hobby ? hobby.hobbydescription : 'Loading'}</p>
          <div className='hobby-page-header__add-event' onClick={showForm}>{toggle ? <AddEvent toggle={toggle} setToggle={setToggle} hobbyName={hobby.hobbyname} /> : 'Add new event'}</div>
        </div>
        {hobby ? <EventBoard hobbyName={hobby.hobbyname}/> : ''}
        <Link to='../hobbies'>Back</Link>
      </>
  )
};
export default HobbyPage
