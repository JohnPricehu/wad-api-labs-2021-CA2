import React, { useEffect, useState }  from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import { getMovieSimilar } from "../../api/tmdb-api";
import { excerpt } from "../../util";
// import Fab from "@material-ui/core/Fab";
// import Drawer from "@material-ui/core/Drawer";
// import NavigationIcon from "@material-ui/icons/Navigation";
// import MovieCredits from "../movieCredits";

const useStyles = makeStyles((theme) =>({
  table: {
    minWidth: 550,
  }, 
  
}));

export default function MovieSimilars({ movie }) {
  const classes = useStyles();
  const [similars, setSimilar] = useState([]);


  useEffect(() => {
    getMovieSimilar(movie.id).then(similars => {
      setSimilar(similars);
    });
    
  }, [movie.id]);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="Similar films table">
        <TableHead>
          <TableRow>
            <TableCell >Name</TableCell>
            <TableCell align="center">Popularity</TableCell>
            <TableCell align="center">Overview</TableCell>
            <TableCell align="center">More</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {similars.map((s) => (
            <TableRow key={s.id}>
              <TableCell component="th" scope="row">
                {s.title}
              </TableCell>
              <TableCell >{s.popularity}</TableCell>
              <TableCell >{excerpt(s.overview)}</TableCell>
              <TableCell >
                <Link
                  to={{
                    pathname: `/movies/${s.id}`,
                    state: {
                      similar: s,
                      movie: movie,
                    },
                  }}
                >
                  Full details
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
    </TableContainer>
  );
}