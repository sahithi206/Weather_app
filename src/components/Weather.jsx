import React, { useEffect, useState } from 'react';
import './style.css';
import search_icon from '../assets/search.svg';
import wind_icon from '../assets/wind.png';
import sun_icon from '../assets/sunny.png';
import weather_icon from '../assets/humidity.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/moderaterain.png';
import rain_icon from '../assets/heavyrain.png';
import snow_icon from '../assets/mist.png';

const Weather = () => {
  const [city, setCity] = useState("London");
  const [weatherData, setWeatherData] = useState(null);

  const allicons = {
    "01d": sun_icon,
    "01n": sun_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };

  const search = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);

      const icon = allicons[data.weather[0].icon] || sun_icon;
      setWeatherData({
        humidity: data.main.humidity,
        windspeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      console.error("Error fetching weather data: ", error);
    }
  };

  useEffect(() => {
    search(city);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    search(city);
  };

  return (
    <div className='weather'>
      <div className='Search-bar'>
        <input 
          type="text" 
          placeholder='Enter Location' 
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <img src={search_icon} alt="search icon" onClick={handleSearch} />
      </div>
      {weatherData && (
        <>
          <img className='icon' src={weatherData.icon} alt="weather icon"/>
          <p className='temp'>{weatherData.temperature} °C</p>
          <p className='location'>{weatherData.location}</p>
          <div className='weather-data'>
            <div className='col'>
              <img src={weather_icon} style={{width:"2.5rem"}} alt="humidity icon"/>
              <div>
                <p>{weatherData.humidity} %</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className='col'>
              <img src={wind_icon} style={{marginLeft:"2rem"}} alt="wind icon"/>
              <div>
                <p>{weatherData.windspeed} Km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Weather;