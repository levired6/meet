# Meet App - Serverless PWA with React

## Overview

This project is a serverless, progressive web application (PWA) built with React, utilizing a Test-Driven Development (TDD) approach. The application integrates with the Google Calendar API to fetch and display upcoming events, allowing users to search for events in specific cities. It is designed to be highly scalable, performant, and to provide an excellent user experience, including offline capabilities and data visualization.

## Objective

To build a serverless, progressive web application (PWA) with React using a test-driven development (TDD) technique. The application uses the Google Calendar API to fetch upcoming events and visualizes event data through charts.

## Context

The "Meet App" combines serverless architecture with Progressive Web App (PWA) features to deliver a modern, efficient, and user-friendly experience. This project demonstrates key web development skills including serverless functions (AWS Lambda), OAuth2 authentication, React development with TDD, and data visualization. The PWA aspects ensure instant loading, offline support, and installability on various devices.

## Key Features

The Meet App provides the following core functionalities:

* **Filter Events by City:** Users can search for and filter events by their city.
* **Show/Hide Event Details:** Events are displayed concisely, with the option to expand for more information.
* **Specify Number of Events:** Users can control how many events are displayed on the page.
* **Use the App When Offline:** The application is designed to function even without an internet connection, displaying cached data.
* **Add an App Shortcut to the Home Screen:** Users can install the app directly to their device's home screen for quick access.
* **Display Charts Visualizing Event Details:** Data visualization helps users understand event distribution and genre popularity.

## User Stories (Features 2-6)

Here are the user stories for the specified features, outlining the user's role, desired action, and benefit:

### Feature 2: Show/Hide Event Details
* **As a user,** I should be able to expand an event, **so that** I can see its full details.
* **As a user,** I should be able to collapse an event, **so that** I can hide its details and see more events.

### Feature 3: Specify Number of Events
* **As a user,** I should be able to specify the number of events displayed, **so that** I can control how many events I see on the page.

### Feature 4: Use the App When Offline
* **As a user,** I should be able to use the app when offline, **so that** I can view previously loaded event data without an internet connection.
* **As a user,** I should be able to receive an error message when changing search settings offline, **so that** I understand why new data cannot be fetched.

### Feature 5: Add an App Shortcut to the Home Screen
* **As a user,** I should be able to add an app shortcut to my home screen, **so that** I can quickly access the Meet app like a native application.

### Feature 6: Display Charts Visualizing Event Details
* **As a user,** I should be able to view charts visualizing event details, **so that** I can easily understand event distribution and popularity.

---

## Scenarios (Gherkin Syntax for All 6 Features)

Below are the detailed scenarios for each feature, written in Gherkin's Given-When-Then format, which will serve as the basis for test-driven development.

### Feature 1: Filter Events By City

**Scenario 1: When user hasn't searched for a city, show upcoming events from all cities.**
```gherkin
Given the user is on the main events page
And the search field is empty
When the app loads
Then all upcoming events from all cities should be displayed

Scenario 2: User should see a list of suggestions when they search for a city.

Given the user is on the main events page
When the user types "Berlin" into the city search field
Then a list of city suggestions, including "Berlin, Germany", should appear

Scenario 3: User can select a city from the suggested list.

Given the user has typed a city name and a list of suggestions is displayed
When the user selects "Berlin, Germany" from the suggestions
Then only events for "Berlin, Germany" should be displayed

Feature 2: Show/Hide Event Details
Scenario 1: An event element is collapsed by default.

Given the user is on the main events page
When the events are displayed
Then each event element should be collapsed, showing only basic information

Scenario 2: User can expand an event to see details.

Given an event element is collapsed
When the user clicks the "show details" button for an event
Then the event element should expand to reveal full details

Scenario 3: User can collapse an event to hide details.

Given an event element is expanded
When the user clicks the "hide details" button for that event
Then the event element should collapse to hide full details

Feature 3: Specify Number of Events
Scenario 1: When user hasn't specified a number, 32 events are shown by default.

Given the user is on the main events page
And the number of events input is empty
When the app loads or refreshes
Then 32 events should be displayed by default

Scenario 2: User can change the number of events displayed.

Given 32 events are currently displayed
When the user changes the number of events input to "10"
Then 10 events should be displayed

Feature 4: Use the App When Offline
Scenario 1: Show cached data when there's no internet connection.

Given the user has previously viewed events while online
And there is currently no internet connection
When the user opens the app
Then previously cached event data should be displayed

Scenario 2: Show error when user changes search settings (city, number of events).

Given the user is offline
When the user attempts to change the city or number of events
Then an error message indicating no internet connection should be displayed
And no new data should be fetched

Feature 5: Add an App Shortcut to the Home Screen
Scenario 1: User can install the meet app as a shortcut on their device home screen.

Given the user is browsing the Meet app on a compatible device
When the "Add to Home Screen" prompt appears or the user uses the browser's install option
Then the Meet app icon should be added to the device's home screen
And the app should launch as a standalone application when opened from the shortcut

Feature 6: Display Charts Visualizing Event Details
Scenario 1: Show a chart with the number of upcoming events in each city.

Given the user is on the main events page
And event data for multiple cities is available
When the user views the main page
Then a chart visualizing the number of events per city shou