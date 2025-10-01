// src/components/Event.jsx
import React, { useState } from 'react';

const Event = ({ event }) => {
  // State to manage whether event details are visible (expanded) or hidden (collapsed)
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <li>
      <div className="event-info">
        <h2 className="event-summary">{event.summary}</h2>
        <p className="event-created">{event.created}</p>
        <p className="event-location">{event.location}</p>
      </div>

      {/* Conditional rendering of the details section */}
      {showDetails && (
        <div className="details">
          <h3>About Event:</h3>
          <p className="event-description">{event.description}</p>
          <a href={event.htmlLink} target="_blank" rel="noopener noreferrer">
            See details on Google Calendar
          </a>
        </div>
      )}

      <button className="details-btn" onClick={toggleDetails}>
        {showDetails ? 'hide details' : 'show details'}
      </button>
    </li>
  );
}

export default Event;