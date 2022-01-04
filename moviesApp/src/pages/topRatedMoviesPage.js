import {React} from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from 'react-query'
import Spinner from '../components/spinner'
import {getTopRatedMovies} from '../api/tmdb-api'
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'
// const Spinner = lazy(() => import("../components/spinner"));
// const PageTemplate = lazy(() => import("../components/templateMoviePage"));
// const AddToFavoritesIcon = lazy(() => import("../components/cardIcons/addToFavorites"));

const TopRatedMoviesPage = (props) => {
  const {  data, error, isLoading, isError }  = useQuery('discover4', getTopRatedMovies)

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const movies = data.results;

  // Redundant, but necessary to avoid app crashing.
  const favorites = movies.filter(m => m.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))
  // const addToFavorites = (movieId) => true 

  return (
    <PageTemplate
      title="Top rated Movies"
      movies={movies}
      action={(movie) => {
        return <AddToFavoritesIcon movie={movie} />
      }}
    />
);
};

export default TopRatedMoviesPage;