import { useState } from 'react';
import './App.css';
import LocationSearch from './components/LocationSearch';
import WeatherDisplay from './components/WeatherDisplay';

function App() {

  const[selectedLocation, setSelectedLocation] = useState(null);
  const[showWeather, setShowWeather] = useState(false);

  const handleSearch = () => {selectedLocation ? setShowWeather(true) : setShowWeather(false);}

  return (
    <div className="App">
      <h1>Weather App</h1>

      <LocationSearch onLocationSelect={(location) => setSelectedLocation(location)}/>
      <button onClick={handleSearch}>Search</button>

      {showWeather && (
        <WeatherDisplay location={selectedLocation}/>
      )}
    </div>
  );
}

export default App;
