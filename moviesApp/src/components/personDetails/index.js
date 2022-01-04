import React from "react";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

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
}));

  const PersonDetails = ({ person }) => {  // Don't miss this!
  const classes = useStyles();

  return (
    <>
      <Typography variant="h5" component="h3">
        Biography
      </Typography>

      <Typography variant="h6" component="p">
        {person.biography}
      </Typography>

      <Paper component="ul" className={classes.root}>
        <li>
          <Chip label="Birthday" className={classes.chip} color="primary" />
        </li>
          <li key="bd">
            <Chip label={person.birthday} className={classes.chip} />
          </li>
      </Paper>

      <Paper component="ul" className={classes.root}>
        <li>
          <Chip label="Place of Birth" className={classes.chip} color="primary" />
        </li>
          <li key="pof">
          <Chip label={person.place_of_birth} className={classes.chip} />          
          </li>
      </Paper>
      
    </>
  );
};
export default  PersonDetails ;