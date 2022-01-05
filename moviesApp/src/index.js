import {React,lazy,Suspense} from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
// import HomePage from "./pages/homePage";
// import MoviePage from "./pages/movieDetailsPage";
import PersonPage from "./pages/personDetailsPage";
// import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
// import FavoriteMoviesPage from "./pages/favoriteMoviesPage"; // NEW
// import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader';
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import MoviesContextProvider from "./contexts/moviesContext";
// import AddMovieReviewPage from './pages/addMovieReviewPage';
// import MustwatchMoviesPage from "./pages/mustWatchMoviesPage"; 
// import NowPlayingMoviesPage from "./pages/nowPlayingMoviesPage";
// import TopRatedMoviesPage from "./pages/topRatedMoviesPage";
import SignUpPage from "./pages/signupPage";
import LogInPage from "./pages/loginPage";
// import UserFilePage from "./pages/userFilePage";
import "bootstrap/dist/css/bootstrap.min.css"

const HomePage = lazy(() => import("./pages/homePage"));
const MoviePage = lazy(() => import("./pages/movieDetailsPage"));
const UpcomingMoviesPage = lazy(() => import("./pages/upcomingMoviesPage"));
const FavoriteMoviesPage = lazy(() => import("./pages/favoriteMoviesPage"));
const MovieReviewPage = lazy(() => import("./pages/movieReviewPage"));
const AddMovieReviewPage = lazy(() => import("./pages/addMovieReviewPage"));
const MustwatchMoviesPage = lazy(() => import("./pages/mustWatchMoviesPage"));
const NowPlayingMoviesPage = lazy(() => import("./pages/nowPlayingMoviesPage"));
const TopRatedMoviesPage = lazy(() => import("./pages/topRatedMoviesPage"));








const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});

export const App =()=>{
  return(       
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
      <Suspense fallback={<h1> Loading component </h1>} >
        <SiteHeader />
        </Suspense>
        <MoviesContextProvider>
            {" "}
            <Suspense fallback={<h2>Loading page</h2>}>
      <Switch>
        {/* <Route path="/userfile" component={UserFilePage} /> */}
        <Route exact path="/signup" component={SignUpPage} />
        <Route exact path="/login" component={LogInPage} />
        <Route exact path="/movies/top-rated" component={TopRatedMoviesPage} />
        <Route exact path="/movies/now-playing" component={NowPlayingMoviesPage} />
        <Route exact path="/movies/mustwatch" component={MustwatchMoviesPage} />
        <Route exact path="/reviews/form" component={AddMovieReviewPage} />
        <Route exact path="/movies/upcoming" component={UpcomingMoviesPage} />
        <Route path="/reviews/:id" component={MovieReviewPage} />
        <Route exact path="/movies/favorites" component={FavoriteMoviesPage} />
        <Route path="/movies/:id" component={MoviePage} />
        <Route path="/person/:id" component={PersonPage} />
        <Route exact path="/" component={HomePage} />
        <Redirect from="*" to="/" />
      </Switch>
      </Suspense>
        </MoviesContextProvider>
        
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
ReactDOM.render(<App />, document.getElementById("root"));