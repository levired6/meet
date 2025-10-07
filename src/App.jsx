
// src/App.jsx
import React from 'react';
import { useEffect, useState } from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents'; // 1. Import the new component
import { getEvents } from './api';


import './App.css';

const App = () => {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);

   useEffect(() => {
   fetchData();
 }, []);

 const fetchData = async () => {
   const allEvents = await getEvents();
   setEvents(allEvents.slice(0, currentNOE));
 }

  return (
    <div className="App">
      <CitySearch />
      <NumberOfEvents /> {/* 2. Render the new component */}
      <EventList events={events} />
    </div>
  );
}

export default App;
