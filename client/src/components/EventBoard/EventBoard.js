import React from 'react';
import "./EventBoard.css";
import { useEffect, useState } from 'react';
import EventCard from '../EventCard/EventCard'

const EventBoard = ({ hobbyName }) => {
  const [events, setEvents] = useState(null);
  
  const fetchEvents = async () => {
    const data = await fetch(`${process.env.REACT_APP_PATH_TO_SERVER}/api/events/${hobbyName}`, {
        credentials: 'include'
    });
    return await data.json();
  }
  useEffect(() => {
    fetchEvents().then(data => setEvents(data.events));
    }, []);


  return (
    <div className="eventboard">
      { events ? 
      <div className="hobbyBoard">
        {events.map(
        (event, index) => 
          <EventCard 
            hobbyName={hobbyName}
            eventName={event.eventname}
            eventDescription={event.eventdescription}
            eventTime={event.eventtime}
            eventLocation={event.eventlocation}
            key={index} />
        )} 
      </div> : <div>Loading...</div>}
    </div>
  )
};

export default EventBoard