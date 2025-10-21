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
        // Assuming getEvents() returns the mock data array required for testing
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

    test('renders event location', () => {
        // Check for the event's location, which is 'London, UK' for the first event
        expect(EventComponent.queryByText(allEvents[0].location)).toBeInTheDocument();
    });

    test('renders event details button with the title (show details)', () => {
        expect(EventComponent.queryByText('show details')).toBeInTheDocument();
    });

     test('by default, event details section should be hidden', () => {
        expect(EventComponent.queryByText(allEvents[0].description)).not.toBeInTheDocument();
    });

    test('shows the details section when the user clicks on the "show details" button', async () => {
        const user = userEvent.setup();
        const showDetailsButton = screen.getByText('show details');
        await user.click(showDetailsButton);

        // Check if the details (description) are now visible
        expect(screen.getByText('Javascript offers interactivity', { exact: false })).toBeInTheDocument();
        
        // Check if the button text has changed to 'hide details'
        expect(screen.getByText('hide details')).toBeInTheDocument();
        expect(screen.queryByText('show details')).not.toBeInTheDocument();
    });

  test("hides the details section when the user clicks on the 'hide details' button", async () => {
    const user = userEvent.setup();

    await user.click(EventComponent.queryByText('show details'));
    expect(EventComponent.container.querySelector('.details')).toBeInTheDocument();
    expect(EventComponent.queryByText('hide details')).toBeInTheDocument();
    expect(EventComponent.queryByText('show details')).not.toBeInTheDocument();

    await user.click(EventComponent.queryByText('hide details'));
    expect(EventComponent.container.querySelector('.details')).not.toBeInTheDocument();
    expect(EventComponent.queryByText('hide details')).not.toBeInTheDocument();
    expect(EventComponent.queryByText('show details')).toBeInTheDocument();
  });
});