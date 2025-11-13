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
     
        allEvents = await getEvents(); 
    });
    
    beforeEach(() => {
       
        EventComponent = render(<Event event={allEvents[0]} />);
    });

    test('renders event title', () => {
      
        expect(EventComponent.queryByText(allEvents[0].summary)).toBeInTheDocument();
    });

    test('renders event location', () => {
     
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

    
        expect(screen.getByText('Javascript offers interactivity', { exact: false })).toBeInTheDocument();
        
     
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