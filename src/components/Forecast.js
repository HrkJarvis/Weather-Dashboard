import { Card, CardContent, Typography, Grid } from "@mui/material";

const Forecast = ({ forecast }) => {
  // Filter forecast to get one reading per day (every 24h interval)
  const dailyForecast = forecast.filter((_, index) => index % 8 === 0);

  return (
    <Grid container spacing={2} sx={{ mt: 3 }}>
      {dailyForecast.map((day, index) => (
        <Grid item xs={12} sm={6} md={2} key={index}>
          <Card sx={{ backgroundColor: "#333", color: "white", textAlign: "center" }}>
            <CardContent>
              <Typography variant="h6">
                {new Date(day.dt * 1000).toLocaleDateString("en-US", {
                  weekday: "short",
                })}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                {Math.round(day.main.temp)}°C
              </Typography>
              <Typography variant="body2">
                {day.weather[0].description}
              </Typography>
              <Typography variant="body2">
                💧 Humidity: {day.main.humidity}%
              </Typography>
              <Typography variant="body2">
                🌬 Wind: {Math.round(day.wind.speed)} km/h
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Forecast;
