Feature: Show/Hide Event Details
As a user,
I want to be able to show and hide the details for an event,
So that I can control the amount of information displayed on the screen.

Scenario: An event element is collapsed by default
Given the user is on the events page,
When the page loads,
Then the event details for all events should be hidden.

Scenario: User can expand an event to see details
Given an event's details are currently hidden,
And event details are hidden,
When the user clicks on an event,
Then the event details should be displayed.

Scenario: User can collapse an event to hide details
Given an event's details are currently displayed,
When the user clicks on the "Hide Details" button of that event,
Then the event's details should be hidden.