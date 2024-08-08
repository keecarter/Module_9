const axios = require('axios');

const getWeatherByCity = async (req, res) => {
  const { city } = req.query; // Use query parameter for city
  if (!city) {
    return res.status(400).json({ error: 'City parameter is required' });
  }

  try {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    const weatherData = response.data;
    res.status(200).json({
      city: weatherData.name,
      temperature: weatherData.main.temp,
      description: weatherData.weather[0].description,
      icon: `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
};

module.exports = {
  getWeatherByCity
};
