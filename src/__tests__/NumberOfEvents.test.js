// src/__tests__/NumberOfEvents.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberOfEvents from '../components/NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
    let NumberOfEventsComponent;
    
    // We only need to render it once before all tests
    beforeEach(() => {
        // Mock the setNumberOfEvents prop (we'll need it later in integration)
        NumberOfEventsComponent = render(
            <NumberOfEvents setNumberOfEvents={() => {}} />
        );
    });

    // Test 1: Component contains a textbox (input field)
    test('renders a text input with role="textbox"', () => {
        const numberTextBox = screen.queryByRole('textbox');
        expect(numberTextBox).toBeInTheDocument();
        expect(numberTextBox).toHaveClass('number-of-events-input');
    });

    // Test 2: Default value of the input field is 32
    test('default value of the input field is 32', () => {
        const numberTextBox = screen.getByRole('textbox');
        expect(numberTextBox).toHaveValue('32');
    });

    // Test 3: The input value changes when a user types in it
    test('value of the input field changes when a user types in it', async () => {
        const user = userEvent.setup();
        const numberTextBox = screen.getByRole('textbox');
        
        // Initial value is 32. We type '10'.
        // We use {backspace} to clear the existing '32' before typing '10'
        await user.type(numberTextBox, '{backspace}{backspace}10'); 

        // This test will FAIL initially because the component is hardcoded to value={32}
        expect(numberTextBox).toHaveValue('10');
    });
});