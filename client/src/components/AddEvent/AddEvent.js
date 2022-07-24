import "./AddEvent.css";
import React from 'react';
import { useState } from 'react';
import REACT_APP_PATH_TO_SERVER from '../../environment'

const AddEvent = ({ toggle, setToggle, hobbyName }) => {
  const [eventInput, setEventInput] = useState({})
  
  const submitHandler = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const inputObject = {
      eventName: e.target.inputName.value,
      eventDescription: e.target.inputDescription.value,
      eventLocation: e.target.inputLocation.value,
      eventTime: e.target.inputTime.value
    }
    const stringInput = JSON.stringify(inputObject);
    await fetch(`${REACT_APP_PATH_TO_SERVER}/api/events/${hobbyName}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'credentials': 'include' },
      body: stringInput
    })
    setToggle(false);
    console.log(toggle, 'submitgate')
    window.location.reload();
  }

  const closeButton = (e) => {
    e.stopPropagation();
    console.log('1111');
    setToggle(false);
  }

  return (
    <div className="addevent">
      <form className='addevent__form' onSubmit={submitHandler} >
        <h3>Add new Event</h3>
        <input placeholder="Event Name" name="inputName" required/>
        <input className='addevent__description' type='text' placeholder="Event Description" name="inputDescription" required/>
        <input placeholder="Event Location" name="inputLocation" required/>
        <input placeholder="Event Time" name="inputTime" type="datetime-local" required/>
        <button type="submit">Add event</button>
        <button type='button' onClick={(e) => closeButton(e)}>Close</button>
      </form>
    </div>
  
  )
};

export default AddEvent