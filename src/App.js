import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const API_KEY = 'd35c6b8b04c753f441d8a445ccf08ec4';

  const getWeather = async () => {
    if (!city) return;
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      const data = await response.json();
      if (data.cod === 200) {
        setWeather(data);
      } else {
        alert('City not found!');
        setWeather(null);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  return (
    <div className="container">
      <h1>🌦 Weatherify</h1>
      <div className="search">
        <input
          type="text"
          placeholder="Enter city name here.."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={getWeather}>Search</button>
      </div>

      {weather && (
        <div className="weather-card">
          <h2>{weather.name}</h2>
          <p className="temp">{weather.main.temp}°C</p>
          <p className="condition">{weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default App;