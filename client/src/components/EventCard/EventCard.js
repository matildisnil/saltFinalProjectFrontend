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
  }

  const deleteEvent = async () => {
    console.log(creator);
    const stringInput = JSON.stringify({creator: creator});
    console.log(stringInput);
    await fetch(`${REACT_APP_PATH_TO_SERVER}/api/events/${hobbyName}/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', 'credentials': 'include' },
      credentials: 'include',
      body: stringInput
    });
    // really should be changed into updating a state
    window.location.reload();
  }

  const showUpdate = (e) => {
    e.stopPropagation();
    setToggleUpdate(true);
  };

  // new stuff 
  const footer = (
      <span>

{loggedIn === creator ? <>
       <Button onClick={deleteEvent} style={{marginRight: '.25em'}} >Delete event</Button>
       <Button onClick={showUpdate} >Edit</Button>
     </> : ''}
     {!toggleUpdate ? '' : <UpdateEvent toggleUpdate={toggleUpdate} setToggleUpdate={setToggleUpdate} eventObj={eventObj} /> }
      </span>
  );

  return (
    
    <Card className="eventcard" title={eventName} subTitle={eventDescription} style={{ width: '87%' }} footer={footer}>
    {/* <p className="m-0" style={{lineHeight: '1.5'}}></p> */}
     <p>When: {eventTime}</p>
     <p>Location: {eventLocation}</p>
     <p>{hobbyName}</p>
     <p>{creator}</p>
    </Card>

    // <div className="eventcard">
    //  <h3>{eventName}</h3>
    //  <p>Description: {eventDescription}</p>
    //  <p>When: {eventTime}</p>
    //  <p>Location: {eventLocation}</p>
    //  <p>{hobbyName}</p>
    //  <p>{creator}</p>
    //  {loggedIn === creator ? <>
    //    <button onClick={deleteEvent} >Delete event</button>
    //    <button onClick={showUpdate}>Edit</button>
    //  </> : ''}
    //  {!toggleUpdate ? '' : <UpdateEvent toggleUpdate={toggleUpdate} setToggleUpdate={setToggleUpdate} eventObj={eventObj} /> }
    // </div>
  )

};

export default EventCard;