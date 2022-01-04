import React from "react";
import PersonDetails from "../components/personDetails";
import SampleMovie from "./samplePersonData";
import { MemoryRouter } from "react-router";

export default {
  title: "Person Details Page/PersonDetails",
  component: PersonDetails,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
  ],
};

export const Basic = () => <PersonDetails person={SampleMovie} />;

Basic.storyName = "Default";
