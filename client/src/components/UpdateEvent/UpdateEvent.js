import React from 'react';
import { useState } from 'react';
import REACT_APP_PATH_TO_SERVER from '../../environment'
import { Calendar } from 'primereact/calendar';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import "./UpdateEvent.css";

const UpdateEvent = ({ toggleUpdate, setToggleUpdate, eventObj }) => {
  // new stuff
  const [date7, setDate7] = useState(new Date(eventObj.eventTime));
  const [value2, setValue2] = useState(eventObj.eventDescription);
  const [value3, setValue3] = useState(eventObj.eventName);
  const [value4, setValue4] = useState(eventObj.eventLocation);


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

  // return (
  //   <div className="addevent">
  //     <form className='addevent__form' onSubmit={editHandler}>
  //       <h3>Edit Event</h3>
  //       <input defaultValue={eventObj.eventName} name="inputName" required/>
  //       <input className='addevent__description' type='text' defaultValue={eventObj.eventDescription} name="inputDescription" required/>
  //       <input defaultValue={eventObj.eventLocation} name="inputLocation" required/>
  //       <input defaultValue={eventObj.eventTime.slice(0,16)} name="inputTime" type="datetime-local" required/>
  //       <button type="submit">Update event</button>
  //       <button type='button' onClick={(e) => closeButton(e)}>Close</button>
  //     </form>
  //   </div>
  // )

  return (
    <div className="editevent">
      <form className='editevent__form' onSubmit={editHandler} >
        <h3 className="editevent__title">Edit Event</h3>
        <span className="p-float-label">
            <InputText className="editevent__input" id="username" value={value3} onChange={(e) => setValue3(e.target.value)} name="inputName" required />
            <label htmlFor="inputName">Event title</label>
        </span>
        <span className="p-float-label">
          <InputTextarea className="editevent__input editevent__description" value={value2} maxLength="2048" onChange={(e) => setValue2(e.target.value)} rows={3} cols={30} type='text' name="inputDescription" required/>
          <label htmlFor="inputDescription">Describe your event here (max. 2048 characters)</label>
        </span>
        <span className="p-float-label">
            <InputText className="editevent__input" id="username" value={value4} onChange={(e) => setValue4(e.target.value)} name="inputLocation" required />
            <label htmlFor="inputLocation">Location</label>
        </span>
      {/* <input placeholder="Event Time" name="inputTime" type="datetime-local" required/> */}
        <span className="p-float-label">   
          <Calendar className="editevent__input" id="time24" name='inputTime' value={date7} onChange={(e) => setDate7(e.value)} showTime required />
          <label htmlFor="inputTime">New Date and Time</label>
        </span>
        <Button type='submit' label="Edit event" className="p-button-raised addevent__input" />
        <Button type='submit' label="Close" className="p-button-outlined addevent__input" onClick={(e) => closeButton(e)} />    
      </form>
    </div>
  )

};

export default UpdateEvent;