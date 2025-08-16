# Weather App 🌤️
This application is a simple React app that allows users to search for current weather conditions by location (using city name, zip code, or coordinates). Weather conditions and location search information are provides by the [OpenWeatherMap API](https://openweathermap.org/api).

## Features
* Search locations using city name, zip code, or coordinates:
    - City Name: "Saint Louis, Missouri, US"
    - Zip Code (US Only): "30144"
    - Coordinates: "45.50, -73.56"
* Autocompletes suggestions for cities when you type city names or coordinates
* Displays current weather information:
    - Location name
    - Temperature
    - Short description of weather conditions

## Getting Started
1. Clone the repository
    ```bash
    git clone https://github.com/ChaseStock/WeatherApp.git
    cd weather-app-chase-stock
    ```

2. Install dependencies
    ```bash
    npm install
    ```

3. Configure environment variables 
    - This application requires an API key from OpenWeatherMap to use.
    - Create a ```.env``` file in the root of this project that includes the key with this variable name:
    ```env
    REACT_APP_OPENWEATHERMAP_API_KEY=your_api_key
    ```
    > **Warning:** Do not commit your .env file. This file is included in the .gitignore to keep user's keys private.

4. Start the application
    ```bash 
    npm start
    ```

## Using the Weather App
1.	Enter the city you’d like to search for in the search window.
2.	After typing in the first few characters of any of the above searches, the top results for the search will be populated below. 
    - Click one of these suggestions and then Search to display current weather conditions for that area.

