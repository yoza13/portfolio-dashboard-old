import React, { useContext, useState } from "react";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Card,
  CardHeader,
  Container,
  Stack,
  TextField,
} from "@mui/material";
import AppContext from "../../ApplicationContext";
import { useStyles } from "../../useStyles";
import TemperatureDetails from "./TemperatureDetails";

export default function WeatherSearch() {
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [temperature, setTemperature] = useState({});
  const [isError, setIsError] = useState(false);
  const { isDarkTheme } = useContext(AppContext);
  const classes = useStyles({ isDarkTheme });
  const callApi = async () => {
    const result = await fetch("http://localhost:5000/api/weather-search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        state,
        city,
        zip,
      }),
    });
    const { weatherData } = await result.json();
    if (weatherData.cod === 200) {
      setIsError(false);
      setTemperature(weatherData);
    } else {
      setIsError(true);
      setTemperature({});
    }
    setCity("");
    setState("");
    setZip("");
  };
  const isButtonDisabled = !(
    city.length > 0 ||
    state.length > 0 ||
    zip.length > 0
  );

  return (
    <Container className={classes.appContainer}>
      <Box className={classes.contentBox}>
        <Card sx={{ marginTop: "2rem", marginBottom: "2rem" }}>
          <CardHeader
            title="Weather App"
            subheader="Enter any of the below details for getting the temperature in celsious to the entered place"
          />
          <Box
            component="form"
            autoComplete="off"
            sx={{ width: "50%", margin: "auto" }}
          >
            <Stack direction="column">
              <TextField
                required
                id="outlined-required"
                label="City"
                placeholder="Enter City"
                onChange={(event) => {
                  setCity(event.target.value);
                }}
                sx={{ marginBottom: "1rem" }}
              />
              <TextField
                required
                id="outlined-required"
                label="State"
                placeholder="Enter State"
                onChange={(event) => {
                  setState(event.target.value);
                }}
                sx={{ marginBottom: "1rem" }}
              />
              <TextField
                required
                id="outlined-required"
                label="Zip"
                placeholder="Enter Zip"
                onChange={(event) => {
                  setZip(event.target.value);
                }}
                sx={{ marginBottom: "1rem" }}
              />
            </Stack>
            <Button
              type="submit"
              onClick={callApi}
              disabled={isButtonDisabled}
              size="large"
              sx={{ margin: "auto", width: "100%" }}
            >
              Get Details
            </Button>
          </Box>
        </Card>
        {Object.keys(temperature) && Object.keys(temperature).length > 0 && (
          <TemperatureDetails {...temperature} />
        )}
        {isError && (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            Please try again
          </Alert>
        )}
      </Box>
    </Container>
  );
}
