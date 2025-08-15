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
        <div>
            <h2>Weather for {location.city}, {location.state}, {location.country}</h2>
            <p>Temperature: {weather.main.temp}°F</p>
            <p>Conditions: {weather.weather[0].description}</p>
        </div>
    );
}