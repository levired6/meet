// src/components/NumberOfEvents.jsx
import { useState } from 'react';

const NumberOfEvents = ({ currentNOE, setCurrentNOE }) => {
    // State to manage the number of events, initialized to 32
    const [number, setNumber] = useState(currentNOE);

    const handleInputChanged = (event) => {
        const value = Number(event.target.value);
        // Update the state with the new value typed by the user
        setNumber(value);
        setCurrentNOE(value);

            let errorText;
    if (isNaN(currentNOE)) {
      errorText = "Please enter a valid number to see the events"
    } else if (currentNOE < 1) {
      errorText = "Please enter a number greater than zero to see the events"
    } else {
      errorText =""
    }
    setErrorAlert(errorText);
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