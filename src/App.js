import { useState } from 'react';
import './App.css';
import LocationSearch from './components/LocationSearch';
import WeatherDisplay from './components/WeatherDisplay';

function App() {

  const[selectedLocation, setSelectedLocation] = useState(null);
  const[displayLocation, setDisplayLocation] = useState(null);

  const handleSearch = () => {selectedLocation ? setDisplayLocation(selectedLocation) : setDisplayLocation(null)};

  return (
    <div className="App">
      <div className="header">
        <h1>Weather App</h1>

        <div className="search-container">
          <LocationSearch onLocationSelect={(location) => setSelectedLocation(location)}/>
          <button onClick={handleSearch}>Search</button>
        </div>

        <p>Search by city name, zip code, or coordinates...</p>
      </div>

      {displayLocation && (
          <WeatherDisplay location={displayLocation}/>
        )}
    </div>
  );
}

export default App;
