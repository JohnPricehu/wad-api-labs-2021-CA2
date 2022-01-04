import React from "react";
import PersonHeader from "../headerPerson";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  gridList: {
    width: 450,
    height: '100vh',
  },
}));

const TemplatePersonPage = ({ person, children }) => {
  const classes = useStyles();

  return (
    <>
      <PersonHeader person={person} />

      <Grid container spacing={5} style={{ padding: "15px" }}>
        <Grid item xs={3}>
          <div className={classes.root}>
            <GridList cellHeight={500} className={classes.gridList} cols={1}>
            <img
                        src={
                            person.profile_path
                                ? `https://image.tmdb.org/t/p/w300/${person.profile_path}`
                                : "./film-poster-placeholder.png"
                        }
                        className="people"
                        alt={person.name}
                    />
            </GridList>
          </div>
        </Grid>

        <Grid item xs={9}>
          {children}
        </Grid>
      </Grid>
    </>
  );
};

export default TemplatePersonPage;