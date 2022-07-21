import React from 'react';
import "./EventCard.css";


const EventCard = ({ hobbyName, eventName, eventDescription, eventTime, eventLocation }) => {
  return (
    <div>
     <h3>{eventName}</h3>
     <p>Description: {eventDescription}</p>
     <p>When: {eventTime}</p>
     <p>Location: {eventLocation}</p>
     <p>{hobbyName}</p>
    </div>
  )
};

export default EventCard;