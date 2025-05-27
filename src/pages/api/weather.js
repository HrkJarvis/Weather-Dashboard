export default async function handler(req, res) {
    const { city } = req.query;
    const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY; // Replace with your API key
  
    if (!city) {
      return res.status(400).json({ error: "City is required" });
    }
  
    try {
      // Fetch current weather
      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      const weatherData = await weatherRes.json();
  
      // If city is not found, OpenWeatherMap returns cod: 404
      if (weatherData.cod !== 200) {
        return res.status(404).json({ error: "City not found. Please check the name and try again." });
      }
  
      // Fetch 5-day forecast
      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
      );
      const forecastData = await forecastRes.json();
  
      // If forecast API also fails
      if (forecastData.cod !== "200") {
        return res.status(404).json({ error: "Forecast data not available for this city." });
      }
  
      res.status(200).json({
        current: weatherData,
        forecast: forecastData.list, // Forecast data
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch weather data. Please try again later." });
    }
  }
  