// src/__tests__/App.test.js
import React from "react";
import { render, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { getEvents } from "../api";
import App from "../App";

describe("<App /> component", () => {
  let AppDOM;
  beforeEach(() => {
    AppDOM = render(<App />).container.firstChild;
  });

  test("renders list of events", () => {
    expect(AppDOM.querySelector("#event-list")).toBeInTheDocument();
  });

  test("render CitySearch", () => {
    expect(AppDOM.querySelector("#city-search")).toBeInTheDocument();
  });

  test("renders NumberOfEvents component", () => {
    
    expect(AppDOM.querySelector("#number-of-events")).toBeInTheDocument();
  });

  test("renders a number of events matching the user input", async () => {
    const user = userEvent.setup();
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;

    const NumberOfEventsDOM = AppDOM.querySelector("#number-of-events");
    const numberInput = within(NumberOfEventsDOM).getByRole("textbox");

    await user.type(numberInput, "{backspace}{backspace}10");

    const EventListDOM = AppDOM.querySelector("#event-list");
    const allRenderedEventItems = await within(EventListDOM).findAllByRole(
      "listitem"
    );

    expect(allRenderedEventItems.length).toBe(10);
  });

  test("renders number of events", () => {
    const wrapper = AppDOM.querySelector("#number-of-events");
    const input = within(wrapper).getByRole("textbox");
    expect(input).toBeInTheDocument();
  });

  describe("<App /> integration", () => {
    test("renders a list of events matching the city selected by the user", async () => {
      const user = userEvent.setup();
      const AppComponent = render(<App />);
      const AppDOM = AppComponent.container.firstChild;

      const CitySearchDOM = AppDOM.querySelector("#city-search");
      const CitySearchInput = within(CitySearchDOM).queryByRole("textbox");

      await user.type(CitySearchInput, "Berlin");
      const berlinSuggestionItem =
        within(CitySearchDOM).queryByText("Berlin, Germany");
      await user.click(berlinSuggestionItem);

      const EventListDOM = AppDOM.querySelector("#event-list");
      const allRenderedEventItems =
        within(EventListDOM).queryAllByRole("listitem");

      const allEvents = await getEvents();
      const berlinEvents = allEvents.filter(
        (event) => event.location === "Berlin, Germany"
      );

      expect(allRenderedEventItems.length).toBe(berlinEvents.length);

      allRenderedEventItems.forEach((event) => {
        expect(event.textContent).toContain("Berlin, Germany");
      });
    });

    test("renders the number of events matching the user input", async () => {
      const user = userEvent.setup();
      const { container, getByRole } = render(<App />);
      const numberOfEventsWrapper =
        container.querySelector("#number-of-events");
      const textbox = within(numberOfEventsWrapper).getByRole("textbox");

      await user.clear(textbox);
      await user.type(textbox, "5");

      const eventList = container.querySelector("#event-list");
      const eventItems = await within(eventList).findAllByRole("listitem");

      expect(eventItems.length).toBe(5);
    });
  });
});