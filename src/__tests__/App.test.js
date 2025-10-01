// src/__tests__/App.test.js
import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';


describe('<App /> component', () => {
  let AppDOM;
  beforeEach(() => {
    AppDOM = render(<App />).container.firstChild;
  })


  test('renders list of events', () => {
    expect(AppDOM.querySelector('#event-list')).toBeInTheDocument();
  });


  test('render CitySearch', () => {
    expect(AppDOM.querySelector('#city-search')).toBeInTheDocument();
  });

    test('renders NumberOfEvents component', () => {
    // Check for the component using its unique ID
    expect(AppDOM.querySelector('#number-of-events')).toBeInTheDocument();
  });
  
});