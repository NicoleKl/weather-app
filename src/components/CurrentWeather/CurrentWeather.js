import './CurrentWeather.scss';
import React, { useState } from 'react';
import WeatherIcon from '../WeatherIcon/WeatherIcon';


const CurrentWeather = ({ city, mainWeather, temperature, details, units}) => {
    // const [timeOfTheDay, setTimeOfTheDay] = useState(currentTime < sunsetTime ? 'day' : 'night');
    //for current weather call other API for current
    const makeUpperCase = (str) => str && str.charAt(0).toUpperCase() + str.slice(1);
    return (
        <div className='currentWeather'>
            <div className='currentWeather-leftContainer'>
                <div>
                    <h3 className='currentWeather__header'>Now in</h3>
                    <h2 className='currentWeather__city'>{city.split(',')[0]}</h2>
                </div>
                
                <p className='currentWeather__temp'>{Math.round(temperature)}° {units === 'metric' ? 'C' : 'F'}</p>
            </div>
            <div className='currentWeather-rightContainer'>
                <WeatherIcon weather={mainWeather} size='xl' />
                <p className='currentWeather__details'>{makeUpperCase(details)}</p>
            </div>
        </div>
    );
};

export default CurrentWeather;