// src/components/NumberOfEvents.jsx
import React from 'react';
import PropTypes from 'prop-types';

const NumberOfEvents = ({ currentNOE, setCurrentNOE, setErrorAlert }) => {
    const handleInputChanged = (event) => {
        const value = Number(event.target.value);

  setCurrentNOE(value); // Always update so the input reflects what the user typed

  if (isNaN(value) || value <= 0 || value > 50) {
    setErrorAlert("You must enter a valid number of events");
  } else {
    setErrorAlert("");
  }
};

    return (
        <div id="number-of-events">
            <input
                type="number"
                role="textbox"
                value={currentNOE}
                onChange={handleInputChanged}
            />
        </div>
    );
};

NumberOfEvents.propTypes = {
  currentNOE: PropTypes.number.isRequired,
  setCurrentNOE: PropTypes.func.isRequired,
  setErrorAlert: PropTypes.func.isRequired,
};

export default NumberOfEvents;