import { useState, useEffect, useCallback } from "react";


export function useFetchCurrentWeather(coordinates, units) {
    const lat = (Math.round(coordinates[1] * 100) / 100).toFixed(2); //london
    const lon = (Math.round(coordinates[0] * 100) / 100).toFixed(2); //london http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=
    const apiUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=`;
    const ApiKey = 'fa43aa6d7f9b139f3047f2710672eea3';

    const [loadingCurrentWeather, setLoading] = useState(true);
    const [currentWeather, setWeather] = useState(null);
    const [errorCurrentWeather, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        fetch(apiUrl + ApiKey + '&units=' + units)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setWeather(data);
            })
            .catch(error => {
                setError(error.message);
                console.log('There was a problem with the fetch operation:', error.message);
            });
        setLoading(false);
    }, [coordinates, units]);

    return { currentWeather, loadingCurrentWeather, errorCurrentWeather };
}

export default useFetchCurrentWeather;