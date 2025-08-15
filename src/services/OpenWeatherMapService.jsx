export default class OpenWeatherMapService {

    /*
        OpenWeatherMap Documentation: 
        - https://openweathermap.org/current
        - https://openweathermap.org/api/geocoding-api

        Restrictions:
        - 60 calls/minute
    */

    static OPEN_WEATHER_MAP_API = "http://api.openweathermap.org";
    static API_KEY = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;

    static WEATHER = "/data/2.5/weather";

    static GEOCODING = "/geo/1.0/direct";
    static REVERSE_GEOCODING = "/geo/1.0/reverse";
    static ZIP_GEOCODING = "/geo/1.0/zip";
    static GEOCODE_LIMIT = 5;

    static REGEX_COORDINATES = /^-?\d+(\.\d+)?\s*,\s*-?\d+(\.\d+)?$/;
    static REGEX_ZIP_CODE = /^\d{5}$/;

    static async getWeatherByCoordinates(latitude, longitude) {
        let url = this.OPEN_WEATHER_MAP_API + this.WEATHER
            + "?lat=" + latitude 
            + "&lon=" + longitude 
            + "&units=imperial" 
            + "&appid=" + this.API_KEY;

        try {
            const response = await fetch(url);
            if(!response.ok) throw new Error("Error: " + response.status);
            return await response.json();
        } catch(error) {
            console.error("Failed to reach Open Weather Map API. " + error);
            throw error;
        }
    }

    static async getLocation(locationSearch){
        let url = "";

        // Coordinates
        if(this.REGEX_COORDINATES.test(locationSearch)){
            const[latitude, longitude] = locationSearch.split(",").map(text => text.trim());
            url = this.OPEN_WEATHER_MAP_API + this.REVERSE_GEOCODING
                + "?lat=" + encodeURIComponent(latitude) 
                + "&lon=" + encodeURIComponent(longitude)
                + "&limit=" + this.GEOCODE_LIMIT;
        }
        // Zip Code (US only)
        else if(this.REGEX_ZIP_CODE.test(locationSearch)){
            url = this.OPEN_WEATHER_MAP_API + this.ZIP_GEOCODING
                + "?zip=" + encodeURIComponent(locationSearch) + ",US";
        }
        // City Name
        else {
            url = this.OPEN_WEATHER_MAP_API + this.GEOCODING
                + "?q=" + encodeURIComponent(locationSearch)
                + "&limit=" + this.GEOCODE_LIMIT;
        }

        url += "&appid=" + this.API_KEY;

        try {
            const response = await fetch(url);
            if(!response.ok) throw new Error("Error: " + response.status);
            let responseData = await response.json();

            // The zip code endpoint returns 1 item. Make it an array for consistency.
            if(responseData && typeof responseData === "object" && !Array.isArray(responseData)){
                responseData = [responseData];
            }

            return responseData;
        } catch(error) {
            console.error("Failed to reach Open Weather Map API. " + error);
            throw error;
        }
    }
}