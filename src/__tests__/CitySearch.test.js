// src/__tests__/CitySearch.test.js
import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CitySearch from '../components/CitySearch';
import { extractLocations, getEvents } from '../api';


describe('<CitySearch /> component', () => {
  let CitySearchComponent;
  beforeEach(() => {
    CitySearchComponent = render(<CitySearch />);
  });
  test('renders text input', () => {
    const cityTextBox = CitySearchComponent.queryByRole('textbox');
    expect(cityTextBox).toBeInTheDocument();
    expect(cityTextBox).toHaveClass('city');
  });


  test('suggestions list is hidden by default', () => {
    const suggestionList = CitySearchComponent.queryByRole('list');
    expect(suggestionList).not.toBeInTheDocument();
  });


  test('renders a list of suggestions when city textbox gains focus', async () => {
    const user = userEvent.setup();
    const cityTextBox = CitySearchComponent.queryByRole('textbox');
    await user.click(cityTextBox);
    const suggestionList = CitySearchComponent.queryByRole('list');
    expect(suggestionList).toBeInTheDocument();
    expect(suggestionList).toHaveClass('suggestions');
  });

    test('updates list of suggestions correctly when user types in city textbox', async () => {
    const user = userEvent.setup();
    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);
    CitySearchComponent.rerender(<CitySearch allLocations={allLocations} />);


    // user types "Berlin" in city textbox
    const cityTextBox = CitySearchComponent.queryByRole('textbox');
    await user.type(cityTextBox, "Berlin");


    // filter allLocations to locations matching "Berlin"
    const suggestions = allLocations? allLocations.filter((location) => {
      return location.toUpperCase().indexOf(cityTextBox.value.toUpperCase()) > -1;
    }): [];


    // get all <li> elements inside the suggestion list
    const suggestionListItems = CitySearchComponent.queryAllByRole('listitem');
    expect(suggestionListItems).toHaveLength(suggestions.length + 1);
    for (let i = 0; i < suggestions.length; i += 1) {
      expect(suggestionListItems[i].textContent).toBe(suggestions[i]);
    }
  });

    test('renders the suggestion text in the textbox upon clicking on the suggestion', async () => {
    const user = userEvent.setup();
    const allEvents = await getEvents(); 
    const allLocations = extractLocations(allEvents);
    CitySearchComponent.rerender(<CitySearch allLocations={allLocations} />);


    const cityTextBox = CitySearchComponent.queryByRole('textbox');
    await user.type(cityTextBox, "Berlin");


    // the suggestion's textContent look like this: "Berlin, Germany"
    const BerlinGermanySuggestion = CitySearchComponent.queryAllByRole('listitem')[0];


    await user.click(BerlinGermanySuggestion);


    expect(cityTextBox).toHaveValue(BerlinGermanySuggestion.textContent);
  });

      test('renders no suggestions list when a matching city is selected', async () => {
        const user = userEvent.setup();
        const allEvents = await getEvents();
        const allLocations = extractLocations(allEvents);
        CitySearchComponent.rerender(<CitySearch allLocations={allLocations} />);
        
        const cityTextBox = CitySearchComponent.queryByRole('textbox');
        await user.type(cityTextBox, "Berlin");

        // Click the suggestion
        const suggestion = CitySearchComponent.queryAllByRole('listitem')[0];
        await user.click(suggestion);

        // After clicking a suggestion, the suggestion list should be hidden (showSuggestions=false)
        expect(CitySearchComponent.queryByRole('list')).not.toBeInTheDocument();
    });

    // NEW TEST TO COVER MISSING BRANCH: No matching cities found
    test('suggestion list contains "See all cities" when query results in no suggestions', async () => {
        const user = userEvent.setup();
        const allEvents = await getEvents();
        const allLocations = extractLocations(allEvents);
        CitySearchComponent.rerender(<CitySearch allLocations={allLocations} />);

        const cityTextBox = CitySearchComponent.queryByRole('textbox');
        // Type text that will definitely not match any city (e.g., 'xyz')
        await user.type(cityTextBox, "xyz");

        // The suggestions array in state should now be empty, but the rendered list should 
        // still contain one <li> for "See all cities".
        const suggestionListItems = CitySearchComponent.queryAllByRole('listitem');
        
        // Expect only 1 list item: "See all cities"
        expect(suggestionListItems).toHaveLength(1);
        expect(suggestionListItems[0].textContent).toBe('See all cities');
    });

        // NEW TEST TO COVER MISSING BRANCH: handleInputChanged without allLocations prop
    test('handleInputChanged handles null allLocations array', async () => {
        const user = userEvent.setup();
        // 1. Re-render the component without the allLocations prop
        CitySearchComponent.rerender(<CitySearch allLocations={undefined} />);
        
        const cityTextBox = CitySearchComponent.queryByRole('textbox');
        
        // 2. Simulate user typing (this forces handleInputChanged to run)
        // The ternary check (allLocations ?) will execute the ': []' branch, covering the line.
        await user.type(cityTextBox, "L");

        // 3. Check that the suggestions list is still being hidden (list should be empty)
        // The component is fine as long as it doesn't crash and the suggestions list is hidden or empty (except for "See all cities")
        
        // Ensure that only the "See all cities" suggestion is shown, as the filter resulted in an empty list
        const suggestionListItems = CitySearchComponent.queryAllByRole('listitem');
        expect(suggestionListItems).toHaveLength(1);
        expect(suggestionListItems[0].textContent).toBe('See all cities');
    });

});