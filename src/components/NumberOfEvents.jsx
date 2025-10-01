// src/components/NumberOfEvents.jsx
import React, { useState } from 'react';

const NumberOfEvents = () => {
    // State to manage the number of events, initialized to 32
    const [number, setNumber] = useState(32);

    const handleInputChanged = (event) => {
        const value = event.target.value;
        // Update the state with the new value typed by the user
        setNumber(value);
    };

    return (
        <div id="number-of-events">
            <label htmlFor="number-of-events-input">Number of Events:</label>
            <input
                type="text"
                id="number-of-events-input"
                className="number-of-events-input"
                value={number}
                onChange={handleInputChanged} // Add the change handler
            />
        </div>
    );
};

export default NumberOfEvents;