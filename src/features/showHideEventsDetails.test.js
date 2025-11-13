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
      await waitFor(() => {
        expect(screen.getByRole("list")).toBeInTheDocument();
      });
    });

    then("the event details for all events should be hidden.", async () => {
      expect(
        AppComponent.container.querySelector(".details")
      ).not.toBeInTheDocument();
    });
  });

  test("User can expand an event to see details", ({
    given,
    and,
    when,
    then,
  }) => {
    let AppComponent;

    given("an event's details are currently hidden,", async () => {
      AppComponent = render(<App />);
    });

    and("event details are hidden,", async () => {
      await waitFor(() => {
        expect(screen.getByRole("list")).toBeInTheDocument();
      });

      expect(
        AppComponent.container.querySelector(".details")
      ).not.toBeInTheDocument();
    });

    when("the user clicks on an event,", async () => {
      await waitFor(() => {
        const showDetailsButton = screen.getAllByRole("button", {
          name: /details/i,
        })[0];
        expect(showDetailsButton).toBeInTheDocument();
        userEvent.click(showDetailsButton);
      });
    });

    then("the event details should be displayed.", async () => {
      await waitFor(() => {
        expect(
          AppComponent.container.querySelector(".details")
        ).toBeInTheDocument();
      });
    });
  });

  test("User can collapse an event to hide details", ({
    given,
    when,
    then,
  }) => {
    let AppComponent;
    let hideDetailsButton;

    given("an event's details are currently displayed,", async () => {
      AppComponent = render(<App />);

      await waitFor(() => {
        expect(screen.getByRole("list")).toBeInTheDocument();
      });

      const showDetailsButton = screen.getAllByRole("button", {
        name: /details/i,
      })[0];
      await userEvent.click(showDetailsButton);

      await waitFor(() => {
        expect(
          AppComponent.container.querySelector(".details")
        ).toBeInTheDocument();
      });

      hideDetailsButton = screen.getAllByRole("button", {
        name: /hide details/i,
      })[0];
      expect(hideDetailsButton).toBeInTheDocument();
    });

    when(
      'the user clicks on the "Hide Details" button of that event,',
      async () => {
        await userEvent.click(hideDetailsButton);
      }
    );

    then("the event's details should be hidden.", async () => {
      await waitFor(() => {
        expect(
          AppComponent.container.querySelector(".details")
        ).not.toBeInTheDocument();
      });
    });
  });
});
