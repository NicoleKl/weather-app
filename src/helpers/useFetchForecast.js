import { useState, useEffect } from "react";
import {prepareHourlyData, prepareDailyData} from './';

export function useFetchForecast(coordinates, units) {
    const lat = (Math.round(coordinates[1] * 100) / 100).toFixed(2); //london
    const lon = (Math.round(coordinates[0] * 100) / 100).toFixed(2); 
    const HoursToForecast = 15;
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=`;
    const ApiKey = 'fa43aa6d7f9b139f3047f2710672eea3';

    const [loadingForecast, setLoading] = useState(true);
    const [hourlyForecast, setHourlyForecast] = useState([]);
    const [dailyForecast, setDailyForecast] = useState([]);
    const [errorForecast, setError] = useState(null);

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
                setHourlyForecast(prepareHourlyData(data.list.slice(0, HoursToForecast/3)));
                setDailyForecast(prepareDailyData(data.list));
            })
            .catch(error => {
                setError(error.message);
                console.log('There was a problem with the fetch operation:', error);
            });
            setLoading(false);
    }, [coordinates, units]);

    return { hourlyForecast, dailyForecast, loadingForecast, errorForecast };
}

export default useFetchForecast;