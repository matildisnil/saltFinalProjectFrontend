import React from 'react';
import "./EventBoard.css";
import { useEffect, useState } from 'react';
import EventCard from '../EventCard/EventCard'
import REACT_APP_PATH_TO_SERVER from '../../environment'

const EventBoard = ({ hobbyName, loggedIn }) => {
  const [events, setEvents] = useState(null);
  
  const fetchEvents = async () => {
    const data = await fetch(`${REACT_APP_PATH_TO_SERVER}/api/events/${hobbyName}`, {
        credentials: 'include'
    });
    return await data.json();
  }

  useEffect(() => {
    fetchEvents().then(data => {
      const sortedEvents = data?.events?.sort((a,b) => {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(a.eventtime) - new Date(b.eventtime);
      });
      const filteredEvents = sortedEvents?.filter((event) => {
        const now = new Date();
        return new Date(event.eventtime)>= now;
      })
      
      setEvents(filteredEvents);
    });
    }, []);

  return (
    <div className="eventboard">
      { events ? 
      <div className="hobbyBoard">
        {events.map(
        (event, index) => 
          <EventCard 
            loggedIn={loggedIn}
            hobbyName={hobbyName}
            eventName={event.eventname}
            eventDescription={event.eventdescription}
            eventTime={event.eventtime}
            eventLocation={event.eventlocation}
            creator={event.creator}
            id={event.id}
            key={index} />
        )} 
      </div> : <div></div>}
    </div>
  )
};

export default EventBoard