import React from 'react';
import { loadFeature, defineFeature } from 'jest-cucumber';
// Ensure fireEvent is imported for the most reliable way to change input values
import { render, screen, waitFor, fireEvent } from '@testing-library/react'; 
import App from '../App';
import NumberOfEvents from '../components/NumberOfEvents'; 

// Load the Gherkin feature file
const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

// Define the feature and scenarios for testing
defineFeature(feature, test => {
  let AppComponent;

  // SCENARIO 1: When user hasn’t specified a number, 36 events are shown by default
  test('When user hasn’t specified a number, 36 events are shown by default', ({ given, when, then }) => {
    
    given('the user hasn’t specified a number of events,', () => {
        AppComponent = render(<App />);
        // Query by accessible name (relies on correct NumberOfEvents.jsx implementation)
        const numberOfEventsInput = screen.getByRole('textbox', { name: /Number of Events/i });
        expect(numberOfEventsInput).toHaveValue(36);
    });

    when('the user sees the event list,', async () => { 
        await waitFor(() => {
            const EventListDOM = AppComponent.container.querySelector('#event-list');
            expect(EventListDOM).toBeInTheDocument();
        });
    });

    then(/^(\d+) events should be displayed.$/, async (expectedCount) => {
        await waitFor(() => {
            const eventListItems = AppComponent.container.querySelector('#event-list').querySelectorAll('li');
            expect(eventListItems.length).toBe(parseInt(expectedCount)); 
        }, { timeout: 5000 });
    });
  });

  // SCENARIO 2: User can change the number of events they want to see
  test('User can change the number of events they want to see', ({ given, when, then }) => {
    
    given('the user is viewing the list of events,', async () => {
        AppComponent = render(<App />);

        await waitFor(() => {
            const EventListDOM = AppComponent.container.querySelector('#event-list');
            expect(EventListDOM).toBeInTheDocument();
        });
    });

    when(/^the user enters a specific number \(e.g., (\d+)\) into the "(.*)" textbox,$/, 
        async (newNumberString) => {
        
        const numberOfEventsInput = screen.getByRole('textbox', { name: /Number of Events/i });
        
        // Use fireEvent.change to directly set the value
        fireEvent.change(numberOfEventsInput, { target: { value: newNumberString } });
        
        expect(numberOfEventsInput).toHaveValue(parseInt(newNumberString));
    });

    then('the event list should be updated to display a maximum of that many events.', async () => {
        const numberOfEventsInput = screen.getByRole('textbox', { name: /Number of Events/i });
        const expectedCount = parseInt(numberOfEventsInput.value);
        
        await waitFor(() => {
            const eventListItems = AppComponent.container.querySelector('#event-list').querySelectorAll('li');
            expect(eventListItems.length).toBe(expectedCount);
        }, { timeout: 5000 }); 
    });
  });
});

// --- UNIT TESTS FOR NUMBEROFEVENTS COMPONENT (FIXED) ---
describe('<NumberOfEvents /> component (Unit)', () => {
    let NumberOfEventsComponent;
    
    // Mock functions for required props
    const mockSetCurrentNOE = jest.fn();
    const mockSetErrorAlert = jest.fn();
    const testNOE = 36; 
    
    beforeEach(() => {
        NumberOfEventsComponent = render(
            <NumberOfEvents 
                currentNOE={testNOE} 
                setCurrentNOE={mockSetCurrentNOE}
                setErrorAlert={mockSetErrorAlert} 
            />
        );
        mockSetCurrentNOE.mockClear();
        mockSetErrorAlert.mockClear();
    });

    // Test 1: Check if the number input element exists
    test('renders number input textbox', () => {
        // Query by the accessible name, which is now correct
        const numberInput = NumberOfEventsComponent.queryByRole('textbox', { name: /Number of Events/i });
        expect(numberInput).toBeInTheDocument();
    });

    // Test 2: Check default value is 36 
    test('default value is 36', () => {
        const numberInput = NumberOfEventsComponent.queryByRole('textbox', { name: /Number of Events/i });
        expect(numberInput).toHaveValue(testNOE); 
    });

    // Test 3: Check if value changes when user types in the input
    test('value changes when user types in the input', () => {
        const numberInput = NumberOfEventsComponent.queryByRole('textbox', { name: /Number of Events/i });
        const newValue = '10'; // Value to simulate typing
        
        // 1. Simulate user typing
        fireEvent.change(numberInput, { target: { value: newValue } });

        // Assert that the state update function was called correctly
        expect(mockSetCurrentNOE).toHaveBeenCalledTimes(1);
        expect(mockSetCurrentNOE).toHaveBeenCalledWith(parseInt(newValue)); 
        
        // 2. Manually trigger re-render with the new prop value
        // This simulates the parent App component updating the 'currentNOE' prop
        NumberOfEventsComponent.rerender(
            <NumberOfEvents 
                currentNOE={parseInt(newValue)} // New value is 10
                setCurrentNOE={mockSetCurrentNOE}
                setErrorAlert={mockSetErrorAlert} 
            />
        );

        // 3. Assert the input value is now the new number
        expect(numberInput).toHaveValue(10);
        
        // Check if the error alert was cleared
        expect(mockSetErrorAlert).toHaveBeenCalledWith("");
    });
});