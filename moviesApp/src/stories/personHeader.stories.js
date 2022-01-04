import React from "react";
import PersonHeader from "../components/headerPerson";
import SampleMovie from "./samplePersonData";
import { MemoryRouter } from "react-router";


export default {
  title: "Person Details Page/PersonHeader",
  component: PersonHeader,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
  ],
};

export const Basic = () => <PersonHeader person={SampleMovie} />;

Basic.storyName = "Default";
