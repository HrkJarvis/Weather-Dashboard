import { useState } from "react";
import { Container, Typography, CircularProgress, Alert } from "@mui/material";
import SearchBar from "../components/SearchBar";
import Forecast from "../components/Forecast";

export default function Home() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async (city) => {
    setLoading(true);
    setError(null);
    setWeatherData(null);

    try {
      const res = await fetch(`/api/weather?city=${city}`);
      const data = await res.json();

      if (res.status !== 200) {
        setError(data.error || "Something went wrong.");
      } else {
        setWeatherData(data);
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    }

    setLoading(false);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5, color: "white" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Weather Dashboard
      </Typography>
      <SearchBar onSearch={fetchWeather} />

      {loading && <CircularProgress sx={{ display: "block", mx: "auto", mt: 2 }} />}

      {error && (
        <Alert severity="error" sx={{ mt: 2, textAlign: "center" }}>
          {error}
        </Alert>
      )}

      {weatherData && !error && (
        <>
          <Typography variant="h5" align="center" sx={{ mt: 2 }}>
            {weatherData.current.name} : {Math.round(weatherData.current.main.temp)}°C
          </Typography>
          <Typography variant="body1" align="center">
            {weatherData.current.weather[0].description}
          </Typography>
          <Typography variant="body2" align="center">
            💧 Humidity: {weatherData.current.main.humidity}%
          </Typography>
          <Typography variant="body2" align="center">
            🌬 Wind: {Math.round(weatherData.current.wind.speed)} km/h
          </Typography>

          {/* 5-Day Forecast */}
          <Forecast forecast={weatherData.forecast} />
        </>
      )}
    </Container>
  );
}