import React from 'react';
import "./HobbyPage.css";
import EventBoard from '../EventBoard/EventBoard';
import { useParams, useNavigate, Link } from 'react-router-dom';
//import { useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';
import AddEvent from '../AddEvent/AddEvent';
import REACT_APP_PATH_TO_SERVER from '../../environment'

const HobbyPage = ({ loggedIn }) => {
    const { hobbyParam } = useParams();
    const navigate = useNavigate();

    const [hobby, setHobby] = useState(null);
    const [toggle, setToggle] = useState(false);
    const [fetchStatus, setFetchStatus] = useState('Loading...');

    const fetchHobby = async () => {
      const data = await fetch(`${REACT_APP_PATH_TO_SERVER}/api/hobbies/${hobbyParam}`, {
        credentials: 'include'
      });
      // if (data.status === 403) {
      //   navigate('/');
      // }
      const jsonData = await data.json();
      jsonData.status = data.status;
      return jsonData;

    }
  
     useEffect(() => {
      fetchHobby()
        .then(data => {
          if (data.status === 403) {
            navigate('/');
          } else if (data.status === 404) {
            setFetchStatus('No such hobby found');
          } 
          return data;
        })
        .then(data => setHobby(data.hobby));
      }, []);

    const showForm = (e) => {
      e.stopPropagation();
      setToggle(true);
    };
    
    return (
      <>
        <div className='hobby-page-header'>  
        <Link to='../hobbies'>Back</Link>
          <h1>{hobby ? hobby.hobbyname : fetchStatus}</h1>
          <p>{hobby ? hobby.hobbydescription : ''}</p>
          <div className='hobby-page-header__add-event' onClick={showForm}>Add new Event</div>
          {!toggle ?
          '' :
          <AddEvent toggle={toggle} setToggle={setToggle} hobbyName={hobby.hobbyname} /> }
          {/* <div className='hobby-page-header__add-event' onClick={showForm}>{toggle ? <AddEvent toggle={toggle} setToggle={setToggle} hobbyName={hobby.hobbyname} /> : 'Add new event'}</div> */}
        </div>
        {hobby ? <EventBoard hobbyName={hobby.hobbyname} loggedIn={loggedIn}/> : ''}
        <Link to='../hobbies'>Back</Link>
      </>
  )
};
export default HobbyPage
