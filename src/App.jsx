import React from 'react';
import { useEffect, useState } from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import { extractLocations, getEvents, checkToken } from './api.js';
import './App.css';
import CityEventsChart from './components/CityEventsChart';
import EventGenresChart from './components/EventGenresChart';
import { InfoAlert, ErrorAlert, WarningAlert } from './components/Alert';


const App = () => {
   const [events, setEvents] = useState([]);
   const [currentNOE, setCurrentNOE] = useState(36);
   const [allLocations, setAllLocations] = useState([]);
   const [currentCity, setCurrentCity] = useState("See all cities");
   const [infoAlert, setInfoAlert] = useState("");
   const [errorAlert, setErrorAlert] = useState("");
   const [warningAlert, setWarningAlert] = useState("");

useEffect(() => {
     if (navigator.onLine) {
            setWarningAlert('');
        } else {
            setWarningAlert('You are curently offline. The displayed events list has been loaded from your cache');
        }
		fetchData();
		
	}, [currentCity, currentNOE]); 

    const fetchData = async () => {
        try {
            const allEvents = await getEvents();


            if (!Array.isArray(allEvents)) {
                console.error("getEvents() did not return an array:", allEvents);
                setEvents([]);
                setAllLocations([]);
                return;
            }

            const filteredEvents =
                currentCity === "See all cities"
                    ? allEvents
                    : allEvents.filter(event => event.location === currentCity);

            
            setEvents((filteredEvents || []).slice(0, currentNOE));
            setAllLocations(extractLocations(allEvents));
        } catch (err) {
            console.error("Error in fetchData:", err);
            setEvents([]);
            setAllLocations([]);
        }
    };
    return (
        <div className="App">
            <div className="app-name">MEET</div>
            <div className="alerts-container">
                {infoAlert.length ? <InfoAlert text={infoAlert} /> : null}
                {errorAlert.length ? <ErrorAlert text={errorAlert} /> : null}
                {warningAlert.length ? <WarningAlert text={warningAlert} /> : null}
            </div>
            <CitySearch
                allLocations={allLocations}
                setCurrentCity={setCurrentCity}
                setInfoAlert={setInfoAlert} />
            <NumberOfEvents
                currentNOE={currentNOE}
                setCurrentNOE={setCurrentNOE}
                setErrorAlert={setErrorAlert} />
            <div className="charts-container">
                <CityEventsChart allLocations={allLocations} events={events} />
                <EventGenresChart events={events} />
            </ div>
            <EventList events={events} />
        </div>
    );
}

export default App;