// src/__tests__/Event.test.js

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Event from '../components/Event';
import { getEvents } from '../api';

describe('<Event /> component', () => {
    let EventComponent;
    let allEvents;

    beforeAll(async () => {
        // Fetch all events using the utility function, which returns mockData
        allEvents = await getEvents(); 
    });

    beforeEach(() => {
        // Render the Event component for the first event in the list
        EventComponent = render(<Event event={allEvents[0]} />);
    });

    test('renders event title', () => {
        // Check for the event's summary/title
        // The first event's summary is 'Learn JavaScript'
        expect(EventComponent.queryByText(allEvents[0].summary)).toBeInTheDocument();
    });

    test('renders event start time', () => {
        // The mock data structure has the start time in allEvents[0].start.dateTime, e.g., '2020-05-19T16:00:00+02:00'
        // For simplicity, we can check for a part of the date or use the created date as suggested in the task.
        // Let's use a part of the start time string for robustness, or the full 'created' string.
        // I will use the 'created' key as per the task directions for now:
        // allEvents[0].created is '2020-05-19T19:17:46.000Z'
        expect(EventComponent.queryByText(allEvents[0].created)).toBeInTheDocument();
    });

    test('renders event location', () => {
        // Check for the event's location, which is 'London, UK' for the first event
        expect(EventComponent.queryByText(allEvents[0].location)).toBeInTheDocument();
    });

    test('renders event details button with the title (show details)', () => {
        // Figure 22 shows a test for a 'show details' button
        expect(EventComponent.queryByText('show details')).toBeInTheDocument();
    });

     test('by default, event details section should be hidden', () => {
        // Check for the element containing the event's description
        expect(EventComponent.queryByText(allEvents[0].description)).not.toBeInTheDocument();
    });

    test('shows the details section when the user clicks on the "show details" button', async () => {
        const user = userEvent.setup();
        // Get the button by its current text
        const showDetailsButton = screen.getByText('show details');
        
        // Simulate click on the 'show details' button
        await user.click(showDetailsButton);

        // Check if the details (description) are now visible
        expect(screen.getByText('Javascript offers interactivity', { exact: false })).toBeInTheDocument();
        
        // Check if the button text has changed to 'hide details'
        expect(screen.getByText('hide details')).toBeInTheDocument();
        expect(screen.queryByText('show details')).not.toBeInTheDocument();
    });

    test('hides the details section when the user clicks on the "hide details" button', async () => {
        const user = userEvent.setup();
        
        // Note: Because of the beforeEach setup, the component starts in the collapsed state.
        // We must click to show the details first.
        let detailsButton = screen.getByText('show details');
        await user.click(detailsButton);

        // Now the button should read 'hide details'. Get the new reference.
        detailsButton = screen.getByText('hide details');
        
        // Simulate click on the 'hide details' button
        await user.click(detailsButton);

        // Check if the details (description) are now hidden
       expect(screen.queryByText('Javascript offers interactivity', { exact: false })).not.toBeInTheDocument();

        // Check if the button text has changed back to 'show details'
        expect(screen.getByText('show details')).toBeInTheDocument();
        expect(screen.queryByText('hide details')).not.toBeInTheDocument();
    });
});