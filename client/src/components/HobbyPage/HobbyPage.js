import React from 'react';
import "./HobbyPage.css";
import EventBoard from '../EventBoard/EventBoard';
import { useParams, useNavigate, Link } from 'react-router-dom';
//import { useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';
import AddEvent from '../AddEvent/AddEvent';
import REACT_APP_PATH_TO_SERVER from '../../environment'
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
      // style={{ backgroundImage:`url(${image})`,backgroundRepeat:"no-repeat" }}
      <>
      <div className='hobby-page-header'>
      <div className='hobby-page-header__title'>
        <h1>{hobby ? hobby.hobbyname : fetchStatus}</h1>
        <p>{hobby ? hobby.hobbydescription : ''}</p>  
      </div>
      <div className='hobby-page__add-back-btn'>
        <div>
          <Button label="Add new Event" className="p-button-raised hobby-page__add-button" style={{marginLeft:'0'}} onClick={showForm} />
        </div>
        <Link className='backbutton' to='../hobbies'>
          <Button label="Back" className="p-button-raised" />
        </Link>
        </div> 
      </div>
        {!toggle ? '' : <AddEvent toggle={toggle} setToggle={setToggle} hobbyName={hobby.hobbyname} /> }
        {hobby ? <EventBoard hobbyName={hobby.hobbyname} loggedIn={loggedIn}/> : ''}
      <div className='bottom-back-btn'>
        <Link className='backbutton' to='../hobbies'>
          <Button label="Back" className="p-button-raised" />
        </Link>
      </div>
      </>
  )
};
// style={{ backgroundImage:`url(${hobby?.hobbyimage || 'https://images.unsplash.com/photo-1544829728-e5cb9eedc20e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'})`,backgroundRepeat:"no-repeat", backgroundAttachment: "fixed" }}

export default HobbyPage
