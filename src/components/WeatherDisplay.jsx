import React, { useEffect, useState } from "react";
import OpenWeatherMapService from "../services/OpenWeatherMapService";

export default function WeatherDisplay({ location }) {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        if(!location) return;

        async function getWeather() {
            try {
                const weatherData = await OpenWeatherMapService.getWeatherByCoordinates(location.latitude,location.longitude);
                setWeather(weatherData);
            } catch (error) {
                console.error("Failed to get weather.")
            }
        }

        getWeather();
    }, [location]);

    if(!location) return <p>No location found.</p>
    if(!weather) return <p>Loading weather...</p>

    return (
        <div className="weather-display">
            <h2>Weather for {location.city}{location.state ? ', ' + location.state : ''}, {location.country}</h2>
            <p>{weather.coord.lat}, {weather.coord.lon}</p>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].main}/>
            <p><b>Conditions:</b> {weather.weather[0].description}</p>
            <p><b>Temperature:</b> {Math.trunc(weather.main.temp)}°F</p>
        </div>
    );
}