
// src/App.jsx
import React from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents'; // 1. Import the new component

const App = () => {
  return (
    <div className="App">
      <CitySearch />
      <NumberOfEvents /> {/* 2. Render the new component */}
      <EventList />
    </div>
  );
}

export default App;
