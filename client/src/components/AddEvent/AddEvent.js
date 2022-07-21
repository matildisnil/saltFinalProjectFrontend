import "./AddEvent.css";
import React from 'react';
import { useState } from 'react';

const AddEvent = ({ setToggle, hobbyName }) => {
  const [eventInput, setEventInput] = useState({})
  
  const submitHandler = (e) => {
    e.preventDefault();
    const inputObject = {
      eventName: e.target.inputName.value,
      eventDescription: e.target.inputDescription.value,
      eventLocation: e.target.inputLocation.value,
      eventTime: e.target.inputTime.value
    }
    console.log(inputObject);
    fetch(`${process.env.REACT_APP_PATH_TO_SERVER}/api/events/${hobbyName}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: inputObject,
      credentials: 'include'
    })

    setToggle(false);
  }

  return (
    <div className="addevent">
      <form onSubmit={submitHandler}>
        <input placeholder="Event Name" name="inputName"/>
        <input placeholder="Event Description" name="inputDescription"/>
        <input placeholder="Event Location" name="inputLocation"/>
        <input placeholder="Event Time" name="inputTime" type="datetime-local"/>
        <button type="submit">Add event</button>
      </form>
    </div>
  )
};

export default AddEvent