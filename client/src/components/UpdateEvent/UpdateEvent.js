
import React from 'react';
import { useState } from 'react';
import REACT_APP_PATH_TO_SERVER from '../../environment'

const UpdateEvent = ({ toggleUpdate, setToggleUpdate, eventObj }) => {
  
  const editHandler = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('are we getting here?')
    const inputObject = {
      eventName: e.target.inputName.value,
      eventDescription: e.target.inputDescription.value,
      eventLocation: e.target.inputLocation.value,
      eventTime: e.target.inputTime.value,
      creator: eventObj.creator
    }
    const stringInput = JSON.stringify(inputObject);
    console.log(REACT_APP_PATH_TO_SERVER);
    await fetch(`${REACT_APP_PATH_TO_SERVER}/api/events/${eventObj.hobbyName}/${eventObj.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'credentials': 'include' },
      credentials: 'include',
      body: stringInput
    })
    setToggleUpdate(false);
    window.location.reload();
  }

  const closeButton = (e) => {
    e.stopPropagation();
    setToggleUpdate(false);
  }

  return (
    <div className="addevent">
      <form className='addevent__form' onSubmit={editHandler}>
        <h3>Edit Event</h3>
        <input defaultValue={eventObj.eventName} name="inputName" required/>
        <input className='addevent__description' type='text' defaultValue={eventObj.eventDescription} name="inputDescription" required/>
        <input defaultValue={eventObj.eventLocation} name="inputLocation" required/>
        <input defaultValue={eventObj.eventTime.slice(0,16)} name="inputTime" type="datetime-local" required/>
        <button type="submit">Update event</button>
        <button type='button' onClick={(e) => closeButton(e)}>Close</button>
      </form>
    </div>
  
  )
};

export default UpdateEvent;