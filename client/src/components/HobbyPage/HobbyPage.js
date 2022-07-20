import React from 'react';
import "./HobbyPage.css";
import { useParams, useNavigate } from 'react-router-dom';
//import { useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';

const HobbyPage = () => {
    const { hobbyParam } = useParams();
    console.log(hobbyParam, 'hellogate');

    const [hobby, setHobby] = useState(null);

    const fetchHobby = async () => {
      const data = await fetch(`${process.env.REACT_APP_PATH_TO_SERVER}/api/hobbies/${hobbyParam}`, {
        credentials: 'include'
      });
      return await data.json();
    }
  
     useEffect(() => {
      fetchHobby().then(data => setHobby(data.hobby));
      }, []);

    // const location = useLocation();
    // // console.log(props, " props");
    // console.log(location, " useLocation Hook");
    // const hobbyName = location.state?.hobbyname;
    // console.log(hobbyName, 'hobbygate')

    return (
      <div>  
        <h1>{hobby ? hobby.hobbyname : 'Loading'}</h1>
        <p>{ hobby ? hobby.hobbydescription : 'Loading' }</p>
      </div>
  )
};
export default HobbyPage
