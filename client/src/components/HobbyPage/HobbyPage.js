import React from 'react';
import "./HobbyPage.css";
import EventBoard from '../EventBoard/EventBoard';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AddEvent from '../AddEvent/AddEvent';
import REACT_APP_PATH_TO_SERVER from '../../environment';
import { Button } from 'primereact/button';

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
      const jsonData = await data.json();
      jsonData.status = data.status;
      return jsonData;
    };
  
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
      <div className='hobby-page-header__title'>
        <h1>{hobby ? hobby.hobbyname : fetchStatus}</h1>
        <p>{hobby ? hobby.hobbydescription : ''}</p>  
      </div>
      <div className='hobby-page__add-back-btn'>
        <div>
        {hobby ? 
          <Button 
            label="Add new Event" 
            className="p-button-raised hobby-page__add-button" 
            style={{marginLeft:'0'}} 
            onClick={showForm} />
            : ''}
        </div>

        <Link className='backbutton' to='../hobbies'>
          <Button label="Back" className="p-button-raised" />
        </Link>
        </div> 
      </div>
        {!toggle ? '' : <AddEvent toggle={toggle} setToggle={setToggle} hobbyName={hobby.hobbyname} /> }
        {hobby ? <EventBoard hobbyName={hobby.hobbyname} loggedIn={loggedIn}/> : ''}
      
      {hobby ?
        <div className='bottom-back-btn'>
          <Link className='backbutton' to='../hobbies'>
            <Button label="Back" className="p-button-raised" />
          </Link>
        </div> : ''}
      </>
  );
};

export default HobbyPage;
