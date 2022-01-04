import React, {useContext, useState } from "react"
import { Card, Button, Alert } from "react-bootstrap"
import { useHistory } from "react-router-dom"
import { signOut  } from "@firebase/auth"
import { auth } from "../../firebase"
import { MoviesContext } from "../../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie } from "../../api/tmdb-api";

export default function Userfile() {
  const [error, setError] = useState("")
  const history = useHistory()
  const {favorites: favouriteMovieIds } = useContext(MoviesContext);
  const {towatches: towatchMovieIds } = useContext(MoviesContext);
  const favoriteMovieQueries = useQueries(
    favouriteMovieIds.map((movieId) => {
      return {
        queryKey: ["movie", { id: movieId }],
        queryFn: getMovie,
      };
    })
  );
  const mustwatchMovieQueries = useQueries(
    towatchMovieIds.map((movieId) => {
      return {
        queryKey: ["movie", { id: movieId }],
        queryFn: getMovie,
      };
    })
  );

  async function handleLogout() {
    setError("")

    try {
      signOut(auth)
      history.push("/")
    } catch {
      setError("Failed to log out")
    }
  }
  var currentUserEmail = "No user login now";
  var currentFavourite = "Unkown";
  var currentMustWatch = "Unkown";
  if (auth.currentUser) {
      currentUserEmail = auth.currentUser.email;
      currentFavourite = favoriteMovieQueries.length;
      currentMustWatch = mustwatchMovieQueries.length;
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email:{currentUserEmail}</strong>
          <br/>
          <strong>Number of current user's favourite film:{currentFavourite}</strong>
          <br/>
          <strong>Number of current user's must watch film:{currentMustWatch}</strong>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button  onClick={handleLogout} style={{backgroundColor:"#FF0000" , border:"#FF0000"}}>
          Log Out
        </Button>
      </div>
    </>
  )
}