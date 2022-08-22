import React from 'react';
import "./EventCard.css";
import REACT_APP_PATH_TO_SERVER from '../../environment';
import UpdateEvent from '../UpdateEvent/UpdateEvent';
import { useState } from 'react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';


const EventCard = ({ hobbyName, eventName, eventDescription, eventTime, eventLocation, creator, id, loggedIn }) => {

  const [toggleUpdate, setToggleUpdate] = useState(false);
  const eventObj = {
    hobbyName,
    eventName,
    eventDescription,
    eventTime,
    eventLocation,
    creator,
    id
  };

  const deleteEvent = async () => {
    const stringInput = JSON.stringify({creator: creator});
    await fetch(`${REACT_APP_PATH_TO_SERVER}/api/events/${hobbyName}/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', 'credentials': 'include' },
      credentials: 'include',
      body: stringInput
    });
    // really should be changed into updating a state when we have time
    window.location.reload();
  };

  const showUpdate = (e) => {
    e.stopPropagation();
    setToggleUpdate(true);
  };

  const unformattedDate = new Date(eventTime);
  const twoDigitMinutes = unformattedDate.toLocaleString(
    "en-GB", 
    {year: 'numeric', 
    month: 'numeric', 
    day: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit'}
  );

  const footer = (
    <span className='eventcard__footer'>
      {loggedIn === creator ?
        <>
        <Button onClick={deleteEvent} className="eventcard__delete" style={{marginRight: '.25em'}} >Delete event</Button>
        <Button onClick={showUpdate} >Edit</Button>
        </> : ''}
      {!toggleUpdate ? '' : <UpdateEvent toggleUpdate={toggleUpdate} setToggleUpdate={setToggleUpdate} eventObj={eventObj} /> }
    </span>
  );

  return ( 
    <Card className="eventcard" title={eventName} subTitle={eventDescription} style={{ width: '86%' }} footer={footer}>
     <p>When: {twoDigitMinutes}</p>
     <p>Location: {eventLocation}</p>
     <p>Organiser: {creator}</p>
    </Card>
  );
};

export default EventCard;