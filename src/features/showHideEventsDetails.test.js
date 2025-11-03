import React from "react";
import { loadFeature, defineFeature } from "jest-cucumber";
import { render, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

const feature = loadFeature("./src/features/showHideEventsDetails.feature");

defineFeature(feature, (test) => {
  test("An event element is collapsed by default", ({ given, when, then }) => {
    let AppComponent;

    given("the user is on the events page,", async () => {
      AppComponent = render(<App />);
    });

    when("the page loads,", async () => {
      // Wait for the list of events to load (checking for the presence of the event list)
      await waitFor(() => {
        expect(screen.getByRole("list")).toBeInTheDocument();
      });
    });

    then("the event details for all events should be hidden.", async () => {
      // FIX: Use querySelector to find the details element by its class name '.details'
      // We query the entire container for elements with the class 'details'
      expect(AppComponent.container.querySelector('.details')).not.toBeInTheDocument();
    });
  });

  test("User can expand an event to see details", ({ given, and, when, then }) => {
    let AppComponent;

    given("an event's details are currently hidden,", async () => {
      AppComponent = render(<App />);
    });

    and("event details are hidden,", async () => {
      // Wait for events to load
      await waitFor(() => {
        expect(screen.getByRole("list")).toBeInTheDocument();
      });
      // FIX: Use querySelector to ensure details are hidden
      expect(AppComponent.container.querySelector('.details')).not.toBeInTheDocument();
    });

    when("the user clicks on an event,", async () => {
      // Find the 'Show Details' button and click it. 
      // Note: Button text is 'show details' or 'hide details', so using /details/i is still best.
      await waitFor(() => {
        // We need to be careful with getAllByRole. We assume the first event's button is the one we want.
        const showDetailsButton = screen.getAllByRole("button", { name: /details/i })[0];
        expect(showDetailsButton).toBeInTheDocument();
        userEvent.click(showDetailsButton);
      });
    });

    then("the event details should be displayed.", async () => {
      // FIX: Wait for the event details to become visible using the class name '.details'
      await waitFor(() => {
        expect(AppComponent.container.querySelector('.details')).toBeInTheDocument();
      });
    });
  });

  test("User can collapse an event to hide details", ({ given, when, then }) => {
    let AppComponent;
    let hideDetailsButton; 

    given("an event's details are currently displayed,", async () => {
      AppComponent = render(<App />);

      await waitFor(() => {
        expect(screen.getByRole("list")).toBeInTheDocument();
      });

      // 1. Click to show details first 
      // We rely on the button text changing to 'hide details'
      const showDetailsButton = screen.getAllByRole("button", {
        name: /details/i,
      })[0];
      await userEvent.click(showDetailsButton);

      // 2. Wait for details to be visible to fulfill the given
      await waitFor(() => {
        // FIX: Check for visibility using the class name '.details'
        expect(AppComponent.container.querySelector('.details')).toBeInTheDocument();
      });

      // The button text should now be 'hide details'
      // We fetch the button again, now ensuring it has the 'hide details' text
      hideDetailsButton = screen.getAllByRole("button", { name: /hide details/i })[0];
      expect(hideDetailsButton).toBeInTheDocument();
    });

    when('the user clicks on the "Hide Details" button of that event,', async () => {
      // Click the button to hide details
      await userEvent.click(hideDetailsButton);
    });

    then("the event's details should be hidden.", async () => {
      // FIX: Assert that the details are no longer visible using the class name '.details'
      await waitFor(() => {
        expect(AppComponent.container.querySelector('.details')).not.toBeInTheDocument();
      });
    });
  });
});

