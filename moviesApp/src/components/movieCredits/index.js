
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState }  from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Link } from "react-router-dom";
import { getMovieCredits } from "../../api/tmdb-api";
// import { excerpt } from "../../util";
import MovieSimilars from "../movieSimilar";
import Fab from "@material-ui/core/Fab";
import Drawer from "@material-ui/core/Drawer";
import NavigationIcon from "@material-ui/icons/Navigation";




const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      listStyle: "none",
      padding: theme.spacing(1.5),
      margin: 0,
    },
    chip: {
      margin: theme.spacing(0.5),
    },
    fab2: {
        position: "fixed",
        bottom: theme.spacing(2),
        left: theme.spacing(20),
      },
  }));

// export default ({ movie }) => {
// const {cast, setCast} = useState([]);
  
//     useEffect(() => {
//       getMovieCredits(movie.id).then(credits => {
//         setCast(credits.cast);
//       }); 
//     }, [movie.id]);

export default function MovieCredits({ movie }) {
        const classes = useStyles();
        const [credits, setCredit]= useState([]);
        const [drawerOpen, setDrawerOpen] = useState(false);
      
        useEffect(() => {
            getMovieCredits(movie.id).then(credits => {
                setCredit(credits.cast);
            }); 
          }, [movie.id]);   


//   const MovieCredits = ({ movie }) => {  // Don't miss this!

  return (
    <>
      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="Credits table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Image</TableCell>
            <TableCell align="center">Actor Name</TableCell>
            <TableCell align="center">Character Name</TableCell>
            <TableCell align="center">More</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {credits.map(c => (
            <TableRow key={c.id}>
              <TableCell component="th" scope="row">
                <img width="100" height="150"
                src={`https://image.tmdb.org/t/p/w500/${c.profile_path}` }
                alt={c.name}
                />
              </TableCell>
              <TableCell >{c.name}</TableCell>
              <TableCell >{c.character}</TableCell>
              <TableCell >
                <Link
                  to={{
                    pathname: `/person/${c.id}`,
                    state: {
                        actorID: c.id,
                    },
                  }}
                >
                  Actor Profile
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Fab variant="extended"
        className={classes.fab2}
        onClick={() =>setDrawerOpen(true)}>
        <NavigationIcon sx={{ mr: 1 }} />
            Similar Movies
        </Fab>
      <Drawer anchor="bottom" open={drawerOpen} onClose={() => setDrawerOpen(false)} closable>
        <MovieSimilars movie={movie} />
      </Drawer>
    </TableContainer>       
    </>
  );
};
