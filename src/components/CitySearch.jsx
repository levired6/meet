// src/components/CitySearch.jsx
import React, { useState, useEffect } from 'react';

const CitySearch = ({ allLocations, setCurrentCity, setInfoAlert }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        setSuggestions(allLocations);
    }, [`${allLocations}`]);

  // Handle changes to the city input field
  const handleInputChange = (event) => {
    const value = event.target.value;
    const filteredSuggestions = allLocations ? allLocations.filter((location) => {
      return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
    }) : [];

    setQuery(value);
    setSuggestions(filteredSuggestions);

    let infoText;
    if (filteredSuggestions.length === 0) {
        infoText = "We can not find the city you are looking for. Please try another city"
    } else {
        infoText = ""
    }
    setInfoAlert(infoText);
};

  // Handle selection of a city from the suggestion list
  const handleItemClicked = (event) => {
    const value = event.target.textContent;
    setQuery(value);
    setShowSuggestions(false);
    setCurrentCity(value);
    setInfoAlert(""); // Clear info alert on successful selection
    // Also ensuring that the input box is unfocused after selection
    // (This is often not necessary in tests but good for UX)
  };

return (
    <div id="city-search">
        <input
            type="text"
            className="city"
            placeholder="Search for a city"
            value={query}
            onFocus={() => setShowSuggestions(true)}
            onChange={handleInputChange}
        />
        {showSuggestions ?
            <ul className="suggestions">
                {suggestions.map((suggestion) => {
                    return <li onClick={handleItemClicked} key={suggestion}>{suggestion}</li>
                })}
                <li key='See all cities' onClick={handleItemClicked}>
                    <b>See all cities</b>
                </li>
            </ul>
            : null}
    </div>
)
}


export default CitySearch;