import React, { useEffect, useRef, useState } from "react";

import OpenWeatherMapService from "../services/OpenWeatherMapService";

export default function LocationSearch({ onLocationSelect }) {
    const[query, setQuery] = useState('');
    const[suggestions, setSuggestions] = useState([]);
    const skipNextSearchRef = useRef(false);

    const SEARCH_DELAY_IN_MILLISECONDS = 500;
    const QUERY_START_CHARACTERS = 3;

    //Avoid too many calls to API
    useEffect(() => {
        if(skipNextSearchRef.current){
            // If the search bar gets populated by a suggestion, don't search again.
            skipNextSearchRef.current = false;
            return;
        }

        if(query.length < QUERY_START_CHARACTERS) {
            setSuggestions([]);
            return;
        }

        const timeout = setTimeout(() => {
            getSuggestions(query);
        }, SEARCH_DELAY_IN_MILLISECONDS);

        return() => clearTimeout(timeout);
    }, [query]);

    const getSuggestions = async (searchText) => {
        try {
            const responseData = await OpenWeatherMapService.getLocation(searchText);
            const formattedData = responseData.map((location) => ({
                city: location.name,
                state: location.state || '',
                country: location.country,
                latitude: location.lat,
                longitude: location.lon,
                searchDisplay: `${location.name}${location.state ? ', ' + location.state : ''}, ${location.country}`
            }));

            setSuggestions(formattedData);
        } catch (error) {
            console.error("Failed to fetch search results. " + error);
        }
    };

    const handleSelect = (location) => {
        setQuery(location.searchDisplay);
        setSuggestions([]);
        skipNextSearchRef.current = true;
        if(onLocationSelect) {
            onLocationSelect(location);
        }
    }

    return (
        <div>
            <input
                type="text"
                placeholder="Enter city..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            {suggestions.length > 0 && (
                <ul>
                    {suggestions.map((s,i) => (
                        <li 
                            key={i} 
                            onClick={() => handleSelect(s)}
                        >
                            {s.searchDisplay}
                        </li>
                    ))}   
                </ul>
            )}
        </div>
    );
}