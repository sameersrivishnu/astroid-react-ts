import React, { useState, useCallback } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import API from "./../../API/API";
import { API_KEY } from "./../../Helpers/Constants";
// API
const api = new API();

const useStyles = makeStyles(theme => ({
  searchContainer: {
    border: "1px solid #e2d2d2",
    padding: theme.spacing(3, 2)
  },
  buttonContainer: {
    margin: theme.spacing(1, 0),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  infoContainer: {
    color: theme.palette.success.main
  },
  detailsWrapper: {
    marginTop: theme.spacing(1),
    border: "1px solid #e2d2d2",
    padding: theme.spacing(3, 2)
  },
  itemContainer: {
    marginBottom: theme.spacing(1),
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingBottom: theme.spacing(1),
    borderBottom: "1px solid #e2e2e2"
  },
  titleContainer: {
    width: "25%"
  },
  loaderContainer: {
    textAlign: "center"
  }
}));

/**
 * Get Asteroid base
 */
export default function TopBar() {
  const classes = useStyles();
  const [asteroidId, setAsteroidId] = useState("");
  const [asteroidData, setAsteroidData] = useState(null as any);
  const [isBusy, setIsBusy] = useState(false);

  const handleChange = useCallback(e => {
    setAsteroidId(e.target.value);
  }, []);

  const searchAsteroid = useCallback(() => {
    if (asteroidId) {
      console.log("searchAsteroid -> asteroidId", asteroidId);
      setIsBusy(true);
      api.get(`neo/${asteroidId}?api_key=${API_KEY}`).then(response => {
        console.log("searchAsteroid -> response", response);
        setIsBusy(false);
        if (response) {
          setAsteroidData(response);
        }
      });
    }
  }, [asteroidId]);

  const getRandomAsteroidData = useCallback(() => {
    setIsBusy(true);
    api.get(`neo/browse?api_key=${API_KEY}`).then(response => {
      setIsBusy(false);
      if (
        response &&
        response.near_earth_objects &&
        response.near_earth_objects.length
      ) {
        const asteroidId = Math.floor(Math.random() * 20);
        setAsteroidData(response.near_earth_objects[asteroidId]);
        setAsteroidId(response.near_earth_objects[asteroidId].id);
      }
    });
  }, []);

  return (
    <Box style={{ width: '99%', marginLeft: 7 }}>
      <Box className={classes.searchContainer}>
        <TextField
          id="outlined-basic"
          label="Enter Asteroid Id"
          variant="outlined"
          onChange={handleChange}
          fullWidth
          value={asteroidId}
        />
        <Box className={classes.buttonContainer}>
          <Button
            variant="contained"
            color="secondary"
            onClick={searchAsteroid}
          >
            Search
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={getRandomAsteroidData}
          >
            Random
          </Button>
        </Box>
      </Box>
      <Box className={classes.detailsWrapper}>
        {isBusy ? (
          <Box className={classes.loaderContainer}>
            <CircularProgress color="secondary" />
          </Box>
        ) : (
          <React.Fragment>
            {asteroidData ? (
              <Box>
                <Box className={classes.infoContainer}>
                  <Typography variant="h6" gutterBottom>
                    Successfully got the asteroid data.
                  </Typography>
                </Box>
                <Box className={classes.itemContainer}>
                  <Box className={classes.titleContainer}>ID:....</Box>
                  <Box>{asteroidData.id}</Box>
                </Box>
                <Box className={classes.itemContainer}>
                  <Box className={classes.titleContainer}>Name:</Box>
                  <Box>{asteroidData.name}</Box>
                </Box>
                <Box className={classes.itemContainer}>
                  <Box className={classes.titleContainer}>NASA JPL URL:</Box>
                  <Box>{asteroidData.nasa_jpl_url}</Box>
                </Box>
                <Box className={classes.itemContainer}>
                  <Box className={classes.titleContainer}>
                    Potentially Hazardous Asteroid:
                  </Box>
                  <Box>
                    {asteroidData.is_potentially_hazardous_asteroid
                      ? "Yes"
                      : "No"}
                  </Box>
                </Box>
              </Box>
            ) : (
              <Box>
                Please search with Asteroid Id or Click on Random.
              </Box>
            )}
          </React.Fragment>
        )}
      </Box>
    </Box>
  );
}
