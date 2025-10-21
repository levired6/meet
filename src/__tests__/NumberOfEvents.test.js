// src/__tests__/NumberOfEvents.test.js
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberOfEvents from '../components/NumberOfEvents';
import React from 'react';

describe('<NumberOfEvents /> component', () => {

  function MockedNumberOfEvents() {
    const [currentNOE, setCurrentNOE] = React.useState(32);
    const [errorAlert, setErrorAlert] = React.useState("");
     return (
        <NumberOfEvents
          currentNOE={currentNOE}
          setCurrentNOE={setCurrentNOE}
          errorAlert={errorAlert}
          setErrorAlert={setErrorAlert}
        />
    );
  }

  test('renders textbox for specifying number of events', () => {
    render(<MockedNumberOfEvents />);
    const textbox = screen.getByRole('textbox');
    expect(textbox).toBeInTheDocument();
  });

  test('default value is 32', () => {
    render(<MockedNumberOfEvents />);
    const textbox = screen.getByRole('textbox');
    expect(textbox).toHaveValue(32);
  });

  test('value changes when user types a new number', async () => {
    const user = userEvent.setup();
    render(<MockedNumberOfEvents />);
    const textbox = screen.getByRole('textbox');
    await user.clear(textbox);
    await user.type(textbox, '10');
    expect(textbox).toHaveValue(10);
  });

  test('user can delete and type a new number with backspace', async () => {
    const user = userEvent.setup();
    render(<MockedNumberOfEvents />);
    const textbox = screen.getByRole('textbox');
    await user.type(textbox, '{backspace}{backspace}25');
    expect(textbox).toHaveValue(25);
  });
});