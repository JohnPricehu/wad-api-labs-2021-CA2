import {React} from "react";
import { withRouter } from "react-router-dom";
import PersonDetails from "../components/personDetails";
import PageTemplate from "../components/templatePersonPage";
// import useMovie from "../hooks/useMovie";
import { getPerson } from '../api/tmdb-api'
import { useQuery } from "react-query";
import Spinner from '../components/spinner'
// const Spinner = lazy(() => import("../components/spinner"));
// const PageTemplate = lazy(() => import("../components/templateMoviePage"));
// const PersonDetails = lazy(() => import("../components/personDetails"));

const PersonDetailsPage = (props) => {
  const { id } = props.match.params
  const { data: person, error, isLoading, isError } = useQuery(
    ["person", { id: id }],
    getPerson
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <>
      {person ? (
        <>
          <PageTemplate person={person}>
            <PersonDetails person={person} />
          </PageTemplate>
        </>
      ) : (
        <p>Waiting for person details</p>
      )}
    </>
  );
};

export default withRouter(PersonDetailsPage);