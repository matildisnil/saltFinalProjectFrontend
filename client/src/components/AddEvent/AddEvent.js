import "./AddEvent.css";
import React from 'react';
import { useState } from 'react';
import REACT_APP_PATH_TO_SERVER from '../../environment';
import { Calendar } from 'primereact/calendar';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

const AddEvent = ({ toggle, setToggle, hobbyName }) => {
  const [date7, setDate7] = useState(undefined);
  const [value2, setValue2] = useState('');
  const [value3, setValue3] = useState('');
  const [value4, setValue4] = useState('');
  
  const submitHandler = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const inputObject = {
      eventName: e.target.inputName.value,
      eventDescription: e.target.inputDescription.value,
      eventLocation: e.target.inputLocation.value,
      eventTime: e.target.inputTime.value
    };
    const stringInput = JSON.stringify(inputObject);
    await fetch(`${REACT_APP_PATH_TO_SERVER}/api/events/${hobbyName}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'credentials': 'include' },
      credentials: 'include',
      body: stringInput
    });

    setToggle(false);
    window.location.reload();
  };

  // This button closes pop-up
  const closeButton = (e) => {
    e.stopPropagation();
    setToggle(false);
  };

  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()} ${current.getHours()}:${current.getMinutes()}`;
  const unformattedDate = new Date();
  const twoDigitMinutes = unformattedDate.toLocaleString(
    "fr", 
    {year: 'numeric', 
    month: 'numeric', 
    day: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit'}
  );

  return (
    <div className="addevent">
      <form className='addevent__form' onSubmit={submitHandler} >
        <h3 className="addevent__title">Add new Event</h3>
        <span className="p-float-label">
            <InputText 
              className="addevent__input" 
              id="username" 
              value={value3} 
              onChange={(e) => setValue3(e.target.value)}  
              name="inputName" required />
            <label htmlFor="inputName">Event title</label>
        </span>
        <span className="p-float-label">
          <InputTextarea 
            className="addevent__input addevent__description" 
            value={value2} maxLength="2048" 
            onChange={(e) => setValue2(e.target.value)} 
            rows={3} cols={30} 
            type='text'  
            name="inputDescription" 
            required />
          <label htmlFor="inputDescription">Describe your event here (max. 2048 characters)</label>
        </span>
        <span className="p-float-label">
            <InputText 
              className="addevent__input" 
              id="username" 
              value={value4} 
              onChange={(e) => setValue4(e.target.value)}  
              name="inputLocation" 
              required />
            <label htmlFor="inputLocation">Location</label>
        </span>
        <span className="p-float-label">   
          <Calendar 
            className="addevent__input" 
            id="time24" 
            name='inputTime' 
            value={date7} onChange={(e) => setDate7(e.value)} 
            showTime 
            required />
          {<label htmlFor="inputTime">{twoDigitMinutes}</label>}
        </span>
        <Button type='button' label="Close" className="p-button-outlined addevent__input" onClick={(e) => closeButton(e)} />
        <Button type='submit' label="Add event" className="p-button-raised addevent__input" />
      </form>
    </div>
  );
};

export default AddEvent;
