Feature: Specify Number of Events
As a user,
I want to be able to specify the maximum number of events displayed,
So that I can control the length of the event list.

Scenario: When user hasn’t specified a number, 36 events are shown by default
Given the user hasn’t specified a number of events,
When the user sees the event list,
Then 36 events should be displayed.

Scenario: User can change the number of events they want to see
Given the user is viewing the list of events,
When the user enters a specific number (e.g., 10) into the "Number of Events" textbox,
Then the event list should be updated to display a maximum of that many events.