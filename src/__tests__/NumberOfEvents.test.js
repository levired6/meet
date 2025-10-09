// src/__tests__/NumberOfEvents.test.js

import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberOfEvents from '../components/NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
    let NumberOfEventsComponent;
    
    // We only need to render it once before all tests
    beforeEach(() => {
        // Mock the setNumberOfEvents prop (we'll need it later in integration)
        NumberOfEventsComponent = render(
            <NumberOfEvents
				currentNOE={32}
				setCurrentNOE={() => {}}
                />);
    });

    // Test 1: Component contains a textbox (input field)
    test('renders number of events text input', () => {
        const numberTextBox = NumberOfEventsComponent.queryByRole('textbox');
        expect(numberTextBox).toBeInTheDocument();
        expect(numberTextBox).toHaveClass('number-of-events-input');
    });

    // Test 2: Default value of the input field is 32
    test('default number is 32', () => {
        const numberTextBox = NumberOfEventsComponent.queryByRole('textbox');
        expect(numberTextBox).toHaveValue('32');
    });

    // Test 3: The input value changes when a user types in it
    test('number of events text box value changes when the user types in it', async () => {
        const user = userEvent.setup();
        const numberTextBox = NumberOfEventsComponent.queryByRole('textbox');
        
        // Initial value is 32. We type '10'.
        // We use {backspace} to clear the existing '32' before typing '10'
        await user.type(numberTextBox, '{backspace}{backspace}10'); 

        // This test will FAIL initially because the component is hardcoded to value={32}
        expect(numberTextBox).toHaveValue('10');
    });
});