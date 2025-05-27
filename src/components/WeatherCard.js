import { Card, CardContent, Typography } from "@mui/material";

const WeatherCard = ({ weather }) => {
    if (!weather) return null;

    return (
        <Card sx={{ maxWidth: 400, margin: "20px auto", textAlign: "center" }}>
            <CardContent>
                <Typography variant="h5">{weather.name}</Typography>
                <Typography variant="h6">
                    {weather.main.temp}°C | {weather.weather[0].description}
                </Typography>
                <Typography variant="body2">
                    Humidity: {weather.main.humidity}%
                </Typography>
                <Typography variant="body2">
                    Wind Speed: {weather.wind.speed} m/s
                </Typography>
            </CardContent>
        </Card>
    );
};

export default WeatherCard;
